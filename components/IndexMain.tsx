import {
  Button,
  Card,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { subjects } from '../dummy';
import { useTypedSelector } from '../features';
//import { addTest, resetTest } from '../features/user/userSclice';
import IndexSlide from './IndexSlide';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },
    slide: {
      padding: theme.spacing(2),
      width: '80%',
    },
    card: {
      padding: theme.spacing(4),
    },
  })
);

let intervalId = 0 as any;

const IndexMain = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { favorites } = useTypedSelector((state) => state.user);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const intervalStart = () => {
    if (intervalId) return;
    intervalId = setInterval(() => {
      //dispatch(addTest());
    }, 1000);
  };

  return (
    <div className={classes.root}>
      {favorites?.length == 0 ? (
        <Card className={classes.card}>
          <Typography variant="h3">즐겨찾기 등록된 과목이 없습니다.</Typography>
        </Card>
      ) : (
        <IndexSlide subjects={favorites} />
      )}
    </div>
  );
};

export default IndexMain;
