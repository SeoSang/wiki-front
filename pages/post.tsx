import {
  createStyles,
  Divider,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useDivStyles, useTypicalStyles } from '../styles/cssStyle';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const DUMMY_POST = `
  <ul>
    <li>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa.
    </li>
    <li>
      Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
      ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
      quis, sem.
    </li>
    <li>
      Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
      nec, vulputate eget, arcu.
    </li>
    <li>
      In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
      dictum felis eu pede mollis pretium. Integer tincidunt.
    </li>
  </ul>
  `;

const post = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [error, setError] = useState(false);
  const div = useDivStyles();
  const typ = useTypicalStyles();
  const ReactQuill =
    typeof window === 'object' ? require('react-quill') : () => false;

  useEffect(() => {}, [id]);

  const text = useMemo(() => {
    try {
    } catch (e) {}
  }, []);
  if (error) return <div>에러가 발생하였습니다 ㅠ</div>;

  return (
    <div className={div.coloumCenterFlex}>
      <div className={div.startFlex}>
        <Typography variant="h6">~~~~~ 님의 글</Typography>
      </div>
      <Typography variant="h5">더미 제목입니다</Typography>
      <Divider style={{ alignSelf: 'stretch' }} variant="middle" />

      <div dangerouslySetInnerHTML={{ __html: DUMMY_POST }}></div>
      <div className={div.startFlex}>
        <Typography variant="h6">댓글</Typography>
      </div>
      <Divider style={{ alignSelf: 'stretch' }} variant="middle" />
      <Divider variant="middle" />
    </div>
  );
};

export default post;
