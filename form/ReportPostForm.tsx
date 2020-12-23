import { Button, TextField, Theme, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { useDivStyles, useMarginStyles } from '../styles/cssStyle';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { reportPost } from '../features/user/action';
import { useTypedSelector } from '../features';
import { meSelector } from '../features/user/userSlice';
import { closeReportPostModal } from '../features/etc/etcSlice';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    formContainer: {
      width: '100%',
    },
  })
);

const ReportPostForm = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const div = useDivStyles();
  const mar = useMarginStyles();
  const me = useTypedSelector(meSelector);
  const { post } = useTypedSelector(state => state.board);

  const onClickReport = () => {
    dispatch(
      reportPost({
        boardId: post?.boardId ? post?.boardId : 1,
        reportContent: text,
        userId: me?.userId ? me?.userId : 1,
      })
    );
  };

  return (
    <div className={classes.paper}>
      <Alert variant="filled" severity="error">
        경고 — 허위 내용을 신고하면 처벌을 받을 수 있습니다!
      </Alert>
      <div className={div.centerColFlex}>
        <h2 id="transition-modal-title">신고 사유를 적어주세요!</h2>
        <TextField
          className={classes.formContainer}
          variant="filled"
          multiline
          value={text}
          size="medium"
          onChange={e => {
            setText(e.target.value);
          }}
        ></TextField>
        <div className={clsx(div.centerFlex, mar.mar2)}>
          <Button
            className={mar.marRight2}
            onClick={onClickReport}
            variant="contained"
          >
            확인
          </Button>{' '}
          <Button
            onClick={() => {
              dispatch(closeReportPostModal());
            }}
            variant="contained"
          >
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportPostForm;
