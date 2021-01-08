import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import StarsIcon from '@material-ui/icons/Stars';
import { useDispatch, useSelector } from 'react-redux';
import {
  subjectSelector,
  subjectsSelector,
} from '../features/subject/subjectSlice';
import { addFavorite } from '../features/user/action';
import { useTypedSelector } from '../features';
import { meSelector } from '../features/user/userSlice';
import { useRouter } from 'next/dist/client/router';
import IconNameForm from '../form/IconNameForm';
import { openIconNameModal } from '../features/etc/etcSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // TODO: refactor common css styles (e.g. SubjectTable and SearchBar)
      padding: '2px 4px',
      width: '80%',
      marginTop: theme.spacing(3),
    },
  })
);

const SubjectTable = () => {
  const classes = useStyles();
  const subjects = useSelector(subjectsSelector);
  const dispatch = useDispatch();
  const me = useTypedSelector(meSelector);
  const [iconName, setIconName] = useState('');
  const { IconNameModalOpen } = useTypedSelector((state) => state.etc);

  const onClickAddFavorite = (favorite: {
    userId: number;
    subjectId: number;
  }) => () => {
    dispatch(openIconNameModal());
  };

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="subject table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 80 }} align="center">
              연도
            </TableCell>
            <TableCell style={{ width: 80 }} align="center">
              학기
            </TableCell>
            <TableCell align="center">과목</TableCell>
            <TableCell align="center">교수님</TableCell>
            <TableCell align="center">즐겨찾기</TableCell>
            {IconNameModalOpen ? (
              <TableCell align="center">선택</TableCell>
            ) : (
              ''
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects?.map((subject, i) => (
            <TableRow key={subject.subjectId}>
              <TableCell style={{ width: 120 }} align="center">
                {subject.year}
              </TableCell>
              <TableCell style={{ width: 80 }} align="center">
                {subject.semester}
              </TableCell>
              <TableCell align="center">{subject.subjectName}</TableCell>
              <TableCell align="center">{subject.professor}</TableCell>
              <TableCell style={{ width: 120 }} align="center">
                <IconButton
                  color="secondary"
                  onClick={onClickAddFavorite({
                    userId: me ? me.userId : 1,
                    subjectId: subject.subjectId,
                  })}
                >
                  <StarsIcon />
                </IconButton>
              </TableCell>
              {IconNameModalOpen ? (
                <TableCell align="center">
                  <IconNameForm
                    userId={me!.userId}
                    subjectId={subject.subjectId}
                  ></IconNameForm>
                </TableCell>
              ) : (
                ''
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubjectTable;
