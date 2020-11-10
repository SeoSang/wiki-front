import React, {useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Paper, Button,Divider} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const indexlist = [{
    id : '1',
    title : '큰 목차 1',
    content : '이것은 큰 목차1'
},{
    id : '1.1',
    title : '작은 목차 1',
    content : '이것은 작은 목차1'
},
 {
    id : '2',
    title: '큰 목차 2',
    content : '이것은 큰 목차2'
},
]

const useStyles = makeStyles((props) => ({
    root : {
        minWidth : '100vh',
        minHeight : '100vh',
        display :'flex',
        flexDirection : 'column',  
        paddingLeft : '2%',
    },
    title : {
        fontSize : '50px',
    },
    indexContainer : {
        width : '33vh',
        height : '100%',
        display :'flex',
        paddingLeft : '1%',
        flexDirection : 'column',
        alignItems : 'start',
        paddingBottom : '1%'
    },
    indexList : {
        
    },
    indexTitle : {
        width : '100%',
        fontSize : '18px',
        marginBottom : '4px',
    },
    indexSubTitle : {
        width : '100%',
        paddingLeft : '15px',
        fontSize : '16px',
        marginBottom : '4px',
    },
    contentsContainer : {
        width : '100%',
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'start',
        marginTop : '3%',
    },
    
}))
export default function WikiEditor(){
    const classes = useStyles();
    const [isContentOpened, setIsContentOpened] = useState("");
    const openContent = (id) => {
        //setIsContentOpened(isContentOpened => isContentOpened.concat(id));
        setIsContentOpened(id);
    }

    return(
        <Paper className = {classes.root}>
            <h1 className = {classes.title}>신화와 철학</h1>
            {/* 목차 */}
            <div>
                <Paper className ={classes.indexContainer} variant="outlined" >
                    <h2>목차</h2>
                    <div className={classes.indexList}>
                    {indexlist.map(i => <div className = {i.id.length > 1 ? classes.indexSubTitle : classes.indexTitle} >
                        <span>{i.id}. {i.title}</span>
                    </div>
                    )}
                    </div>
                </Paper>
            </div>

            {/* 컨텐츠 */}
            <div className = {classes.contentsContainer}>
                {indexlist.map(i =><div style={{fontSize:'30px'}} className = {classes.indexTitle} >
                        <span><Button onClick={() => openContent(i.id)}><ExpandMoreIcon/></Button>{i.id}. {i.title} </span>                        
                        <Divider/>                        
                        {isContentOpened === i.id ? <div>{i.content}</div> : ""}
                    </div>)}
            </div>
        </Paper>

    )
}
