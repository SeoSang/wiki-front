import { createSlice } from '@reduxjs/toolkit';
import { loadWiki, addWiki, updateWiki, checkClassification } from './action';
import { WikiState } from './type';

const NAME = 'wiki';

const initialState: WikiState = {
  classification: [],
  wiki: null,
  isLoadingWiki: false,
  isWikiExist: false,
  updatingWikiSuccess: false,
  wikiSubject: null,
  isAble: -1,
};

export const wikiSlice = createSlice({
  name: NAME,
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [loadWiki.pending.type]: (state, action) => {
      state.isLoadingWiki = true;
      state.classification = null;
      state.isWikiExist = true;
    },
    [loadWiki.fulfilled.type]: (state, action) => {
      state.isLoadingWiki = false;
      state.isWikiExist = true;
      state.wiki = action.payload.wikiVO;
      state.classification = action.payload.classificationList;
      state.wikiSubject = action.payload.subjectVO;
    },
    [loadWiki.rejected.type]: (state, acion) => {
      state.isWikiExist = false;
      state.isLoadingWiki = false;
    },
    [addWiki.fulfilled.type]: (state, action) => {
      state.isLoadingWiki = false;
      state.classification = action.payload.classificationList;
    },
    [addWiki.rejected.type]: (state, acion) => {
      state.isLoadingWiki = false;
      alert('오류 발생! 오류발생!!');
    },
    [updateWiki.pending.type]: (state, action) => {
      state.updatingWikiSuccess = false;
    },
    [updateWiki.fulfilled.type]: (state, action) => {
      state.updatingWikiSuccess = true;
      state.wiki = action.payload.data.wikiVO;
      state.classification = action.payload.data.classificationList;
    },
    [updateWiki.rejected.type]: (state, action) => {
      state.updatingWikiSuccess = false;
      alert('오류 발생! 오류발생!!');
    },
    [checkClassification.fulfilled.type]: (state, action) => {
      state.isAble = action.payload.isAble;
    },
  },
});

export default wikiSlice.reducer;
