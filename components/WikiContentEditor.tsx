import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { updateWiki } from '../features/wiki/action';
import { Classification } from './../features/wiki/type';
import { Button } from '@material-ui/core';
import {useTypedSelector} from '../features';
import { updateSuccess, updateExpired } from '../features/notification/notificationSlice';
import Notification from './Notification';

const WikiContentEditor = ({ item, id}:{ item: Classification , id: number }) =>{
    const dispatch = useDispatch();    
        const [value, setValue] = useState(item.text);        
        const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
        const {success, message} = useTypedSelector((state)=> state.updatenotification);            
        const updateContent = ()=> {            
            dispatch(updateWiki({wiki : {wikiId : item.wikiId, classificationId : item.classificationId, text : value }}));            
            dispatch(updateSuccess());                                    
        }             
        const handleClose =(event : any,reason : any)=>{
            if (reason === "clickaway") {
                return;
              }
            dispatch(updateExpired());
        }
        return(
            <React.Fragment key = {item.userId}> 
            <Notification success={success} message={message} handleClose={handleClose}/>
                <ReactQuill                
                    style={{ textAlign: 'left' }}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                />
                <Button onClick={()=> updateContent()}>저장</Button>
            </React.Fragment> 
        )
}

export default WikiContentEditor;