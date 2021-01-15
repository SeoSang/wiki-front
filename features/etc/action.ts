import { createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import { loadMainNoticesAPI } from './api';

const NAME = 'etc';

export const loadMainNotices = createAsyncThunk(
  `${NAME}/loadMainNotices`, // 액션 이름 정의
  async ({}: {}, thunkAPI) => {
    try {
      const result = await loadMainNoticesAPI();
      return _.pick(result, ['status', 'data', 'statusText']);
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);
