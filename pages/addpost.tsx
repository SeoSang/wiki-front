import React, { useState } from 'react';
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
  const typ = useTypicalStyles();
  const div = useDivStyles();
  const st = useStyles();
  const ReactQuill =
    typeof window === 'object' ? require('react-quill') : () => false;
  const [value, setValue] = useState('');
  console.log(title);
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
