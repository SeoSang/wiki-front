import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Button,
  List,
  IconButton,
  Typography,
  Popover,
} from '@material-ui/core/';
import { Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { useTypedSelector } from '../features';
import { useRouter } from 'next/dist/client/router';
import { getAllReports, getAllUsers } from '../features/admin/action';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { CheckCircleOutline } from '@material-ui/icons';
import { usePaddingStyles } from '../styles/cssStyle';
import _ from 'lodash';
import clsx from 'clsx';
import moment from 'moment';
import { UserInfo } from '../features/user/type';

const tableStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rows: {
    backgroundColor: '#fcf8e8',
  },
  evenrows: {
    backgroundColor: '#d4e2d4',
  },
  pagebuttons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10px',
  },
  popover: {
    overflow: 'auto',
  },
});

const columns = [
  '유저번호',
  '대학이름',
  '학번',
  '이름',
  '이메일',
  '신고당한수',
];
const PAGE_PER_BOARDS = 3;
const AMOUNT_PER_BOARDS = 10;

export default function UserBoard() {
  const pad = usePaddingStyles();

  const dispatch = useDispatch();
  const { users, usersTotal } = useTypedSelector((state) => state.admin);
  const tab = tableStyles();
  const router = useRouter();
  const [pagearray, setPagearray] = useState<number[]>([]);

  useEffect(() => {
    dispatch(getAllUsers({ page: 1, amount: AMOUNT_PER_BOARDS }));
  }, []);

  useEffect(() => {
    const pages = Math.ceil(usersTotal / PAGE_PER_BOARDS);
    setPagearray([]);
    for (let i: number = 1; i < pages; i++) {
      setPagearray((pagearray) => pagearray.concat(i));
    }
  }, [usersTotal]);
  const onClickUser = (reportId: number) => () => {
    // router.push({ pathname: '/post/', query: { id: reportId } });
  };
  const changePage = (page: number) => {
    dispatch(
      getAllUsers({
        page,
        amount: AMOUNT_PER_BOARDS,
      })
    );
  };
  return (
    <div className={tab.root}>
      <Table size="small" component={Paper}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={`col_${col.toLowerCase()}`} align="center">
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(users as UserInfo[])?.map((user, index) => (
            <TableRow
              key={`table_key_${user.userId}`}
              className={user.userId % 2 == 0 ? tab.evenrows : tab.rows}
            >
              <TableCell align="center">{user.userId}</TableCell>
              <TableCell align="center">{user.univName}</TableCell>
              <TableCell align="center">{user.studentNumber}</TableCell>
              <TableCell align="center">{user.studentName}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.reportedNum}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div></div>
      <div className={tab.pagebuttons}>
        {pagearray.map((page) => (
          <List className={tab.pagebuttons} key={page}>
            <Button
              onClick={() => {
                changePage(page);
              }}
            >
              {page}
            </Button>
          </List>
        ))}
      </div>
    </div>
  );
}
