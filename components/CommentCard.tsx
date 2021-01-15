import {
  createStyles,
  Grid,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Typography,
  Fade,
  TextField,
} from '@material-ui/core';

import React, { FC, useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { updateComment, deleteComment } from '../features/board/action';
import { UpdateCommentFormData } from '../features/board/type';
import { useDispatch } from 'react-redux';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContainer: {
      minHeight: '10vh',
      backgroundColor: 'white',
      marginTop: theme.spacing(5),
      width: '90%',
    },
    textContainer: {
      height: '100%',
      padding: theme.spacing(2),
    },
    authorContainer: {
      backgroundColor: '#e9e9e9',
      padding: theme.spacing(1),
    },
    inputContainer: {
      width: '100%',
      height: '100%',
      padding: theme.spacing(2),
    },
    input: {
      widht: '95%',
    },
  })
);

interface CommentCardProps {
  author: string;
  createdAt: string;
  commentText: string;
  userId: number;
  boardId: number;
  commentId: number;
}

const CommentCard: FC<CommentCardProps> = ({
  author,
  createdAt,
  commentText,
  userId,
  boardId,
  commentId,
}) => {
  const dispatch = useDispatch();
  const st = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [content, setContent] = useState<string>('');
  const [isUpdate, setIsUpdate] = useState(false);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleClickUpdateForm = () => {
    setIsUpdate(true);
    setContent(commentText);
    handleClose();
  };
  const updateCom = () => {
    dispatch(
      updateComment({
        comment: {
          commentText: content,
          userId: userId,
          boardId: boardId,
          commentId: commentId,
        },
      })
    );
  };
  const deleteCom = () => {
    dispatch(
      deleteComment({
        comment: {
          commentId: commentId,
          boardId: boardId,
        },
      })
    );
  };
  return (
    <Grid className={st.cardContainer} container>
      <Grid className={st.authorContainer} container>
        <Grid xs={1} md={1} container alignItems="center" justify="center">
          <AccountCircleIcon></AccountCircleIcon>
        </Grid>
        <Grid xs={6} md={6} container alignItems="center">
          <Typography variant="subtitle1">작성자 {author}</Typography>
          {/* <Button onClick ={()=> updateCom}>수정</Button>
          <Button onClick ={()=>deleteCom}>삭제</Button> */}
        </Grid>
        <Grid xs={4} md={4} container alignItems="center" justify="center">
          {createdAt}
        </Grid>
        <Grid xs={1} md={1}>
          <Button aria-controls="fade-menu" onClick={handleClick}>
            <MoreVertIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClickUpdateForm}>수정</MenuItem>
            <MenuItem onClick={() => deleteCom()}>삭제</MenuItem>
          </Menu>
        </Grid>
      </Grid>
      {isUpdate ? (
        <Grid className={st.inputContainer} container>
          <TextField
            className={st.input}
            value={content}
            onChange={e => setContent(e.target.value)}
            variant="outlined"
          />
          <Button onClick={() => updateCom()}>확인</Button>
        </Grid>
      ) : (
        <Grid className={st.textContainer} container>
          {commentText}
        </Grid>
      )}
    </Grid>
  );
};

export default CommentCard;
