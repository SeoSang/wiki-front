import { createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import { loadMainNoticesAPI } from './api';

const NAME = 'etc';

export const loadMainNotices = createAsyncThunk(
  `${NAME}/loadMainNotices`, // 액션 이름 정의
  async ({}: {}, thunkAPI) => {
    try {
      const result = await loadMainNoticesAPI();
      console.log(_.pick(result, ['status', 'data', 'statusText']));
      return _.pick(result, ['status', 'data', 'statusText']);
    } catch (e) {
      console.log(e.response.data);
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);
