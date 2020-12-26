import axios from 'axios';
import { BACKEND_URL } from '../../dummy/env';
import { UpdateWikiFormData } from './type';

export const loadWikiApi = async (subjectId:number)=>{
    const result = await axios.get(`${BACKEND_URL}/wiki/showWiki/`,{
        params : {
            subjectId : subjectId
        }
    })
    console.log(result);
    return result;
}

export const updateWikiApi = async (wiki: UpdateWikiFormData) => {
  console.log('wiki  >>>>>> ', wiki);
  const result = await axios.put(`${BACKEND_URL}/wiki/editWiki`, wiki, {
    withCredentials: true,
  });
  return result;
};
