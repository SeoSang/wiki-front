import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { searchSubjects } from '../features/subject/action';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '80%',
      marginBottom: theme.spacing(2),
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  })
);

interface SearchProps {
  keyword: string;
  onChange(keyword: string): void;
  onSubmit(): void;
}

const SearchBar: React.FC<SearchProps> = (props) => {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="과목을 검색해주세요"
        inputProps={{ 'aria-label': 'search google maps' }}
        name="searchKeyword"
        value={props.keyword}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={(e) => {
          e.preventDefault();
          props.onSubmit();
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
