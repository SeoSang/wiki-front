import axios from 'axios';
import { BACKEND_URL } from '../../dummy/env';
import {AddSubjectFormData} from './type'

export const loadSubjectsAPI = async () => {
  const result = await axios.get(`${BACKEND_URL}/api/subject/select`);
  return result;
};

export const searchSubjectsAPI = async (searchName: string) => {
  const result = await axios.get(`${BACKEND_URL}/searchSubject`, {
    params: { searchName },
    withCredentials: true,
  });
  return result;
};

export const addSubjectApi = async (subject : AddSubjectFormData)=>{
  console.log(subject);
  const result = await axios.post(`${BACKEND_URL}/api/subject/addSubject`, subject ,{
    withCredentials : true
  });

  return result;
}