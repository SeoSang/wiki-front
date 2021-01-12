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
import { addPost } from '../features/board/action';
import { loadSubjects } from '../features/subject/action';
import { meSelector } from '../features/user/userSlice';
import { loadMe } from './../features/user/action';

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
  const router = useRouter();
  const dispatch = useDispatch();
  const { subjects } = useTypedSelector((state) => state.subject);
  const { isLoadingPosts } = useTypedSelector((state) => state.board);
  const me = useTypedSelector(meSelector);
  const ReactQuill =
    typeof window === 'object' ? require('react-quill') : () => false;
  const [visible, setVisible] = useState(true);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [categoryValue, setCategoryValue] = useState(1);
  const [subjectValue, setSubjectValue] = useState<number | null>(1);

  useEffect(() => {
    dispatch(loadSubjects({}));
    dispatch(loadMe({}));
    console.log(me); 
  }, []);
  const submitPost = () => {
    // router.replace({pathname :'board'})
    dispatch(
      addPost({
        post: {
          userId: me?.userId,
          subjectId: subjectValue,
          categoryId: categoryValue,
          title: title,
          text: text,
        },
      })
    );
  };
  const handleSubjectChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSubjectValue(event.target.value as number);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value: number = parseInt(event.target.value as string);
    if (value == 2) setSubjectValue(null);
    setCategoryValue(value);
    setVisible(value != 2);
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
              value={categoryValue}
              onChange={handleCategoryChange}
            >
              <MenuItem value={1}>과목게시판</MenuItem>
              <MenuItem value={2}>자유게시판</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid className={div.centerFlex} item xs={6} md={2}>
          <FormControl className={st.formControl} disabled={!visible}>
            <InputLabel id="demo-simple-select-label">과목</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={subjectValue}
              onChange={handleSubjectChange}
            >
              {subjects?.map((subject) => (
                <MenuItem
                  key={`subjectid_${subject.subjectId}`}
                  value={subject.subjectId}
                >
                  {subject.subjectName}
                </MenuItem>
              ))}
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
        value={text}
        onChange={(e: string) => {
          setText(e);
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
