import React from 'react'
import {Table,TableCell, TableHead, TableRow, TableBody} from '@material-ui/core/'
import {Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const postStyles = makeStyles({
    
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
    }
]

const columns = ["게시물 번호", "학번", "강의", "제목", "내용", "생성 날짜"]

export default function Post() {
    return (
        <Table component = {Paper}>
            <TableHead>
                <TableRow>
                    {columns.map(c => 
                    <TableCell align = 'center'>{c}</TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
                {post.map(p=> (
                <TableRow key = {p.userId}>
                        <TableCell align = 'center'>{p.postId}</TableCell>
                        <TableCell align = 'center'>{p.userId}</TableCell>
                        <TableCell align = 'center'>{p.subjectId}</TableCell>
                        <TableCell align = 'center'>{p.title}</TableCell>
                        <TableCell align = 'center'>{p.content.length < 10 ?p.content : p.content.slice(0,10) + "..."}</TableCell>
                        <TableCell align = 'center'>{p.createdAt}</TableCell>
                </TableRow>))} 
            </TableBody>
        </Table>
    )
}