import React from 'react';
import { Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Notification =({success, message, handleClose} : {success : boolean, message : string, handleClose : (event : any, reason : any)=> void })=>{
    return(
        <Snackbar 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    autoHideDuration={3000}
                    open={success}
                    onClose={handleClose}
                    >
                        <MuiAlert severity="success">{message}</MuiAlert>
                    </Snackbar>
    )
}

export default Notification;