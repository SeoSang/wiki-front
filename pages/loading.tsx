import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(()=>({
    background : {
        position : 'fixed',
        top : '0',
        width : '100vw',
        height : '100vh',
        backgroundColor : 'rgba(1,1,1,0.2)',
        zIndex : 1,
        display :'flex',
        justifyContent : 'center',
        alignItems : 'center',
    }
}))

const loading =() => {
    const st = useStyles();
    return (
        <div className={st.background}>
            <CircularProgress/>
        </div>

    )
}

export default loading;