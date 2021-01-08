import { Button, TextField, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { useDivStyles, useMarginStyles } from '../styles/cssStyle';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { addFavorite, passwordCheck } from '../features/user/action';
import { useTypedSelector } from '../features';
import { useRouter } from 'next/dist/client/router';
import { meSelector } from '../features/user/userSlice';

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

const IconNameForm = ({
  userId,
  subjectId,
}: {
  userId: number;
  subjectId: number;
}) => {
  const classes = useStyle();
  const div = useDivStyles();
  const mar = useMarginStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const [iconName, setIconName] = useState('');
  const me = useTypedSelector(meSelector);

  const onClickAddFavorite = () => {
    dispatch(addFavorite({ iconName, userId: me!.userId, subjectId }));
  };

  return (
    <div className={classes.paper}>
      <h2 id="transition-modal-title">즐겨찾기 별명을 설정해주세요!</h2>
      <div>
        <TextField
          variant="filled"
          value={iconName}
          onChange={(e) => {
            setIconName(e.target.value);
          }}
        ></TextField>
      </div>
      <div className={clsx(div.centerColFlex, mar.mar2)}>
        <Button variant="contained" onClick={onClickAddFavorite}>
          추가!
        </Button>
      </div>
    </div>
  );
};

export default IconNameForm;
