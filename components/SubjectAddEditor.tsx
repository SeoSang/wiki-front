import React from 'react';
import { Modal,TextField, Button , Paper } from '@material-ui/core';
import { modalStyles } from './../styles/componentStyle';
import { useForm } from 'react-hook-form';
import { AddSubjectFormData } from '../features/subject/type'
import { addSubject } from '../features/subject/action';
import { useDispatch } from 'react-redux';

const SubjectAddEditor = ({open, onClose} : {
    open : boolean;
    onClose : ()=>void;
})=>{
    const { register, handleSubmit} = useForm<AddSubjectFormData>();
    const dispatch = useDispatch();
    const st = modalStyles();
    const onSubmit = (data : AddSubjectFormData)=>{
        dispatch(addSubject({subject : data}));
        onClose();
    }
    return(
            <Modal 
            className={st.modalContainer}
            open={open} 
            onClose={onClose}>
                <Paper className={st.modalContentContainer}>
                    <h1>새로운 과목을 추가</h1>
                    <form className={st.modalContent} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                        label="과목명"
                        name="subjectName"
                        id="subjectname"
                        fullWidth
                        autoFocus
                        required
                        inputRef={register}
                        variant="outlined"></TextField>
                        <TextField
                        label="교수"
                        name="professor"
                        id="professor"
                        fullWidth
                        autoFocus
                        required
                        inputRef={register}
                        variant="outlined"></TextField>
                        <TextField
                        label="연도"
                        name="year"
                        id="year"
                        fullWidth
                        autoFocus
                        required
                        inputRef={register}
                        variant="outlined"></TextField>
                        <TextField
                        label="학기"
                        name="semester"
                        id="semester"
                        fullWidth
                        autoFocus
                        required
                        inputRef={register}
                        variant="outlined"></TextField>  
                        <Button
                          className={st.modalButton}
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

export default SubjectAddEditor;