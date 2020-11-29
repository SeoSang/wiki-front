import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useDivStyles, useTypicalStyles } from '../styles/cssStyle';
import {
  Button,
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../features';
import { addPost } from '../features/board/action';
import { useRouter } from 'next/dist/client/router';
import { meSelector } from '../features/user/userSclice';
import { postSelector } from '../features/board/boardSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleContainer: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

function MyComponent() {
  const board = useSelector((state: RootState) => state.board);
  const me = useSelector(meSelector);
  const post = useSelector(postSelector);
  const [title, setTitle] = useState('');
  const typ = useTypicalStyles();
  const div = useDivStyles();
  const st = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const ReactQuill =
    typeof window === 'object' ? require('react-quill') : () => false;
  const [value, setValue] = useState('');

  useEffect(() => {
    // 게시글 추가 성공
    if (board && board.addingPostSuccess) {
      router.push('/board');
    }
  }, [board, board.addingPostSuccess]);

  // useEffect(() => {
  //   if (!me) {
  //     alert('로그인이 필요합니다.');
  //     router.push('/board');
  //   }
  // }, []);

  // const onClickSubmit = () => {
  //   dispatch(addPost());
  // };

  return (
    <div>
      <Typography className={typ.marginThree} align="center" variant="h4">
        게시글 작성
      </Typography>
      <Grid className={st.titleContainer} container>
        <Grid className={div.centerFlex} item xs={6} md={2}>
          <FormControl className={st.formControl}>
            <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={10}
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid className={div.centerFlex} item xs={6} md={2}>
          <FormControl className={st.formControl}>
            <InputLabel id="demo-simple-select-label">과목</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={10}
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid className={div.centerFlex} item xs={2} md={1}>
          <Typography variant="h6">제목</Typography>
        </Grid>
        <Grid className={div.centerFlex} item xs={10} md={6}>
          <TextField
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth
          />
        </Grid>
      </Grid>
      <ReactQuill
        style={{ textAlign: 'left' }}
        theme="snow"
        value={value}
        onChange={setValue}
      />
      <div className={clsx(typ.center, typ.marginTwo)}>
        <Button variant="contained">제출</Button>
      </div>
    </div>
  );
}

export default MyComponent;
