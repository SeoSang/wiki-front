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
import IndexMain from '../components/IndexMain';
import SearchBar from '../components/SearchBar';
import SubjectTable from '../components/SubjectTable';
import { subjects } from '../dummy';
import { loadPosts } from '../features/board/boardSlice';

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
  })
);

export default function Home() {
  const classes = useStyles();
  const [submitClicked, setSubmitClicked] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <SearchBar
        onChange={(keyword: string) => setSearchKeyword(keyword)}
        keyword={searchKeyword}
        onSubmit={() => setSubmitClicked(true)}
      />
      {!submitClicked ? (
        <IndexMain></IndexMain>
      ) : (
        <SubjectTable subjects={subjects} />
      )}
      <Button
        onClick={() => {
          dispatch(loadPosts({ page: 1, categoryId: 1 }));
        }}
      >
        포스트 확인 테스트
      </Button>
    </div>
  );
}
