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
import { PageLink } from './PageLink';

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
      <CardHeader
        classes={{
          title: classes.title,
        }}
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.popoverAvatar}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTya3yidR9oENvi28M4HZMhUOOObxJFxvQExA&usqp=CAU"
          ></Avatar>
        }
        title="오현재"
        subheader="가톨릭대학교"
      ></CardHeader>
      {/*<Divider classes ={{root : classes.divider}}/>*/}

      <Typography className={classes.popoverTodayState}>
        오늘은 학교가는 날
      </Typography>
      <CardContent>
        <Typography className={classes.popoverText}>강의표</Typography>
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
