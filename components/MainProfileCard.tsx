import {
  Avatar,
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  createStyles,
  Divider,
  Fade,
  Grid,
  makeStyles,
  Modal,
  Theme,
  Typography,
} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../features';
import { logout } from '../features/user/action';
import { openPwCheckModal, closePwCheckModal } from '../features/etc/etcSlice';
import { meSelector } from '../features/user/userSlice';
import { mainUseStyles } from '../layout/MainLayoutStyle';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      position: 'absolute',
      display: 'flex',
      top: '50px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const MainProfileCard = () => {
  const dispatch = useDispatch();
  const me = useTypedSelector(meSelector);
  const classes = mainUseStyles();

  const handleOpen = () => {
    dispatch(openPwCheckModal());
  };

  const handleClose = () => {
    dispatch(closePwCheckModal());
  };

  const onClickLogout = () => {
    dispatch(logout({}));
  };

  return (
    <Card className={classes.popoverContainer}>
      <Grid container alignItems="center">
        <Grid item md={4}>
          <Grid container justify="center">
            <Avatar alt="Remy Sharp" src="http://placeimg.com/640/480" />
          </Grid>
        </Grid>
        <Grid item md={8}>
          <CardHeader
            title={me?.studentName}
            subheader={me?.univName}
          ></CardHeader>
        </Grid>
      </Grid>

      <Typography variant="subtitle2">
        {moment().format('MMMM Do , h:mm:ss a')}
      </Typography>
      <CardContent>
        <Typography
          className={classes.popoverText}
          onClick={() => {
            alert('준비중입니다!');
          }}
        >
          강의표
        </Typography>
        <Divider classes={{ root: classes.listdivider }} />
        <Typography className={classes.popoverText}>즐겨찾기</Typography>
        <Divider classes={{ root: classes.listdivider }} />
      </CardContent>
      <CardActions>
        <Button
          className={classes.cardButton}
          onClick={handleOpen}
          variant="contained"
        >
          마이 페이지
        </Button>
        <Button
          onClick={onClickLogout}
          className={classes.cardButton}
          variant="contained"
        >
          로그아웃
        </Button>
      </CardActions>
    </Card>
  );
};

export default MainProfileCard;
