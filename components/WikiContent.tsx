import React, { useState } from 'react'
import { editorContainerStyles } from '../styles/componentStyle';
import { Classification } from '../features/wiki/type';
import { Button } from '@material-ui/core';
import { useTypedSelector } from '../features';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelIcon from '@material-ui/icons/Cancel';
import Divider from '@material-ui/core/Divider';
import WikiContentEditor from './WikiContentEditor';


const WikiContent = ({ classification }:{ classification : Classification[] | null}) =>{
    const classes = editorContainerStyles();
    const [isContentOpened, setIsContentOpened] = useState<string[]>([]);
    const [isEditorOpened, setIsEditorOpened] = useState([]);
    const { wikiSubject } = useTypedSelector((state) => state.wiki);
    const openContent = (id :string) => {        
        setIsContentOpened(isContentOpened => isContentOpened.concat(id));        
    } 
    const closeContent = (id : string) => {
        if(isContentOpened.find(c=> c === id)){
            setIsContentOpened(isContentOpened => isContentOpened.filter(c=> c !== id));
        }
    }
    const openEditor = (id : string) => {
        setIsEditorOpened(isEditorOpened => isEditorOpened.concat(id));  
    }

    const closeEditor = (id :string) =>{
        if(isEditorOpened.find(e=> e === id)){
            setIsEditorOpened(isEditorOpened => isEditorOpened.filter(e=> e !== id));
        }
    }
    return(
        <div className = {classes.contentsContainer}>
        {classification?.map((item, index) =>
            <div style={{fontSize:'30px'}} className = {classes.indexTitle}>               
                <div className={classes.contentsRow}>
                    <span>
                    {isContentOpened.find(c => c === item.groupId) ? 
                      <Button onClick={()=> closeContent(item.groupId)}><ExpandLessIcon/></Button> : <Button onClick={() => openContent(item.groupId)}><ExpandMoreIcon/></Button>                                         
                    }
                    {item.groupId}. {item.title}
                    </span>                            
                    <span style={{textDecoration : 'underline'}}>
                        {isEditorOpened.find(e => e === item.groupId)?
                         <Button onClick={()=> closeEditor(item.groupId)}><CancelIcon/></Button> : <Button onClick={()=> openEditor(item.groupId)}>수정</Button>
                        }
                    </span>
                </div>
                <Divider/>                     
                {isContentOpened.find(m => m === item.groupId) && !isEditorOpened.find(m=>m=== item.groupId) ?  <div dangerouslySetInnerHTML={{ __html: item.text }}></div> :""}
                {
                    isEditorOpened.find(e => e === item.groupId)                   
                    ?
                        <WikiContentEditor item={item} id ={wikiSubject?.subjectId}/>
                    : ""
                }
            </div>)}
    </div>
    )
}

export default WikiContent