import clsx from 'clsx';
import React, { FC, ReactComponentElement, ReactElement } from 'react';
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
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Avatar from '@material-ui/core/Avatar';
// mobx
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { useDispatch } from 'react-redux';
import { logout } from '../features/user/action';
import MainProfileCard from '../components/MainProfileCard';
import LoginNeededCard from '../components/LoginNeededCard';
import { useTypedSelector } from '../features';
import { meSelector } from '../features/user/userSclice';
// cookie

const drawerWidth = 240;

export const mainUseStyles = makeStyles((theme: Theme) =>
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
    cardButton: {
      fontSize: '0.7em',
      color: 'white',
      fontWeight: 'lighter',
      backgroundColor: theme.palette.primary.light,
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
  const classes = mainUseStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const me = useTypedSelector(meSelector);

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
              {me ? (
                <AccountCircleIcon htmlColor="white" fontSize="large" />
              ) : (
                <HelpOutlineIcon htmlColor="white" fontSize="large" />
              )}
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
              {me ? <MainProfileCard /> : <LoginNeededCard />}
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
          <MenuItem href="post" tag="게시글확인">
            <AssignmentIcon />
          </MenuItem>
          <MenuItem href="addpost" tag="게시글추가">
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
          <MenuItem href="wikieditor" tag="위키 에디터">
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
