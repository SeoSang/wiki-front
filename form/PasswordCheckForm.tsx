import { Button, TextField, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { useDivStyles, useMarginStyles } from '../styles/cssStyle';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { passwordCheck } from '../features/user/action';
import { useTypedSelector } from '../features';
import { useRouter } from 'next/dist/client/router';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const PasswordCheckForm = () => {
  const classes = useStyle();
  const [password, setPassword] = useState('');
  const div = useDivStyles();
  const mar = useMarginStyles();
  const dispatch = useDispatch();
  const { passCheckOK } = useTypedSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (passCheckOK) router.push('/mypage');
  }, [passCheckOK]);

  const onClickPasswordCheck = () => {
    dispatch(passwordCheck({ password }));
  };

  return (
    <div className={classes.paper}>
      <h2 id="transition-modal-title">비밀번호 확인!</h2>
      <div>
        <TextField
          variant="filled"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></TextField>
      </div>
      <div className={clsx(div.centerColFlex, mar.mar2)}>
        <Button variant="contained" onClick={onClickPasswordCheck}>
          확인
        </Button>
      </div>
      <div className={clsx(div.centerColFlex)}>
        <Typography color="error" variant="caption">
          비밀번호가 틀립니다!
        </Typography>
      </div>
    </div>
  );
};

export default PasswordCheckForm;
