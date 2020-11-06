import clsx from 'clsx';
import React, {
  FC,
  ReactComponentElement,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import st from './MainLayout.module.css';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ChatIcon from '@material-ui/icons/Chat';
import PeopleIcon from '@material-ui/icons/People';
import DeleteIcon from '@material-ui/icons/Delete';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { PageLink } from '../components/PageLink';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
// mobx
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
// cookie

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      // flexDirection: "column",
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
  })
);

const MenuItem = ({
  href,
  tag,
  children,
}: {
  href: string;
  tag: string;
  children: ReactElement;
}) => {
  return (
    <PageLink href={href}>
      <ListItem button>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={tag} />
      </ListItem>
    </PageLink>
  );
};

const MainLayout: React.FC<{
  children: ReactComponentElement<any, any>;
}> = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const opened = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline /> {/* Normalize CSS */}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.menuCenterDiv}>
            <Link href="/">
              <a>
                <Typography variant="h5">WINGS WIKI</Typography>
              </a>
            </Link>
          </div>
          <div className={classes.menuRightDiv}>
            <Button
              aria-describedby={id}
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              <AccountCircleIcon htmlColor="white" fontSize="large" />
            </Button>
            <Popover
              id={id}
              open={opened}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Card className={classes.popoverContainer}>
                {/*<div className={classes.popoverHeader}>
            <Avatar className={classes.popoverAvatar} 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTya3yidR9oENvi28M4HZMhUOOObxJFxvQExA&usqp=CAU"/>
            <div className={classes.popoverHeaderText}>
            <Typography>오현재</Typography>   
            <Typography>가톨릭대학교</Typography>
            <Typography>4학년</Typography>             
            </div>
                              </div>*/}
                <CardHeader
                  classes={{
                    title: classes.title,
                  }}
                  avatar={
                    <Avatar
                      aria-label="recipe"
                      className={classes.popoverAvatar}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTya3yidR9oENvi28M4HZMhUOOObxJFxvQExA&usqp=CAU"
                    ></Avatar>
                  }
                  title="오현재"
                  subheader="가톨릭대학교"
                ></CardHeader>
                {/*<Divider classes ={{root : classes.divider}}/>*/}

                <Typography className={classes.popoverTodayState}>
                  오늘은 학교가는 날
                </Typography>
                <CardContent>
                  <Typography className={classes.popoverText}>
                    강의표
                  </Typography>
                  <Divider classes={{ root: classes.listdivider }} />
                  <Typography className={classes.popoverText}>
                    즐겨찾기
                  </Typography>
                  <Divider classes={{ root: classes.listdivider }} />
                </CardContent>
                <CardActions>
                  <PageLink href="mypage">
                    <Button>마이 페이지 이동</Button>
                  </PageLink>
                </CardActions>
              </Card>
            </Popover>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <MenuItem href="posts" tag="과목 보기">
            <AssignmentIcon />
          </MenuItem>
          <MenuItem href="rooms" tag="채팅">
            <ChatIcon />
          </MenuItem>
          <MenuItem href="board" tag="게시판">
            <AssignmentIcon />
          </MenuItem>
          <MenuItem href="addpost" tag="게시글추가(테스트)">
            <AssignmentIcon />
          </MenuItem>
        </List>
        <Divider />
        <List>
          <MenuItem href="trash" tag="쓰레기통">
            <DeleteIcon />
          </MenuItem>
          <MenuItem href="login" tag="로그인">
            <PeopleIcon />
          </MenuItem>
          <MenuItem href="register" tag="회원가입">
            <GroupAddIcon />
          </MenuItem>
        </List>
        <Divider />
        <List>
          <MenuItem href="admin" tag="관리자">
            <SupervisorAccountIcon />
          </MenuItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
