import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useDivStyles, useTypicalStyles } from '../styles/cssStyle';
import ProfileCard from '../components/ProfileCard';
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import IndexSlide from '../components/IndexSlide';
import { useTypedSelector } from '../features';
import { useRouter } from 'next/dist/client/router';
import { meSelector } from '../features/user/userSlice';

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
  searchBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '80%',
    marginBottom: theme.spacing(2),
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchIconButton: {
    padding: 10,
  },
}));

const Column = ({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: React.SetStateAction<any>;
}) => {
  const typ = useTypicalStyles();

  return (
    <Grid className={typ.marginTwo} container>
      <Grid item xs={3}>
        <Typography variant="h5">{label}</Typography>
      </Grid>
      <Grid item xs={7}>
        <TextField
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained">수정</Button>
      </Grid>
    </Grid>
  );
};

export default function MyPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordCheck, setPasswordCheck] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const { passCheckOK } = useTypedSelector((state) => state.user);
  const router = useRouter();
  const me = useTypedSelector(meSelector);

  const typ = useTypicalStyles();
  const div = useDivStyles();

  useEffect(() => {
    if (!passCheckOK) {
      alert('마이페이지 버튼을 통해 비밀번호 인증 후 접근해주세요!');
      router.push('/');
    }
  }, [passCheckOK]);

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
          <Tab label="즐겨찾기 설정" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <div className={div.centerFlex}>
              <ProfileCard
                name={me ? me.studentName : '오류'}
                email={me ? me.email : '오류'}
              ></ProfileCard>
            </div>
          </Grid>
          <Grid className={classes.labelContainer} item xs={12} md={8}>
            <Column label="이름" value={me ? me.studentName : '오류'} />
            <Column label="학교" value={me ? me.univName! : '오류'} />
            <Column label="학번" value={me ? me.studentNumber : '오류'} />
            <Column label="권한" value={me ? me.auth.toString() : '오류'} />
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
                <TextField
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </div>
          <div className={div.startFlex}>
            <Grid className={typ.marginTwo} container>
              <Grid item xs={12} md={3}>
                <Typography variant="h6">비밀번호 확인</Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField
                  type="password"
                  value={passwordCheck}
                  onChange={(e) => {
                    setPasswordCheck(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </div>
          <div className={clsx(div.startFlex, typ.botMarginTwo)}>
            <Grid className={typ.marginTwo} container>
              <Grid item xs={12} md={3}>
                <Typography variant="h6">새로운 비밀번호</Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </div>
          <Button variant="outlined">변경하기</Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className={div.columnFlex}>
          <Paper component="form" className={classes.searchBar}>
            <IconButton className={classes.searchIconButton} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              className={classes.searchInput}
              placeholder="과목을 검색해주세요"
              inputProps={{ 'aria-label': 'search google maps' }}
              name="searchKeyword"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <IconButton
              className={classes.searchIconButton}
              aria-label="search"
              onClick={(e) => {}}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          <IndexSlide deleteable={true}></IndexSlide>
        </div>
      </TabPanel>
    </div>
  );
}
