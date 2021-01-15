import {
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Theme,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useDivStyles, useMarginStyles, boxStyles } from '../styles/cssStyle';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/ko';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CommentCard from '../components/CommentCard';
import CommentForm from '../form/CommentForm';
import { useDispatch } from 'react-redux';
import { loadPost, deletePost } from '../features/board/action';
import { useTypedSelector } from '../features';
import { openReportPostModal } from '../features/etc/etcSlice';
import { loadMe } from './../features/user/action';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    postContainer: {
      minHeight: '20vh',
      backgroundColor: 'white',
      padding: theme.spacing(2),
      marginTop: theme.spacing(4),
      width: '90%',
    },
    postHeaderContainer: {
      display: 'flex',
      width: '100%',
    },
    headerTitle: {
      width: '50%',
      display: 'flex',
      justifyContent: 'flex-start',
    },
    headerButtons: {
      width: '50%',
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: '20px',
    },
    textContainer: {
      height: '100%',
    },
    authorContainer: {
      padding: theme.spacing(1),
    },
    hitnumReportContainer: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'end',
    },
  })
);

const post = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { post } = useTypedSelector(state => state.board);
  const { me } = useTypedSelector(state => state.user);
  const id = router.asPath.slice(9, 12);
  const [error, setError] = useState(false);
  const st = useStyles();
  const div = useDivStyles();
  const mar = useMarginStyles();
  const box = boxStyles();
  const xs = useMediaQuery('(min-width:600px)');
  const { comments } = useTypedSelector(state => state.board);
  // const ReactQuill =
  //   typeof window === 'object' ? require('react-quill') : () => false;

  const onDeletePost = (id: number) => {
    alert('삭제되었습니다!');
    router.back();
    dispatch(deletePost({ boardId: id }));
  };

  useEffect(() => {
    dispatch(loadPost({ boardId: parseInt(id) }));
    dispatch(loadMe({}));
  }, []);

  if (error) return <div>에러가 발생하였습니다 ㅠ</div>;

  return (
    <div className={div.columnCenterFlex}>
      <div className={div.startFlex}>
        <Typography variant="h4">자유게시판</Typography>
      </div>
      <div className={st.postContainer}>
        <div className={st.postHeaderContainer}>
          <div className={st.headerTitle}>
            <Typography className={clsx(mar.mar2, st.headerTitle)} variant="h5">
              {post?.title}
            </Typography>
          </div>
          <div className={st.headerButtons}>
            <Button
              onClick={() =>
                router.push({ pathname: '/modifypost/', query: { id: id } })
              }
            >
              수정
            </Button>
            <Button onClick={() => onDeletePost(parseInt(id))}>삭제</Button>
          </div>
        </div>
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
            <Typography variant="subtitle1">
              작성자 : {post?.usersVO?.studentName}{' '}
            </Typography>
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
            <div className={st.hitnumReportContainer}>
              <VisibilityIcon></VisibilityIcon>
              {post?.hitNum}
              <IconButton
                onClick={() => {
                  dispatch(openReportPostModal());
                }}
              >
                <NotificationImportantIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <Divider style={{ alignSelf: 'stretch' }} variant="middle" />
        <div className={clsx(st.postContainer, div.centerStartFlex)}>
          <div
            dangerouslySetInnerHTML={{
              __html: post?.text ? post.text : '에러',
            }}
          ></div>
        </div>
      </div>
      {comments?.length != 0 ? (
        comments?.map(comment => (
          <CommentCard
            key={`userID_${comment.studentName}`}
            author={comment.studentName}
            createdAt={moment(comment.noticeDate).format('MMMM Do / a h:mm')}
            commentText={comment.commentText}
            userId={comment.userId}
            boardId={parseInt(id)}
            commentId={comment.commentId}
          />
        ))
      ) : (
        <div>아직 댓글이 작성되지 않았습니다</div>
      )}
      <CommentForm boardId={parseInt(id)}></CommentForm>
    </div>
  );
};

export default post;
