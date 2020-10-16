import {
  createStyles,
  fade,
  InputBase,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Link from 'next/link';
import IndexSlide from '../components/IndexSlide';
import SearchBar from '../components/SearchBar';
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

  return (
    <div className={classes.root}>
      <SearchBar />
      <div className={classes.slide}>
        <IndexSlide subjects={subjects}></IndexSlide>
      </div>
      <Link href="test">
        <a>가자</a>
      </Link>
    </div>
  );
}
