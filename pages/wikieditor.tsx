import React, {useState, useRef, useEffect} from 'react';
import {makeStyles} from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import {Paper, Button,Divider} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WikiContents from './wikicontents';
import { editorContainerStyles } from '../styles/cssStyle'
import 'react-quill/dist/quill.snow.css';
import '../features/user/api'
import { loadWiki } from './../features/wiki/action';


interface IndexList {
    id : string,
    title : string,
    content : string
}

const indexlist:IndexList[] = [{
    id : '1',
    title : '큰 목차 1',
    content : '이것은 큰 목차1'
},{
    id : '1.1',
    title : '작은 목차 1',
    content : '이것은 작은 목차1'
},
 {
    id : '2',
    title: '큰 목차 2',
    content : '이것은 큰 목차2'
},
{
   id : '3',
   title: '큰 목차 3',
   content : '이것은 큰 목차3'
},
{
   id : '4',
   title: '큰 목차 4',
   content : '이것은 큰 목차4'
},
]

export default function WikiEditor(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(loadWiki({subjectId : 1}));
    },[])
    const contentsRef = useRef([]);
    const classes = editorContainerStyles();
    const [isContentOpened, setIsContentOpened] = useState([]);
    const [isEditorOpened, setIsEditorOpened] = useState([]);

     const onClickIndex = (id : number) => {  
         let focusContent = indexlist.find(i => i.id === id);
         //contentsRef.current = focusContent;
         //contentsRef.current.focus();
     }
    const openContent = (id :number) => {        
        if(isContentOpened.find(c=> c === id)){
            setIsContentOpened(isContentOpened => isContentOpened.filter(c=> c !== id));
        }
        else setIsContentOpened(isContentOpened => isContentOpened.concat(id));        
    } 
    const openEditor = (id : number) => {
        if(isEditorOpened.find(e=> e === id)){
            setIsEditorOpened(isContentOpened => isContentOpened.filter(e=> e !== id));
        }
        else setIsEditorOpened(isContentOpened => isContentOpened.concat(id));  
    }
    const ReactQuill =
    typeof window === 'object' ? require('react-quill') : () => false;
    const [value, setValue] = useState('');
    return(
        <Paper className = {classes.root}>
            
            <div className = {classes.titleContainer}>
                <h1 className = {classes.title}>신화와 철학</h1>
                <Button variant="contained" color ="primary" className ={classes.titleButton}>게시판 이동</Button>
            </div>
            
            <Paper className ={classes.indexContainer} variant="outlined" >
                <h2>목차</h2>                    
                    {indexlist.map(i => 
                        <div className = {i.id.length > 1 ? classes.indexSubTitle : classes.indexTitle}>
                            <Button onClick={() => onClickIndex}>{i.id}. {i.title}</Button>
                        </div>)}
            </Paper>

            <div className = {classes.contentsContainer}>
                {indexlist.map(i =>
                    <div style={{fontSize:'30px'}} className = {classes.indexTitle}>               
                        <div className={classes.contentsRow}>
                            <span><Button onClick={() => openContent(i.id)}><ExpandMoreIcon/></Button>{i.id}. {i.title} </span>                                                
                            <span style={{textDecoration : 'underline'}}>
                                <Button onClick={()=> openEditor(i.id)}>수정</Button>
                            </span>
                        </div>
                        <Divider/>                     
                        {isContentOpened.find(m => m === i.id) ? i.content :""}
                        {
                            isEditorOpened.find(e => e === i.id) ? 
                            <ReactQuill
                                style={{ textAlign: 'left' }}
                                theme="snow"
                                value={value}
                                onChange={setValue}
                            /> : ""
                        }
                    </div>)}
            </div>
        </Paper>

    )
}
