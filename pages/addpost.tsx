import React, { useState, useEffect } from 'react';
import {useDispatch } from 'react-redux';
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
import { postPostsAPI } from '../features/user/api'
import { updatePostId } from '../features/user/boardSlice'
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
  const typ = useTypicalStyles();
  const div = useDivStyles();
  const st = useStyles();
  const ReactQuill =
    typeof window === 'object' ? require('react-quill') : () => false;
  const [contents, setContents] = useState({
    postId : 0,
    subjectId : 0,
    title : "",
    text : "",
    createDate : "",
    hitNum : 0    
  });
  const { postId, subjectId, title, text, createDate, hitNum} = contents;

  
  const dispatch = useDispatch();
  
  const { updatedPostId }  = useTypedSelector(state => state.board)
  useEffect(()=> {
    dispatch(updatePostId(1)); 
    setContents({
      postId : updatedPostId,
      subjectId : 1,
      title : "",
      text : "",
      createDate : "2020-10-20",
      hitNum : 0    
    })    
  },[])

  const submitPost = () => {
    postPostsAPI(contents);
  }

  return (
    <div>
      <Typography className={typ.marginThree} align="center" variant="h4">
        게시글 작성
      </Typography>
      <Grid className={st.titleContainer} container>
        <Grid className={div.centerFlex} item xs={12} md={3}>
          <Typography variant="h6">제목</Typography>
        </Grid>
        <Grid className={div.centerFlex} item xs={12} md={8}>
          <TextField
            value={title}
            onChange={(e) => {
              setContents({...contents, title : e.target.value});            
            }}
            fullWidth
          />
        </Grid>
      </Grid>
      <ReactQuill
        style={{ textAlign: 'left' }}
        theme="snow"
        value={text}
        onChange = {(e : string) => {
            setContents({...contents, text : e})
        }}
      />
      <div className={clsx(typ.center, typ.marginTwo)}>
        <Button onClick = {submitPost} variant="contained">제출</Button>
      </div>
    </div>
  );
}

export default MyComponent;
