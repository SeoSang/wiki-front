import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useDivStyles, useTypicalStyles } from '../styles/cssStyle';
import ProfileCard from '../components/ProfileCard';
import { Button, Divider, Grid, Input, TextField } from '@material-ui/core';
import clsx from 'clsx';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  column: {
    height: '100%',
  },
  labelContainer: {
    height: '100%',
  },
  caption: {
    margin: theme.spacing(1),
    opacity: 0.7,
  },
}));

const Column = ({ label, value }: { label: string; value: string }) => {
  const typ = useTypicalStyles();

  return (
    <Grid className={typ.marginTwo} container>
      <Grid item xs={3}>
        <Typography variant="h5">{label}</Typography>
      </Grid>
      <Grid item xs={7}>
        <TextField value={value} />
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained">수정</Button>
      </Grid>
    </Grid>
  );
};

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const typ = useTypicalStyles();
  const div = useDivStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="개인 정보 설정" {...a11yProps(0)} />
          <Tab label="보안 설정" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <div className={div.centerFlex}>
              <ProfileCard name="이름" email="ddrrpg@naver.com"></ProfileCard>
            </div>
          </Grid>
          <Grid className={classes.labelContainer} item xs={12} md={8}>
            <Column label="닉네임" value="닉네임입니다." />
            <Column label="학교" value="학교입니다." />
            <Column label="학번" value="학번입니다." />
            <Column label="권한" value="권한입니다." />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={div.columnFlex}>
          <Typography variant="h4"> 비밀번호</Typography>
          <Typography className={classes.caption} variant="caption">
            *http방식을 사용해 보안의 위험이 있으니 비밀번호는 임시 비밀번호를
            사용 바랍니다.
          </Typography>
          <Divider></Divider> <br />
          <div className={div.startFlex}>
            <Grid className={typ.marginTwo} container>
              <Grid item xs={12} md={3}>
                <Typography variant="h6">현재 비밀번호</Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField />
              </Grid>
            </Grid>
          </div>
          <div className={clsx(div.startFlex, typ.botMarginTwo)}>
            <Grid className={typ.marginTwo} container>
              <Grid item xs={12} md={3}>
                <Typography variant="h6">새로운 비밀번호</Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField />
              </Grid>
            </Grid>
          </div>
          <Button variant="outlined">변경하기</Button>
        </div>
      </TabPanel>
    </div>
  );
}
