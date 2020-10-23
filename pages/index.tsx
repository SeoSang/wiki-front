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
import IndexMain from '../components/IndexMain';
import SearchBar from '../components/SearchBar';
import SubjectTable from '../components/SubjectTable';
import { subjects } from '../dummy';

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

export default function Home() {
  const classes = useStyles();
  const [submitClicked, setSubmitClicked] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

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
    </div>
  );
}
