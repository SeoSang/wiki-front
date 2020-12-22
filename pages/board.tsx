import React from 'react';
import Board from '../components/Board';

export default function freeBoard() {
  return <Board categoryId={2}></Board>;
}

// export async function getStaticProps() {
//   const dispatch = useDispatch();
//   dispatch(loadPosts());
// }
