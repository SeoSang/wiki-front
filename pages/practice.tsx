import React from 'react'

interface Pobject{
    a:number,
    b:number
}

const Practice = () => {
    const message:string ="this is string"
    const object:Pobject ={a:1, b:2};
    return(
        <div>
            {message}
            {object.a}
        </div>
    )
}

export default Practice;