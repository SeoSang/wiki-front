import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SubjectTable from '../components/SubjectTable';
import { loadSubjects } from '../features/subject/action';
import { useDivStyles } from '../styles/cssStyle';

const subjects = () => {
  const dispatch = useDispatch();
  const div = useDivStyles();

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
