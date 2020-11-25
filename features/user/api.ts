import axios from 'axios';

export const loginAPI = async (email: string, password: string) => {
  const result = await axios.post('백엔드 서버주소', { email, password });
  return result;
};
