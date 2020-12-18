import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loadWikiApi, updateWikiApi
} from './api';
import _ from 'lodash';
import { UpdateWikiFormData } from './type';

const NAME = 'wiki';

export const loadWiki = createAsyncThunk(
    `${NAME}/loadwiki`,
    async ({subjectId} : {subjectId : number}, thunkAPI) => {
        try{
            return await loadWikiApi(subjectId)
        }
        catch(e){
            console.log(e)
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