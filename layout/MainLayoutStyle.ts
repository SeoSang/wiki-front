import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const drawerWidth = 240;

export const mainUseStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },

    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    menuRightContent: {
      padding: theme.spacing(0, 1),
    },
    menuCenterDiv: {
      flex: 1,
      textAlign: 'center',
    },
    menuRightDiv: {
      display: 'flex',
      marginLeft: 'auto',
    },
    popoverContainer: {
      width: '200px',
      height: '290px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    popoverHeader: {
      display: 'flex',
      margin: '15px 0px',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: '2px solid black',
    },
    popoverHeaderText: {
      display: 'flex',
      flexDirection: 'column',
    },
    popoverAvatar: {
      width: 60,
      height: 60,
      '&:hover': {
        opacity: 0.5,
      },
    },
    popoverTodayState: {
      fontSize: '20px',
      color: 'black',
    },
    popoverText: {
      fontSize: '20px',
      color: 'black',
      transition: 'all .3s ease-in-out',
      '&:hover': {
        color: '#FF913B',
      },
    },
    title: {
      fontSize: 20,
      backgroundColor: '#000000',
      color: 'white',
      width: '75%',
      marginBottom: '5px',
    },
    divider: {
      width: '160px',
      height: '.5px',
      backgroundColor: '#000000',
    },
    listdivider: {
      width: '160px',
      height: '.5px',
      backgroundColor: '#000000',
      margin: '5px 0px',
    },
    listAnimation: {
      color: '#FF913B',
      '&:hover': {
        color: '#FF913B',
      },
    },
    cardButton: {
      fontSize: '0.7em',
      color: 'white',
      fontWeight: 'lighter',
      backgroundColor: theme.palette.primary.light,
    },
    modal: {
      position: 'absolute',
      display: 'flex',
      top: '50px',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);
