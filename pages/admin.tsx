import React, { useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useMarginStyles } from '../styles/cssStyle';
import { VolumeUp } from '@material-ui/icons';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Board from '../components/Board';
import UserBoard from '../components/UserBoard';
import ReportBoard from '../components/ReportBoard';
import { useTypedSelector } from '../features';
import { meSelector } from '../features/user/userSlice';
import { useRouter } from 'next/dist/client/router';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  admin: {
    backgroundColor: theme.palette.background.paper,
    width: '80%',
  },
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

export default function admin() {
  const classes = useStyles();
  const mar = useMarginStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const me = useTypedSelector(meSelector);
  const router = useRouter();

  useEffect(() => {
    if (!me || me?.auth != 1) {
      alert('권한이 없습니다!');
      router.push('/');
    }
  }, [me]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <Typography className={mar.marBottom2} variant="h4">
        {' '}
        관리자 페이지
      </Typography>
      <div className={classes.admin}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="공지사항" icon={<VolumeUp />} {...a11yProps(0)} />
            <Tab
              label="유저조회"
              icon={<AccessibilityIcon />}
              {...a11yProps(1)}
            />
            <Tab label="신고현황" icon={<AssignmentIcon />} {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Board categoryId={3} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <UserBoard />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <ReportBoard />
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
}
