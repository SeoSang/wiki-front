import { Button, Card, CardActions, Typography } from '@material-ui/core';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../features';
import { meSelector } from '../features/user/userSlice';
import { PageLink } from './PageLink';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { mainUseStyles } from '../layout/MainLayoutStyle';

const LoginNeededCard = () => {
  const classes = mainUseStyles();

  return (
    <Card className={classes.popoverContainer}>
      <AssignmentIndIcon />
      <Typography className={classes.popoverTodayState}>
        로그인이 필요합니다
      </Typography>
      <CardActions>
        <PageLink href="login">
          <Button className={classes.cardButton} variant="contained">
            로그인 하러가기
          </Button>
        </PageLink>
      </CardActions>
    </Card>
  );
};

export default LoginNeededCard;
