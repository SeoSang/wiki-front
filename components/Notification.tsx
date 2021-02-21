import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Notification = ({
  success,
  message,
  handleNotificationClose,
}: {
  success: boolean;
  message: string;
  handleNotificationClose: (event: any, reason: any) => void;
}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={1000}
      open={success}
      onClose={handleNotificationClose}
    >
      <MuiAlert severity="success">{message}</MuiAlert>
    </Snackbar>
  );
};

export default Notification;
