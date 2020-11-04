import React from 'react'
import { useDispatch } from 'react-redux';
import { Table,TableCell, TableHead, TableRow, TableBody, Button} from '@material-ui/core/'
import {Paper} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {useState, useEffect} from 'react';
import {updateCurrentPage, updateStartEndPage} from '../features/user/pageSlice';
import { useTypedSelector } from '../features';
const tableStyles = makeStyles({    
    root : {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    rows : {
      backgroundColor :'white'  
    },
    evenrows : {
        backgroundColor: '#F0F3FF'
    },
    pagebuttons : {
        display:'flex',
        flexDirection : 'row',
        marginTop : '20px',
    }
})

const post : Post[] = [
    {
        postId : 1,
        userId : 201421353,
        subjectId : 1,
        title : "첫 번째 게시물 입미다",
        content : "첫 번째",
        createdAt : "2020-10-17 21:33",  
    },    
    {
        postId : 2,
        userId : 201521355,
        subjectId : 2,
        title : "두 번째 게시물 입미다",
        content : "수업하나요?",
        createdAt : "2020-10-17 23:23",  
    },
    {
        postId : 3,
        userId : 201521311,
        subjectId : 3,
        title : "세 번째 게시물 입미다",
        content : "수업왜하나요?",
        createdAt : "2020-10-17 23:23",  
    },
    {
        postId : 4,
        userId : 201621323,
        subjectId : 4,
        title : "네 번째 게시물 입미다",
        content : "수업하나요?",
        createdAt : "2020-10-18 24:23",  
    },
    {
        postId : 5,
        userId : 201621323,
        subjectId : 4,
        title : "다섯 번째 게시물 입미다",
        content : "수업하나요?",
        createdAt : "2020-10-18 24:23",  
    },
    {
        postId : 6,
        userId : 201621323,
        subjectId : 4,
        title : "여섯 번째 게시물 입미다",
        content : "수업하나요?",
        createdAt : "2020-10-18 24:23",  
    },
    {
        postId : 7,
        userId : 201621323,
        subjectId : 4,
        title : "일곱 번째 게시물 입미다",
        content : "수업하나요?",
        createdAt : "2020-10-18 24:23",  
    },
]

const columns = ["게시물 번호", "학번", "강의", "제목", "내용", "생성 날짜"]

function PaginationButtons(){
    const useStyles = tableStyles();
    const theme = useTheme();
    const [currentPage, setCurrentPage] = useState(0);

    const rowsperPage:number = 3;
    return(
        <div>
        <div className = {useStyles.pagebuttons}>
        {currentPage !== 0 ? <Button onClick = {() => setCurrentPage(currentPage => currentPage-1)} >뒤로</Button> : ""}
        <Button onClick = {() => setCurrentPage(currentPage => currentPage+1)}>앞으로</Button>        
        </div>
        {currentPage !==0 ? <div>현재 페이지 : {currentPage} </div> : ""}
        </div>
    )
}

export default function Board() {
    const dispatch = useDispatch();
    const {start, current, end} = useTypedSelector(state => state.page);
    const useStyles = tableStyles();
    const per = 5;
    const postCount = post.length;
    const total = Math.ceil(postCount / per);
    const array = [];

    for (let i=0 ; i<total; i++){
        array.push(i+1);
    }
    const target = array.slice(start, end); 
    return (
        <div className = {useStyles.root}>         
        <Table component = {Paper}>
        <TableHead>
            <TableRow>
                {columns.map(c => 
                    <TableCell align = 'center'>{c}</TableCell>)}
            </TableRow>
        </TableHead>
        <TableBody>
            {post.map(p=>
                    <TableRow key = {p.postId} className = {p.postId %2== 0 ? useStyles.evenrows : useStyles.rows}>
                        <TableCell align = 'center'>{p.postId}</TableCell>
                        <TableCell align = 'center'>{p.userId}</TableCell>
                        <TableCell align = 'center'>{p.subjectId}</TableCell>
                        <TableCell align = 'center'>{p.title}</TableCell>
                        <TableCell align = 'center'>{p.content.length < 10 ? p.content : p.content.slice(0,10) + "..."}</TableCell>
                        <TableCell align = 'center'>{p.createdAt}</TableCell>
                    </TableRow>)}
        </TableBody>
        </Table>
        <div>
            <Button onClick = {()=> {
                if(current === 1) return alert('첫번째 페이지 입니다')
                else if (current % 10 === 1) {
                    const s = start - 10;
                    const e = end - 10;
                    const [range, setRange] = useState({});
                    setRange({s,e});
                    //dispatch(updateStartEndPage())
                }
                dispatch(updateCurrentPage(current - 1));
            }}>

            </Button>
        </div>

        <div className ={useStyles.pagebuttons}>
        {target.map(value => (
            <li className ={useStyles.pagebuttons} key ={value}>
                <button onClick ={()=> {dispatch(updateCurrentPage(value))}}>
                    {value}
                </button>
            </li>
        ))}
        
        </div>
        현재 페이지 : {current}
        </div>
    )
}