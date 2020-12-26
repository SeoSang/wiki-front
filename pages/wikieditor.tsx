import React, {useState, useRef, useEffect} from 'react';
import {makeStyles} from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import {Paper, Button,Divider} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WikiContents from './wikicontents';
import { editorContainerStyles } from '../styles/cssStyle'
import 'react-quill/dist/quill.snow.css';
import '../features/user/api'
import { loadWiki, updateWiki } from './../features/wiki/action';
import { loadPost } from '../features/board/action';
import { useTypedSelector } from '../features';
import { Classification } from './../features/wiki/type';


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

const [isRefresh, setIsRefresh] = useState(0);

const WikiContentEditor = ({item, id}:{item: Classification , id: number })=>{    
    const dispatch = useDispatch();
    const [value, setValue] = useState(item.text);
    const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
    const submit =() => {
        dispatch(updateWiki({wiki : {wikiId : item.wikiId, classificationId : item.classificationId, subjectId : id, text : value }}));
    }
    return(
        <div>
            <ReactQuill
            style={{ textAlign: 'left' }}
            theme="snow"
            value={value}
            onChange={setValue}
            />
            <Button onClick={()=> submit()}>저장</Button>
        </div> 
    )
}

export default function WikiEditor(){
    const dispatch = useDispatch();
    const { classification, wiki, wikiSubject } = useTypedSelector((state)=>state.wiki);
    useEffect(()=>{
        dispatch(loadWiki({subjectId : 1}));    
    },[])
    const contentsRef = useRef([]);
    const classes = editorContainerStyles();
    const [editorContent, setEditorContent] = useState<string>('');
    const [isContentOpened, setIsContentOpened] = useState<string[]>([]);
    const [isEditorOpened, setIsEditorOpened] = useState([]);
     const onClickIndex = (id : number) => {  
         //let focusContent = indexlist.find(i => i.id === id);
         //contentsRef.current = focusContent;
         //contentsRef.current.focus(); 
     }
    const openContent = (id :string) => {        
        if(isContentOpened.find(c=> c === id)){
            setIsContentOpened(isContentOpened => isContentOpened.filter(c=> c !== id));
        }
        else setIsContentOpened(isContentOpened => isContentOpened.concat(id));        
    } 
    const openEditor = (id : string) => {
        //console.log(id);
        setEditorContent(id);
        if(isEditorOpened.find(e=> e === id)){
            setIsEditorOpened(isEditorOpened => isEditorOpened.filter(e=> e !== id));
        }
        else setIsEditorOpened(isEditorOpened => isEditorOpened.concat(id));  
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
                    {classification?.map(item => 
                        <div className = {item.groupId.length > 1 ? classes.indexSubTitle : classes.indexTitle}>
                            <Button onClick={() => onClickIndex}>{item.groupId}. {item.title}</Button>
                        </div>)}
            </Paper>

            <div className = {classes.contentsContainer}>
                {classification?.map(item =>
                    <div style={{fontSize:'30px'}} className = {classes.indexTitle}>               
                        <div className={classes.contentsRow}>
                            <span><Button onClick={() => openContent(item.groupId)}><ExpandMoreIcon/></Button>{item.groupId}. {item.title} </span>                                                
                            <span style={{textDecoration : 'underline'}}>
                                <Button onClick={()=> openEditor(item.groupId)}>수정</Button>
                            </span>
                        </div>
                        <Divider/>                     
                        {isContentOpened.find(m => m === item.groupId) && !isEditorOpened.find(m=>m=== item.groupId) ?  <div dangerouslySetInnerHTML={{ __html: item.text }}></div> :""}
                        {
                            isEditorOpened.find(e => e === item.groupId)
                            //item.groupId === editorContent
                            ?
                            //  <ReactQuill
                            //      style={{ textAlign: 'left' }}
                            //      theme="snow"
                            //      value={value}
                            //      onChange={setValue}
                            //  />
                                //console.log(editorContent)  q
                                <WikiContentEditor item={item} id ={wikiSubject?.subjectId}/>
                            : ""
                        }
                    </div>)}
            </div>
        </Paper>

    )
}
