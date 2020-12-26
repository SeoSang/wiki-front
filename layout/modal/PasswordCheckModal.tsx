import { Backdrop, Fade, Modal } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../features';
import { closePwCheckModal } from '../../features/etc/etcSlice';
import PasswordCheckForm from '../../form/PasswordCheckForm';
import { mainUseStyles } from '../MainLayoutStyle';

const PasswordCheckModal = () => {
  const classes = mainUseStyles();
  const dispatch = useDispatch();

  const { pwCheckModalOpen } = useTypedSelector(state => state.etc);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={pwCheckModalOpen}
      onClose={() => {
        dispatch(closePwCheckModal());
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={pwCheckModalOpen}>
        <PasswordCheckForm />
      </Fade>
    </Modal>
  );
};

export default PasswordCheckModal;
