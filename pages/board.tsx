import React, { ObjectHTMLAttributes } from 'react'
import {Table,TableCell, TableHead, TableRow, TableBody, Button} from '@material-ui/core/'
import {Paper} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {useState, useEffect} from 'react';


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
        content : "두 번째 게시물의 내용입미다",
        createdAt : "2020-10-17 23:23",  
    },
    {
        postId : 3,
        userId : 201521311,
        subjectId : 3,
        title : "세 번째 게시물 입미다",
        content : "과제 언제까지 제출하는 건가요?",
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
]

const columns = ["게시물 번호", "학번", "강의", "제목", "내용", "생성 날짜"]

function MyTable(){  //Table로 만든거
    const tableStyle= tableStyles();
    console.log({useTheme});
    return (
        <Table component = {Paper}>
            <TableHead>
                <TableRow>
                    {columns.map(c => 
                    <TableCell align = 'center'>{c}</TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
                {post.map(p=>
                        <TableRow className = {p.postId %2== 0 ? tableStyle.evenrows : tableStyle.rows} key = {p.userId}>
                        <TableCell align = 'center'>{p.postId}</TableCell>
                        <TableCell align = 'center'>{p.userId}</TableCell>
                        <TableCell align = 'center'>{p.subjectId}</TableCell>
                        <TableCell align = 'center'>{p.title}</TableCell>
                        <TableCell align = 'center'>{p.content.length < 10 ? p.content : p.content.slice(0,10) + "..."}</TableCell>
                        <TableCell align = 'center'>{p.createdAt}</TableCell>
                </TableRow>)}

                {//pagination}
                /*post.slice(0,3).map(p=><TableRow className = {p.postId %2== 0 ? tableStyle.evenrows : tableStyle.rows} key = {p.userId}>
                        <TableCell align = 'center'>{p.postId}</TableCell>
                        <TableCell align = 'center'>{p.userId}</TableCell>
                        <TableCell align = 'center'>{p.subjectId}</TableCell>
                        <TableCell align = 'center'>{p.title}</TableCell>
                        <TableCell align = 'center'>{p.content.length < 10 ? p.content : p.content.slice(0,10) + "..."}</TableCell>
                        <TableCell align = 'center'>{p.createdAt}</TableCell>
                </TableRow>)*/}
            </TableBody>
        </Table>
    )
}

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
    const useStyles = tableStyles();

    //pagination..
    /*const array = [];
    const [totalPage, setTotalPage] = useState<number>([]);
    
    useEffect(()=>
        
    {for(let i=0; i++; i<post.length)
        setTotalPage(totalPage => totalPage.concat(i));
    console.log(totalPage);
    }
    )*/
    return (
        <div className = {useStyles.root}>
        <MyTable/>
        <PaginationButtons/>
        </div>
    )
}