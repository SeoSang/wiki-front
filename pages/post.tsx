import {
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useDivStyles, useMarginStyles } from '../styles/cssStyle';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/ko';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CommentCard from '../components/CommentCard';
import CommentForm from '../form/CommentForm';
import { useDispatch } from 'react-redux';
import { loadPost } from '../features/board/action';
import { useTypedSelector } from '../features';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    postContainer: {
      minHeight: '20vh',
      backgroundColor: 'white',
      marginTop: theme.spacing(5),
      width: '90%',
    },
    textContainer: {
      height: '100%',
    },
    authorContainer: {
      padding: theme.spacing(1),
    },
  })
);

const post = () => {
  const dispatch = useDispatch();
  const { post }  = useTypedSelector((state)=> state.board);
  const router = useRouter();
  //const { id } = router.query as { id: string};
  const id = router.asPath.slice(9,12);
  const [error, setError] = useState(false);
  const st = useStyles();
  const div = useDivStyles();
  const mar = useMarginStyles();
  const xs = useMediaQuery('(min-width:600px)');
  const { comments } = useTypedSelector((state) => state.board);
  // const ReactQuill =
  //   typeof window === 'object' ? require('react-quill') : () => false;
  
  useEffect(() => {
    moment.locale('ko');
    dispatch(loadPost({boardId : parseInt(id)}));
  }, []);

  if (error) return <div>에러가 발생하였습니다 ㅠ</div>;

  return (
    <div className={div.coloumCenterFlex}>
      <div className={div.startFlex}>
        <Typography variant="h4">자유게시판</Typography>
      </div>
      <div className={st.postContainer}>
        <Typography className={mar.mar2} variant="h6">
          {post?.title}
        </Typography>
        <Divider style={{ alignSelf: 'stretch' }} variant="middle" />
        <Grid container className={st.authorContainer}>
          <Grid
            container
            xs={2}
            md={1}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <PhoneIphoneIcon></PhoneIphoneIcon>
          </Grid>
          <Grid container xs={9} md={6}>
            <Typography variant="subtitle1">유저 번호 :  {post?.userId}</Typography>
          </Grid>
          {xs ? (
            <Divider style={{ alignSelf: 'stretch' }} variant="middle" />
          ) : (
            ''
          )}
          <Grid container xs={8} md={3} justify="center" alignItems="center">
            {post?.createDate}
          </Grid>
          <Grid container xs={4} md={1}>
            <VisibilityIcon></VisibilityIcon>
            {post?.hitNum}
          </Grid>
        </Grid>
        <Divider style={{ alignSelf: 'stretch' }} variant="middle" />
        <div className={clsx(st.postContainer, div.centerFlex)}>
          <div dangerouslySetInnerHTML={{ __html: post?.text }}></div>
        </div>
      </div>
      {comments?.length != 0 ? (
        comments?.map((comment) => (
          <CommentCard
            key={`userID_${comment.userId}`}
            //author={comment.userId.toString()}
            createdAt={moment(comment.noticeDate).format('MMMM Do / a h:mm')}
            content={comment.commentText}
          />
        ))
      ) : (
        <CommentCard
          author={'홍꺽정'}
          createdAt={moment().format('MMMM Do / a h:mm')}
          content={
            'Animi rerum nihil deserunt odit vel exercitationem officia alias quo. Qui aspernatur et debitis. Labore aut dolores nisi aperiam illum corrupti quaerat recusandae vel.'
          }
        />
      )}
      <CommentForm></CommentForm>
    </div>
  );
};

export default post;
