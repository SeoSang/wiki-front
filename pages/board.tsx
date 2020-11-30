import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Button,
} from '@material-ui/core/';
import { Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import {getPostsAPI} from '../features/user/api'
import {getPosts} from '../features/user/pageSlice'

import {
  updateCurrentPage,
  updateStartEndPage,
} from '../features/user/pageSlice';
import { useTypedSelector } from '../features';

const tableStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rows: {
    backgroundColor: 'white',
  },
  evenrows: {
    backgroundColor: '#F0F3FF',
  },
  pagebuttons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '20px',
  },
});

const columns = ['게시물 번호', '학번', '강의', '제목', '내용', '생성 날짜'];

export default function Board() {
  const dispatch = useDispatch();
  const { page, amount, start, end, currentPosts } = useTypedSelector(
    state => state.page
  );
  const useStyles = tableStyles();
  const array = [];

  useEffect(() => {
    dispatch(getPosts({categoryId : 1, page : 1,amount : 10}));
  }, []);

  for (let i = 0; i < end; i++) {
    array.push(i + 1);
  }
  const target = array.slice(start, end);
  return (
    <div className={useStyles.root}>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            {columns.map(c => (
              <TableCell align="center">{c}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts.map(p => (
            
            <TableRow
              key={p.postId}
              className={
                p.postId % 2 == 0 ? useStyles.evenrows : useStyles.rows
              }
            >
              <TableCell align="center">{p.postId}</TableCell>
              <TableCell align="center">{p.userId}</TableCell>
              <TableCell align="center">{p.subjectId}</TableCell>
              <TableCell align="center">{p.title}</TableCell>
              <TableCell align="center">
                {p.text.length < 10
                  ? p.text
                : p.text.slice(0, 10) + '...'}
              </TableCell>
              <TableCell align="center">{p.createdAt}</TableCell>
            </TableRow>
                ))}
        </TableBody>
      </Table>
      <div>
        <Button
          onClick={() => {
            if (page === 1) return alert('첫번째 페이지 입니다');
            else if (page % 10 === 1) {
              const s = start - 10;
              const e = end - 10;
              const [range, setRange] = useState({});
              setRange({ s, e });
              //dispatch(updateStartEndPage())
            }
            dispatch(updateCurrentPage(page - 1));
          }}
        ></Button>
      </div>
      <div className={useStyles.pagebuttons}>
        {target.map(value => (
          <li className={useStyles.pagebuttons} key={value}>
            <button
              // onClick={() => {
              //   dispatch(getPosts(1, 1, 10));
              // }}
            >
              {value}
            </button>
          </li>
        ))}
      </div>
      현재 페이지 : {page}
    </div>
  );
}

// export async function getStaticProps() {
//   const dispatch = useDispatch();
//   dispatch(loadPosts());
// }
