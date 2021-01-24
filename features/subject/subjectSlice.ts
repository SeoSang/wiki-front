import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { loadSubjects, searchSubjects, addSubject } from './action';
import { SubjectState } from './type';

export const NAME = 'subject';

const initialState: SubjectState = {
  subjects: [],
  subject: null,
  isLoadingSubjects: false,
  isSearchingSubjects: false,
  searchingSubjectsSuccess: false,
  loadingSubjectsSuccess: false,
};

export const subjectSlice = createSlice({
  name: NAME,

  // 초기값
  initialState: initialState,

  reducers: {
    resetSubjectState: state => {
      state = initialState;
    },
  },
  extraReducers: {
    [loadSubjects.pending.type]: (state, action) => {
      state.isLoadingSubjects = true;
    },
    [loadSubjects.fulfilled.type]: (state, action) => {
      state.isLoadingSubjects = false;
      state.loadingSubjectsSuccess = true;
      state.subjects = action.payload.data.subjects;
    },
    [loadSubjects.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      state.isLoadingSubjects = false;
      state.loadingSubjectsSuccess = false;
    },
    [searchSubjects.pending.type]: (state, action) => {
      state.isSearchingSubjects = true;
    },
    [searchSubjects.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isSearchingSubjects = false;
      state.searchingSubjectsSuccess = true;
      if (action.payload.empty) {
        alert('검색 결과가 없습니다!');
        return;
      }
      state.subjects = action.payload.subjectList;
    },
    [searchSubjects.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      state.isSearchingSubjects = false;
      state.searchingSubjectsSuccess = false;
      alert('서버 오류가 발생하였습니다!');
    },
    [addSubject.fulfilled.type] : (
      state, action
    ) =>{
      state.isAddedSubjects = true;
    }
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
