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
import { loadPosts } from '../features/board/action';
import { searchSubjects } from '../features/subject/action';
import { useMarginStyles } from '../styles/cssStyle';

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
  const [searchName, setSearchName] = useState('');
  const dispatch = useDispatch();
  const mar = useMarginStyles();

  const onClickSearch = () => {
    dispatch(searchSubjects({ searchName }));
    setSubmitClicked(true);
  };

  return (
    <div className={classes.root}>
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
