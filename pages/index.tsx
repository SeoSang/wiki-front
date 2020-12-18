import {
  Button,
  createStyles,
  fade,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import SurroundSoundIcon from '@material-ui/icons/SurroundSound';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import IndexMain from '../components/IndexMain';
import SearchBar from '../components/SearchBar';
import SubjectTable from '../components/SubjectTable';
import { subjects } from '../dummy';
import { loadPosts } from '../features/board/action';
import { searchSubjects } from '../features/subject/action';
import { useDivStyles, useMarginStyles } from '../styles/cssStyle';
import clsx from 'clsx';

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
    },
    notice: {
      width: '100%',
    },
    noticeContainer: {
      height: '100%',
      width: '100%',
    },
    firstLineContainer: {
      border: '1px solid orange',
      borderRadius: '5px',
    },
  })
);

export default function Home() {
  const classes = useStyles();
  const [submitClicked, setSubmitClicked] = useState(false);
  const [searchName, setSearchName] = useState('');
  const dispatch = useDispatch();
  const mar = useMarginStyles();
  const div = useDivStyles();

  const onClickSearch = () => {
    dispatch(searchSubjects({ searchName }));
    setSubmitClicked(true);
  };

  return (
    <div className={classes.root}>
      <Grid
        className={clsx(mar.marBottom2, classes.firstLineContainer)}
        container
      >
        <Grid item md={1} sm={2}>
          <IconButton>
            <SurroundSoundIcon
              color="secondary"
              fontSize="large"
            ></SurroundSoundIcon>
          </IconButton>
        </Grid>
        <Grid item md={10} sm={9}>
          <div className={clsx(div.centerFlex, classes.noticeContainer)}>
            <Button className={classes.notice} variant="outlined">
              공지게시글1
            </Button>
          </div>
        </Grid>
      </Grid>
      <SearchBar
        onChange={(keyword: string) => setSearchName(keyword)}
        keyword={searchName}
        onSubmit={onClickSearch}
      />
      {!submitClicked ? <IndexMain></IndexMain> : <SubjectTable />}
      {submitClicked ? (
        <Button
          className={mar.marTop2}
          color="primary"
          variant="contained"
          onClick={() => {
            setSubmitClicked(false);
          }}
        >
          돌아가기
        </Button>
      ) : (
        ''
      )}
    </div>
  );
}
