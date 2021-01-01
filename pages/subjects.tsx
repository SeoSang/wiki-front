import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SubjectTable from '../components/SubjectTable';
import { useTypedSelector } from '../features';
import { loadSubjects } from '../features/subject/action';
import { meSelector } from '../features/user/userSlice';
import { useDivStyles } from '../styles/cssStyle';

const subjects = () => {
  const dispatch = useDispatch();
  const div = useDivStyles();
  const me = useTypedSelector(meSelector);
  const router = useRouter();
  useEffect(() => {
    if (!me) {
      alert('로그인하고 이용해주세요');
      router.push('/');
    }
  }, [me]);

  useEffect(() => {
    dispatch(loadSubjects({}));
  }, []);

  return (
    <div className={div.centerFlex}>
      <SubjectTable></SubjectTable>
    </div>
  );
};

export default subjects;
