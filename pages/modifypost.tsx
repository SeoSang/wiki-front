import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useDivStyles, useTypicalStyles } from '../styles/cssStyle';
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { useRouter } from 'next/dist/client/router';
import { meSelector } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { postSelector, postsSelector } from '../features/board/boardSlice';
import { loadPost, updatePost } from '../features/board/action';
import { useTypedSelector } from '../features';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleContainer: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
  })
);

function MyComponent() {
  const [title, setTitle] = useState('');
  const router = useRouter();
  const boardId = router.asPath.slice(15, 17);

  const typ = useTypicalStyles();
  const div = useDivStyles();
  const st = useStyles();
  const me = useSelector(meSelector);
  const post = useSelector(postSelector);
  const userId = post?.usersVO?.userId;
  const dispatch = useDispatch();
  const ReactQuill =
    typeof window === 'object' ? require('react-quill') : () => false;
  const [text, setValue] = useState('');

  useEffect(() => {
    dispatch(loadPost({ boardId: parseInt(boardId) }));
    // if (!me || (post && me?.userId != post?.userId)) {
    // alert('당신의 게시글이 아니에요');
    // router.push('/board');
    // }
  }, []);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setValue(post.text);
    }
  }, [post, post?.title]);

  const onSubmit = () => {
    dispatch(
      updatePost({
        post: {
          boardId: parseInt(boardId),
          userId: parseInt(userId),
          title: title,
          text: text,
        },
      })
    );
    router.back();
  };

  return (
    <div>
      <Typography className={typ.marginThree} align="center" variant="h4">
        게시글 수정
      </Typography>
      <Grid className={st.titleContainer} container>
        <Grid className={div.centerFlex} item xs={12} md={3}>
          <Typography variant="h6">제목</Typography>
        </Grid>
        <Grid className={div.centerFlex} item xs={12} md={8}>
          <TextField
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
            fullWidth
          />
        </Grid>
      </Grid>
      <ReactQuill
        style={{ textAlign: 'left' }}
        theme="snow"
        value={text}
        onChange={setValue}
      />
      <div className={clsx(typ.center, typ.marginTwo)}>
        <Button variant="contained" onClick={onSubmit}>
          수정하기
        </Button>
      </div>
    </div>
  );
}

export default MyComponent;
