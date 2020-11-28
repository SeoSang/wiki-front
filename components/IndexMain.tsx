import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { subjects } from '../dummy';
import { useTypedSelector } from '../features';
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
  })
);

let intervalId = 0 as any;

const IndexMain = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // const intervalStart = () => {
  //   if (intervalId) return;
  //   intervalId = setInterval(() => {
  //     dispatch(addTest());
  //   }, 1000);
  // };

  return (
    <div className={classes.root}>
      {/* <div className={classes.slide}>
        <IndexSlide subjects={subjects}></IndexSlide>
      </div>
      <Typography variant="h4">{test}</Typography>
      <div>
        <Button variant="contained" onClick={intervalStart}>
          카운팅 시작
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            clearInterval(intervalId);
            intervalId = 0;
          }}
        >
          카운팅 멈추기
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(addTest());
          }}
        >
          그냥 올리기
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(resetTest());
          }}
        >
          리셋
        </Button>
      </div> */}
    </div>
  );
};

export default IndexMain;
