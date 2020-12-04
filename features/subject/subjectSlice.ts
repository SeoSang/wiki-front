import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { loadSubjects } from './action';
import { SubjectState } from './type';

export const NAME = 'subject';

const initialState: SubjectState = {
  subjects: [],
  subject: null,
  isLoadingSubjects: false,
  loadingSubjectsSuccess: false,
};

export const subjectSlice = createSlice({
  name: NAME,

  // 초기값
  initialState: initialState,

  reducers: {
    resetSubjectState: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    [loadSubjects.pending.type]: (state, action) => {
      // 호출 전
      state.isLoadingSubjects = true;
    },
    [loadSubjects.fulfilled.type]: (state, action) => {
      // 성공
      state.isLoadingSubjects = false;
      state.loadingSubjectsSuccess = true;
      state.subjects = action.payload.data;
      console.log(action.payload);
    },
    [loadSubjects.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      // 실패
      state.isLoadingSubjects = false;
      state.loadingSubjectsSuccess = false;
    },
  },
});

export const { resetSubjectState } = subjectSlice.actions;

export const subjectsSelector = (state: RootState) => state.subject.subjects;
export const subjectSelector = (state: RootState) => state.subject.subject;

/* 
  이런식으로 사용
  const me = useSelector(meSelector);
  const favorites = useSelector(favoritesSelector);
*/

export default subjectSlice.reducer;
