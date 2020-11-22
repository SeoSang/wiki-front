import {
  Button,
  createStyles,
  Grid,
  Input,
  makeStyles,
  TextField,
  Theme,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContainer: {
      minHeight: '10vh',
      backgroundColor: 'white',
      marginTop: theme.spacing(5),
      width: '90%',
    },
    inputContainer: {
      height: '100%',
      minHeight: '10vh',
      padding: theme.spacing(2),
    },
    input: {
      width: '95%',
    },
    titleContainer: {
      backgroundColor: theme.palette.primary.light,
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      color: 'white',
    },
    bottomContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
      width: '100%',
    },
    lightButton: {
      backgroundColor: theme.palette.primary.light,
      color: 'white',
    },
  })
);
const CommentForm = () => {
  const st = useStyles();

  return (
    <Grid className={st.cardContainer} container>
      <Grid className={st.titleContainer} container>
        <Typography variant="subtitle1">댓글을 남겨주세요</Typography>
      </Grid>
      <Grid
        className={st.inputContainer}
        container
        alignItems="center"
        justify="center"
      >
        <TextField className={st.input} variant="outlined"></TextField>
      </Grid>
      <div className={st.bottomContainer}>
        <Button className={st.lightButton} variant="contained">
          댓글 달기
        </Button>
      </div>
    </Grid>
  );
};

export default CommentForm;
