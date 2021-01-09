import { useRouter } from 'next/dist/client/router';
import React from 'react';
import Board from '../components/Board';

export default function freeBoard() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  return <Board categoryId={id ? parseInt(id) : 2} subjectId={null}></Board>;
}

// export async function getStaticProps() {
//   const dispatch = useDispatch();
//   dispatch(loadPosts());
// }
