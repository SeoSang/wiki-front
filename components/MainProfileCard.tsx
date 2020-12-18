import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../features';
import { logout } from '../features/user/action';
import { meSelector } from '../features/user/userSclice';
import { mainUseStyles } from '../layout/MainLayout';
import { PageLink } from './PageLink';

const MainProfileCard = () => {
  const dispatch = useDispatch();
  const me = useTypedSelector(meSelector);
  const classes = mainUseStyles();
  const onClickLogout = () => {
    dispatch(logout());
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
        <PageLink href="mypage">
          <Button className={classes.cardButton} variant="contained">
            마이 페이지
          </Button>
        </PageLink>
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
