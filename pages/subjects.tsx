import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SubjectTable from '../components/SubjectTable';
import SubjectAddEditor from './../components/SubjectAddEditor';
import { useTypedSelector } from '../features';
import { loadSubjects } from '../features/subject/action';
import { meSelector } from '../features/user/userSlice';
import { useDivStyles, usePositionStyles } from '../styles/cssStyle';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';



const subjects = () => {
  const dispatch = useDispatch();
  const div = useDivStyles();
  const pos = usePositionStyles();
  const me = useTypedSelector(meSelector);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleModalOpen = ()=>{
    setOpen(true);
  }

  const handleModalClose = ()=>{
    setOpen(false);
  }

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
    <div className={clsx(div.centerFlex, pos.relative )}>
        <Fab onClick={handleModalOpen} className={pos.absolute} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        <SubjectAddEditor open={open} onClose={handleModalClose}></SubjectAddEditor>
      <SubjectTable></SubjectTable>
    </div>
  );
};

export default subjects;
