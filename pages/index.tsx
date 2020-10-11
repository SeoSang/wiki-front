import {
  createStyles,
  fade,
  InputBase,
  makeStyles,
  Theme,
} from '@material-ui/core';
import SearchBar from '../components/SearchBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  })
);

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SearchBar></SearchBar>
    </div>
  );
}
