import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import Paper from '@material-ui/core/Paper';
import { Modal, Backdrop, TextField, Button,Grid} from '@material-ui/core';
import { modalStyles } from './../styles/componentStyle';
import {
  AddWikiFormData,
  CheckClassificationData,
} from '../features/wiki/type';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addWiki, checkClassification } from './../features/wiki/action';
import { useTypedSelector } from '../features';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const WikiAddEditor = ({
  wikiId,
  open,
  handleModalClose,
}: {
  wikiId?: number;
  open: boolean;
  handleModalClose: () => void;
}) => {
  const dispatch = useDispatch();
  const st = modalStyles();
  const { isAble } = useTypedSelector(state => state.wiki);
  const { me } = useTypedSelector(state => state.user);  
  const { register, handleSubmit, errors } = useForm<AddWikiFormData>();
  const [wikiData, setWikiData] = useState<AddWikiFormData>();
  const [groupId, setGroupId] = useState<string>('');
  const [content, setContent] = useState('');
  const [isChecked, setIsChecked] = useState<boolean>(false);  

  const onSubmit = (data: AddWikiFormData) => {
    data.wikiId = wikiId;
    data.userId = me?.userId!;
    data.groupId = groupId;
    data.text = content;
    dispatch(addWiki({ wiki: data }));
    handleModalClose();
  };

  const onCheck = () => {
    setIsChecked(true);
    dispatch(
      checkClassification({
        form: {
          wikiId: wikiId,
          groupId: groupId,
        },
      })
    );
  };
  const ReactQuill =
    typeof window === 'object' ? require('react-quill') : () => false;
  useEffect(() => {
    setContent('내용');
  }, []);

  return (
    <div>
    <Modal
      className={st.modalContainer}
      open={open}
      onClose={()=> {
        setIsChecked(false);
        handleModalClose()
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      {/*<Paper className={st.modalContentContainer}>*/}
      <Paper className={st.modalContentContainer}>
        <h1>새로운 목차를 추가</h1>
        <form className={st.modalContent} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
              <Grid item xs = {6}>
          <TextField
            label="목차"
            onChange={e => {
              setGroupId(e.target.value);
            }}
            autoFocus
            required
            fullWidth
            inputRef={register}
            variant="outlined"
            InputProps={{
              endAdornment:
                isChecked ? (
                  isAble == 1 ? (
                    <CheckIcon style={{ color: 'green' }} />
                  ) : (
                    <CloseIcon style={{ color: 'red' }} />
                  )
                ) : (
                  ''
                ),
            }}
          />
          </Grid>
          <Grid style={{display: 'flex', alignItems : 'center'}} item xs ={6}>
          <Button onClick={onCheck}> 체크 </Button>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
          <ReactQuill
            style={{height : '170px'}}
            value={content}
            onChange={(e: string) => {
              setContent(e);
            }}
            fullWidth            
            theme="snow"
          />
          </Grid>
          <Grid item xs={12}>
          <Button
            className={st.modalButton}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            등록
          </Button>
          </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
    </div>
  );
};

export default WikiAddEditor;
