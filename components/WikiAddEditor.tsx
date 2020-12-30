import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Modal, Backdrop, TextField, Button } from '@material-ui/core';
import { modalStyles } from './../styles/componentStyle';
import { AddWikiFormData } from '../features/wiki/type';
import { useForm } from 'react-hook-form';

const WikiAddEditor =({open, handleModalClose} : {open : boolean, handleModalClose : ()=>void}) => {
    const st = modalStyles();
    const { register, handleSubmit, errors } = useForm<AddWikiFormData>();
    const [wikiData, setWikiData] = useState<AddWikiFormData>();
    const onSubmit = (data:AddWikiFormData)=>{
        alert('성공');
    }
    const AddWikiFormValidator = (errors: any) => {
        if (errors.title) {
          return 'ㅇㅇㅇㅇ';
        }
        if (errors.text) {
          return '22';
        }
        return '';
      };
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
                <div className = {st.modalContent}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField 
                            label="목차" 
                            name="index"  
                            id="index"
                            autoFocus
                            required
                            inputRef={register}
                            variant="outlined"/>
                            <TextField 
                            label="제목" 
                            name="title"  
                            id="title"
                            autoFocus
                            inputRef={register}
                            variant="outlined"/>
                            <TextField 
                            label="내용" 
                            name="content"  
                            id="content"
                            autoFocus
                            inputRef={register}
                            variant="outlined"/>
                            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
              등록
          </Button>
                    </form>
                </div>
                {AddWikiFormValidator(errors)}
            </Paper>
        </Modal>
    )
}

export default WikiAddEditor