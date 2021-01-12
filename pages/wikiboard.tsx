import React, { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import Board from './../components/Board';

const wikiboard = ()=>{
    const router = useRouter();
    const subjectId = router.asPath.slice(21,22);
    const subjectName = router?.query.subjectName;
    
    
    return(
        <Board categoryId={1} subjectId={parseInt(subjectId)} subjectName={subjectName}/>
    )
}

export default wikiboard;
