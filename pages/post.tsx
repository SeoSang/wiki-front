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

const DUMMY_POST = `
  <ul>
    <li>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa.
    </li>
    <li>
      Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
      ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
      quis, sem.
    </li>
    <li>
      Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
      nec, vulputate eget, arcu.
    </li>
    <li>
      In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
      dictum felis eu pede mollis pretium. Integer tincidunt.
    </li>
  </ul>
  `;

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
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [error, setError] = useState(false);
  const st = useStyles();
  const div = useDivStyles();
  const mar = useMarginStyles();
  const xs = useMediaQuery('(min-width:600px)');
  // const ReactQuill =
  //   typeof window === 'object' ? require('react-quill') : () => false;

  useEffect(() => {
    moment.locale('ko');
  }, []);

  if (error) return <div>에러가 발생하였습니다 ㅠ</div>;

  return (
    <div className={div.coloumCenterFlex}>
      <div className={div.startFlex}>
        <Typography variant="h4">자유게시판</Typography>
      </div>
      <div className={st.postContainer}>
        <Typography className={mar.mar2} variant="h6">
          더미 제목입니다
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
            <Typography variant="subtitle1">작성자 임길동</Typography>
          </Grid>
          {xs ? (
            <Divider style={{ alignSelf: 'stretch' }} variant="middle" />
          ) : (
            ''
          )}
          <Grid container xs={8} md={3} justify="center" alignItems="center">
            {moment().format('MMMM Do / a h:mm')}
          </Grid>
          <Grid container xs={4} md={1}>
            <VisibilityIcon></VisibilityIcon>
            {'12'}
          </Grid>
        </Grid>
        <Divider style={{ alignSelf: 'stretch' }} variant="middle" />
        <div className={clsx(st.postContainer, div.centerFlex)}>
          <div dangerouslySetInnerHTML={{ __html: DUMMY_POST }}></div>
        </div>
      </div>
      <CommentCard
        author={'홍꺽정'}
        createdAt={moment().format('MMMM Do / a h:mm')}
        content={
          'Animi rerum nihil deserunt odit vel exercitationem officia alias quo. Qui aspernatur et debitis. Labore aut dolores nisi aperiam illum corrupti quaerat recusandae vel.'
        }
      />
      {/* <Divider style={{ alignSelf: 'stretch' }} variant="middle" /> */}
      {/* <Divider variant="middle" /> */}
      <CommentForm></CommentForm>
    </div>
  );
};

export default post;
