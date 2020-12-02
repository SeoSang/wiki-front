import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import { postPostsAPI } from '../features/user/api';
import { useTypedSelector } from '../features';
import { useRouter } from 'next/dist/client/router';

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
  const typ = useTypicalStyles();
  const div = useDivStyles();
  const st = useStyles();
  //const router = useRouter();
  const dispatch = useDispatch();
  const ReactQuill =
    typeof window === 'object' ? require('react-quill') : () => false;
  const [contents, setContents] = useState({
    postId: 0,
    subjectId: 0,
    title: '',
    text: '',
    createDate: '',
    hitNum: 0,
  });
  const { postId, subjectId, title, text, createDate, hitNum } = contents;

  
  useEffect(() => {    
    setContents({
      postId: 1,
      subjectId: 1,
      title: '',
      text: '',
      createDate: '2020-10-20',
      hitNum: 0,
    });
  }, []);

  const submitPost = () => {
    postPostsAPI(contents);
  };

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
              setContents({ ...contents, title: e.target.value });
            }}
            fullWidth
          />
        </Grid>
      </Grid>
      <ReactQuill
        style={{ textAlign: 'left' }}
        theme="snow"
        value={text}
        onChange={(e: string) => {
          setContents({ ...contents, text: e });
        }}
      />
      <div className={clsx(typ.center, typ.marginTwo)}>
        <Button onClick={submitPost} variant="contained">
          제출
        </Button>
      </div>
    </div>
  );
}

export default MyComponent;
