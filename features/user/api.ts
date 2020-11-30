import axios from 'axios';

export const loginAPI = async (email: string, password: string) => {
  const result = await axios.post('백엔드 서버주소', { email, password });
  return result;
};

export const getPostsAPI = async (categoryId : number, page : number, amount : number) => {
  const result = await axios.get(`http://localhost:8080/mywiki/board/list/`, {
    params : {
      categoryId : categoryId,
      page : page,
      amount : amount,
    },
  },
  )    
  return result.data;
}

export const postPostsAPI = async (contents : object) => {  
  const result = await axios.post(`http://localhost:8080/mywiki/board/insert`, {contents})  
  return result;
}