import axios from 'axios';
import { BACKEND_URL } from '../../dummy/env';

export const getAllReportsAPI = async (page: number, amount: number) => {
  const result = await axios.get(`${BACKEND_URL}/admin/getAllReports`, {
    params: {
      page,
      amount,
    },
    withCredentials: true,
  });
  return result;
};

export const getAllUsersAPI = async (page: number, amount: number) => {
  const result = await axios.get(`${BACKEND_URL}/admin/getAllUsers`, {
    params: {
      page,
      amount,
    },
    withCredentials: true,
  });
  return result;
};

export const approveReportAPI = async (
  reportId: number,
  approve: number,
  page: number,
  amount: number
) => {
  const result = await axios.post(
    `${BACKEND_URL}/admin/approveReport`,
    { reportId, approve },
    {
      params: {
        page,
        amount,
      },
      withCredentials: true,
    }
  );
  return result;
};
