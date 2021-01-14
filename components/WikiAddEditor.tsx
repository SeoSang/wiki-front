import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import Paper from '@material-ui/core/Paper';
import { Modal, Backdrop, TextField, Button } from '@material-ui/core';
import { modalStyles } from './../styles/componentStyle';
import { AddWikiFormData, CheckClassificationData } from '../features/wiki/type';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addWiki, checkClassification } from './../features/wiki/action';
import { useTypedSelector } from '../features';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const WikiAddEditor =({wikiId, open, handleModalClose} : {wikiId? : number, open : boolean, handleModalClose : ()=>void}) => {
    const dispatch = useDispatch();
    const { isAble } = useTypedSelector((state)=> state.wiki);
    const { me } = useTypedSelector((state)=> state.user);
    const st = modalStyles();
    const { register, handleSubmit, errors } = useForm<AddWikiFormData>();
    const [wikiData, setWikiData] = useState<AddWikiFormData>();
    const [groupId, setGroupId] = useState<string>('');
    const onSubmit = (data:AddWikiFormData)=>{
         data.wikiId = wikiId;
         data.userId = me?.userId;
         data.groupId = groupId;
         data.text = content;   
         dispatch(addWiki({wiki : data}));
         handleModalClose();
    }

    const onCheck = () => {
        dispatch(checkClassification({form : {
            wikiId : wikiId,
            groupId : groupId
        }}))
    }
    const [content, setContent] = useState('');
    const ReactQuill =
    typeof window === 'object' ? require('react-quill') : () => false;
    useEffect(()=>{
        setContent('내용');
    },[])   
    
    return(
        <Modal
            className={st.modalContainer}        
            open={open}
            onClose={handleModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
        >
            <Paper className = {st.modalContentContainer}>
                <h1>새로운 목차를 추가</h1>
                    <form className = {st.modalContent} onSubmit={handleSubmit(onSubmit)}>
                        <TextField 
                            label="목차" 
                            onChange={(e) => {setGroupId(e.target.value)}}                            
                            autoFocus
                            required
                            fullWidth
                            inputRef={register}
                            variant="outlined"
                            InputProps = {{                                
                                endAdornment : isAble >= 0 ? ( isAble == 1 ? <CheckIcon style={{color : 'green'}}/> : <CloseIcon style={{color:'red'}}/>) : "" 
                            }}
                        />
                        <Button onClick={onCheck}> 체크 </Button>
                            <TextField 
                            label="제목" 
                            name="title"  
                            id="title"
                            fullWidth
                            autoFocus
                            required
                            inputRef={register}
                            variant="outlined"
                        />
                            <ReactQuill
                                value = {content}
                                onChange = {(e: string)=> {
                                    setContent(e);
                                }}      
                                
                            fullWidth                          
                                theme="snow"
                            />
                            <Button
                               className ={st.modalButton}
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"                             
                            >
                                등록
                            </Button>
                    </form>
            </Paper>
        </Modal>
    )
}

export default WikiAddEditor