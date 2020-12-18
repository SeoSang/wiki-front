import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Button,
  List
} from '@material-ui/core/';
import { Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { getPostsAPI } from '../features/user/api';
import { useTypedSelector } from '../features';
import { loadPosts } from './../features/board/action';
import { useRouter } from 'next/dist/client/router';

const tableStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rows: {
    cursor : 'pointer',
    backgroundColor: 'white',
    '&:hover':{
      opacity : 0.6
    }
  },
  evenrows: {
    cursor : 'pointer',
    backgroundColor: '#F0F3FF',
    '&:hover':{
      opacity : 0.6
    }
  },
  pagebuttons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10px',
  },
});

const columns = ['게시물 번호', '학번', '강의', '제목', '내용', '생성 날짜'];
const PAGE_PER_BOARDS = 3;

export default function Board() {
  const dispatch = useDispatch();
  const { posts, page, total, isLoadingPosts } = useTypedSelector((state) => state.board);
  const useStyles = tableStyles();
  const router = useRouter();
  const pages = total / PAGE_PER_BOARDS; 
  const [pagearray , setPagearray] = useState<number[]>([]);

  useEffect(() => {
    dispatch(loadPosts({ subjectId : 1,categoryId: 1, page: 1 }));  
    console.log(pages);  
  }, []);

  useEffect(()=>{    
     for(let i : number=1; i < pages+1; i++){
        setPagearray(pagearray => pagearray.concat(i));
    }   
  },[total])
  const onClickPost = (boardId: number) => () => {
    router.push({ pathname: '/post/', query: { id: boardId} });
  };
  const changePage = (value : number) => {
    dispatch(loadPosts({ subjectId : 1,categoryId: 1, page: value }));
  }
  return (
    <div className={useStyles.root}>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell align="center">{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {posts?.map((p) => (
            <TableRow
              key={`table_key_${p.boardId}`}
              className={
                p.boardId % 2 == 0 ? useStyles.evenrows : useStyles.rows
              }
              onClick={onClickPost(p.boardId)}
            >
              <TableCell align="center">{p.boardId}</TableCell>
              <TableCell align="center">{p.userId}</TableCell>
              <TableCell align="center">{p.subjectId}</TableCell>
              <TableCell align="center">{p.title}</TableCell>
              <TableCell align="center">
                {p.text.length < 10 ? p.text : p.text.slice(0, 10) + '...'}
              </TableCell>
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
        {pagearray.map((value) => (
          <List className={useStyles.pagebuttons} key={value}>
              <Button onClick={()=> changePage(value)}>{value}</Button>
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
