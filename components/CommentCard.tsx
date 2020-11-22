import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import React, { FC } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContainer: {
      minHeight: '10vh',
      backgroundColor: 'white',
      marginTop: theme.spacing(5),
    },
    textContainer: {
      height: '100%',
      padding: theme.spacing(2),
    },
    authorContainer: {
      backgroundColor: '#e9e9e9',
      padding: theme.spacing(1),
    },
  })
);

interface CommentCardProps {
  author: string;
  createdAt: string;
  content: string;
}

const CommentCard: FC<CommentCardProps> = ({ author, createdAt, content }) => {
  const st = useStyles();
  return (
    <Grid className={st.cardContainer} container>
      <Grid className={st.authorContainer} container>
        <Grid xs={false} md={1} container alignItems="center" justify="center">
          <AccountCircleIcon></AccountCircleIcon>
        </Grid>
        <Grid xs={7} md={7} container alignItems="center">
          <Typography variant="subtitle1">작성자 {author}</Typography>
        </Grid>
        <Grid xs={5} md={4} container alignItems="center" justify="center">
          {createdAt}
        </Grid>
      </Grid>
      <Grid className={st.textContainer} container>
        {content}
      </Grid>
    </Grid>
  );
};

export default CommentCard;
