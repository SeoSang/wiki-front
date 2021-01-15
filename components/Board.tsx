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
  Typography,
} from '@material-ui/core/';
import { Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { getPostsAPI } from '../features/user/api';
import { useTypedSelector } from '../features';
import { loadPosts } from './../features/board/action';
import { useRouter } from 'next/dist/client/router';
import { useDivStyles, useTypicalStyles } from './../styles/cssStyle';
import clsx from 'clsx';

const tableStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rows: {
    cursor: 'pointer',
    backgroundColor: 'white',
    '&:hover': {
      opacity: 0.6,
    },
  },
  evenrows: {
    cursor: 'pointer',
    backgroundColor: '#F0F3FF',
    '&:hover': {
      opacity: 0.6,
    },
  },
  pagebuttons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10px',
  },
});

const columns = ['게시물 번호', '학번', '강의', '제목', '생성 날짜'];
const BOARDS = ['에러', '과목게시판', '자유게시판', '공지게시판'];
const freeBoardColumns = ['게시물 번호', '학번', '제목', '생성 날짜'];
const PAGE_PER_BOARDS = 3;

export default function Board({
  categoryId,
  subjectId,
  subjectName,
}: {
  categoryId: number;
  subjectId?: number;
  subjectName?: string | string[];
}) {
  const dispatch = useDispatch();
  const { posts, page, total, isLoadingPosts } = useTypedSelector(
    state => state.board
  );

  const useStyles = tableStyles();
  const router = useRouter();
  const pages = total / PAGE_PER_BOARDS;
  const [pagearray, setPagearray] = useState<number[]>([]);
  const div = useDivStyles();
  const typ = useTypicalStyles();

  useEffect(() => {
    dispatch(
      loadPosts({
        subjectId: subjectId ? subjectId : 0,
        categoryId: categoryId,
        page: 1,
      })
    );
  }, []);

  useEffect(() => {
    setPagearray([]);
    for (let i: number = 1; i < pages + 1; i++) {
      setPagearray(pagearray => pagearray.concat(i));
    }
  }, [total]);
  const onClickPost = (boardId: number) => () => {
    router.push({ pathname: '/post/', query: { id: boardId } });
  };
  const changePage = (value: number) => {
    // router.push({ pathname: '/board/', query: { page: value } });
    dispatch(
      loadPosts({
        subjectId: subjectId ? subjectId : 0,
        categoryId: categoryId,
        page: value,
      })
    );
  };
  return (
    <div className={useStyles.root}>
      <div className={clsx(div.centerStartFlex, typ.botMarginThree)}>
        {categoryId == 1 ? (
          <Typography variant="h4">질문 게시판</Typography>
        ) : (
          <Typography variant="h4">자유 게시판</Typography>
        )}
      </div>
      <div className={clsx(div.endFlex, typ.botMarginThree)}>
        <Button onClick={() => router.push('addpost')}>글 작성하기</Button>
      </div>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            {categoryId == 1
              ? columns.map(col => (
                  <TableCell key={`col_${col.toLowerCase()}`} align="center">
                    {col}
                  </TableCell>
                ))
              : freeBoardColumns.map(col => (
                  <TableCell key={`col_${col.toLowerCase()}`} align="center">
                    {col}
                  </TableCell>
                ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {posts?.map(p => (
            <TableRow
              key={`table_key_${p.boardId}`}
              className={
                p.boardId % 2 == 0 ? useStyles.evenrows : useStyles.rows
              }
              onClick={onClickPost(p.boardId)}
            >
              <TableCell align="center">{p.boardId}</TableCell>
              <TableCell align="center">{p.userId}</TableCell>
              {p.subjectId === 0 ? null : (
                <TableCell align="center">{p.subjectVO?.subjectName}</TableCell>
              )}
              <TableCell align="center">{p.title}</TableCell>
              {/* <TableCell align="center">
                {p.text.length < 10 ? p.text : p.text.slice(0, 10) + '...'}
                <div dangerouslySetInnerHTML={{ __html: p?.text }}></div>
              </TableCell> */}
              <TableCell align="center">{p.createDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        {/*<Button
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
        ></Button>*/}
      </div>
      <div className={useStyles.pagebuttons}>
        {pagearray.map(value => (
          <List className={useStyles.pagebuttons} key={value}>
            <Button onClick={() => changePage(value)}>{value}</Button>
          </List>
        ))}
      </div>
    </div>
  );
}

// export async function getStaticProps() {
//   const dispatch = useDispatch();
//   dispatch(loadPosts());
// }
