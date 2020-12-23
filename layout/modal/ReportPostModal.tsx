import { Backdrop, Fade, Modal } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../features';
import PasswordCheckForm from '../../form/PasswordCheckForm';
import { mainUseStyles } from '../MainLayoutStyle';
import { closeReportPostModal } from '../../features/etc/etcSlice';
import ReportPostForm from '../../form/ReportPostForm';

const ReportPostModal = () => {
  const classes = mainUseStyles();
  const dispatch = useDispatch();

  const { reportPostModalOpen } = useTypedSelector(state => state.etc);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={reportPostModalOpen}
      onClose={() => {
        dispatch(closeReportPostModal());
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={reportPostModalOpen}>
        <ReportPostForm />
      </Fade>
    </Modal>
  );
};

export default ReportPostModal;
