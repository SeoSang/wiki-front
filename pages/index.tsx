import {
  Button,
  createStyles,
  fade,
  InputBase,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import IndexSlide from '../components/IndexSlide';
import SearchBar from '../components/SearchBar';
import SubjectTable from '../components/SubjectTable';
import { subjects } from '../dummy';
import { useTypedSelector } from '../features';
import { addTest, resetTest, userSlice } from '../features/user/userSclice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    slide: {
      padding: theme.spacing(2),
    },
  })
);

let intervalId = 0 as any;
export default function Home() {
  const classes = useStyles();
  const { test } = useTypedSelector(state => state.user);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const intervalStart = () => {
    if (intervalId) return;
    intervalId = setInterval(() => {
      dispatch(addTest());
    }, 1000);
  };

  return (
    <div className={classes.root}>
      <SearchBar
        onChange={(keyword: string) => setSearchKeyword(keyword)}
        keyword={searchKeyword}
        onSubmit={() => setSubmitClicked(true)}
      />
      {!submitClicked ? (
        <div>
          <div className={classes.slide}>
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
          </div>
        </div>
      ) : (
        <SubjectTable subjects={subjects} />
      )}
      <div className={classes.slide}>
        <IndexSlide subjects={subjects}></IndexSlide>
      </div>
    </div>
  );
}
