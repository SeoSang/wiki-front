import React from 'react';
import { useRouter } from 'next/dist/client/router';
import Board from './../components/Board';

const wikiboard = ()=>{
    const router = useRouter();
    const subjectId = router.asPath.slice(21,22);
    console.log(router)
    return(
        <Board categoryId={1} subjectId={parseInt(subjectId)} />
    )
}

export default wikiboard;
