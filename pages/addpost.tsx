import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useTypicalStyles } from '../styles/cssStyle';
import { Button, Typography } from '@material-ui/core';
import clsx from 'clsx';

function MyComponent() {
  const st = useTypicalStyles();
  const ReactQuill =
    typeof window === 'object' ? require('react-quill') : () => false;
  const [value, setValue] = useState('');
  console.log(value);
  return (
    <div>
      <Typography className={st.marginThree} align="center" variant="h4">
        게시글 작성
      </Typography>
      <ReactQuill
        style={{ textAlign: 'left' }}
        theme="snow"
        value={value}
        onChange={setValue}
      />
      <div className={clsx(st.center, st.marginTwo)}>
        <Button variant="contained">제출</Button>
      </div>
    </div>
  );
}

export default MyComponent;
