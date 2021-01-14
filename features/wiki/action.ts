import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loadWikiApi, updateWikiApi, checkClassficationApi, addWikiApi
} from './api';
import _ from 'lodash';
import { UpdateWikiFormData, CheckClassificationData, AddWikiFormData } from './type';

const NAME = 'wiki';

export const loadWiki = createAsyncThunk(
    `${NAME}/loadwiki`,
    async ({subjectId} : {subjectId : number}, thunkAPI) => {
        try{            
            return await loadWikiApi(subjectId);
        }
        catch(e){
            return thunkAPI.rejectWithValue(await e.response.data);
        }
    }
);

export const addWiki = createAsyncThunk(
    `${NAME}/addwiki`,
    async ({wiki} : {wiki : AddWikiFormData}, thunkAPI) => {
        try{
            return await addWikiApi(wiki)
        }
        catch(e){
            console.log(e.response.data);
            return thunkAPI.rejectWithValue(await e.response.data);
        }
    }
);

export const updateWiki = createAsyncThunk(
    `${NAME}/updateWiki`,
    async ({wiki}: {wiki : UpdateWikiFormData}, thunkAPI)=>{
        try{
            return await updateWikiApi(wiki)
        }
        catch (e){
            console.log(e)
            return thunkAPI.rejectWithValue(await e.response.data);
        }
    }
)

export const checkClassification = createAsyncThunk(
    `${NAME}/checkClassification`,
    async ({form} : {form : CheckClassificationData}, thunkAPI) => {
        try {
            return await checkClassficationApi(form);
        }
        catch (e) {
            return thunkAPI.rejectWithValue(await e.response.data);
        }
    }
)
