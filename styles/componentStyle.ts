import { createStyles, makeStyles, Theme } from '@material-ui/core';
export const editorContainerStyles = makeStyles((props) => ({
    root : {
        minWidth : '100vh',
        minHeight : '100vh',
        display :'flex',
        flexDirection : 'column',  
        paddingLeft : '4%',
    },
    titleContainer : {
        display : 'flex',
        justifyContent : 'space-between'
    },    
    title : {
        fontSize : '50px',
    },
    titleButton : {
        marginRight : '100px',
        height : '100%',
        margin : '50px 0px',
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
    indexSubTitle2 : {      
      width : '100%',
      paddingLeft : '25px',
      fontSize : '16px',
      marginBottom : '4px',
    },
    contentsContainer : {
        width : '98%',
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'start',
        marginTop : '3%',
    },
    contentsRow : {
        display : 'flex',
        justifyContent : 'space-between',
    },
    submitButton : {
      margin : '22px 0px',
      height : '100%',
      fontWeight : 'bold',
    },
  }))

export const modalStyles = makeStyles((theme:Theme) => ({
    modalContainer : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    modalContentContainer : {      
        width : '600px',
        height : '400px',
        display: 'flex',
        alignItems: 'center',
        flexDirection : 'column'
    },
    modalContent : {   
        width : '100%',
        height : '60%',
        display: 'flex',        
        flexDirection : 'column' ,
        paddingRight : theme.spacing(4),
        paddingLeft : theme.spacing(4),
        justifyContent : 'space-between',
    },
    modalButton : {
    }
}))