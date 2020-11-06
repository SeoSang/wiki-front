import React from 'react';
import {makeStyles} from '@material-ui/styles'
import {Paper} from '@material-ui/core'

const useStyles = makeStyles(() => ({
    root : {
        width : '100%',
        minHeight : '100vh',
        display :'flex',
        flexDirection : 'column',
        alignItems : 'center',
    },
    indexContainer : {
        width : '100%',
        display :'flex',
        flexDirection : 'column',
        alignItems : 'start',
        paddingLeft : '10%'
    },
    index : {
        width : '33%',
        height : '100%',
        display :'flex',
        flexDirection : 'column',
        alignItems : 'center'
    }
}))

export default function WikiEditor(){
    const classes = useStyles();
    return(
        <Paper className = {classes.root}>
            <h1>Wiki Editor</h1>
            <div className = {classes.indexContainer}>
                <Paper className ={classes.index} variant="outlined" >
                    목차
                    <br></br>
                    <br></br>
                    <br></br><br></br><br></br><br></br><br></br>
                    ddd
                </Paper>
                </div>
        </Paper>

    )
}