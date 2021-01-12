import axios from 'axios';
import { BACKEND_URL } from '../../dummy/env';
import { UpdateWikiFormData, AddWikiFormData, CheckClassificationData } from './type';

export const loadWikiApi = async (subjectId:number)=>{
    const result = await axios.get(`${BACKEND_URL}/wiki/showWiki/`,{
        params : {
            subjectId : subjectId
        }
    })
    console.log(result);
    return result.data;
}

export const updateWikiApi = async (wiki: UpdateWikiFormData) => {
  console.log('wiki  >>>>>> ', wiki);
  const result = await axios.put(`${BACKEND_URL}/wiki/editWiki`, wiki, {
    withCredentials: true,
  });
  return result;
};

export const checkClassficationApi = async (form : CheckClassificationData) => {
  console.log(form);
  const result = await axios.post(`${BACKEND_URL}/wiki/checkClassification`, form, {
    withCredentials: true,
  });
  return result.data;
}

export const addWikiApi = async( wiki : AddWikiFormData ) => {

  const result = await axios.post(`${BACKEND_URL}/wiki/addClassification`, wiki, {
    withCredentials: true,
  })

  return result.data;
}