import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import { PageLink } from '../components/PageLink';
import { useDispatch } from 'react-redux';
import { doubleCheck } from '../features/user/action';
import { useTypedSelector } from '../features';

type FormValues = {
  name: string;
  nickname: string;
  email: string;
  password: string;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  doubleCheckButton: {
    height: '100%',
    color: 'white',
  },
}));

const FormValidator = (errors: any) => {
  if (errors.name) {
    return '올바른 이름이 아닙니다.';
  }
  if (errors.nickname) {
    return '올바른 닉네임이 아닙니다.';
  }
  if (errors.email) {
    return '올바른 이메일 주소가 아닙니다.';
  }
  if (errors.password) {
    return '올바른 비밀번호가 아닙니다.';
  }
  return '';
};

export default function register() {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    errors,
  } = useForm<FormValues>();
  const [validateText, setValidateText] = useState<string>('');
  const dispatch = useDispatch();
  const { isDoubleCheckOK } = useTypedSelector((state) => state.user);

  const onSubmit = async (data: FormValues) => {
    if (!isDoubleCheckOK) alert('이메일 중복확인을 해주세요!');
    console.log({ data });
    for (const [key, value] of Object.entries(data)) {
      if (value == '') {
        setValidateText(`${key}를 입력해주세요!`);
        alert(validateText);
        return;
      }
    }
    return;
  };

  const onSubmitDoubleCheck = () => {
    const email = getValues('email');
    if (!email) {
      alert('이메일을 제데로 입력하세요!');
      return;
    }
    dispatch(doubleCheck(email));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="univName"
                name="univName"
                variant="outlined"
                required
                fullWidth
                id="univName"
                label="학교"
                autoFocus
                inputRef={register({
                  maxLength: 10,
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="studentNumber"
                label="학번"
                name="studentNumber"
                autoComplete="schoolNumber"
                inputRef={register({
                  maxLength: 20,
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="studentName"
                name="studentName"
                variant="outlined"
                required
                fullWidth
                id="studentName"
                label="이름"
                autoFocus
                inputRef={register({
                  maxLength: 10,
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="nickname"
                label="별명"
                name="nickname"
                autoComplete="nickname"
                inputRef={register({
                  maxLength: 20,
                })}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register({
                  pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                })}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                className={classes.doubleCheckButton}
                fullWidth
                color="primary"
                variant="contained"
                onClick={onSubmitDoubleCheck}
              >
                중복확인
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            회원가입
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <PageLink href="/login">
                <Typography color="primary" variant="body2">
                  이미 가입하셨나요? 로그인
                </Typography>
              </PageLink>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Typography color="error" variant="body1">
              {FormValidator(errors)}
            </Typography>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
