import { SET_SEARCHTERM, SET_SEARCHKEY, SET_ISLOADING, SET_RESULTS, SET_ERROR } from './actionType';
import { DEFAULT_QUERY } from '../constant';

export const searchTermReducer = (state=DEFAULT_QUERY, action) => {
  if (action.type === SET_SEARCHTERM) {
    return action.searchTerm;
  }
  return state;
};

export const searchKeyReducer = (state='', action) => {
  if (action.type === SET_SEARCHKEY) {
    return action.searchKey;
  }
  return state;
};

export const isLoadingReducer = (state=false, action) => {
  if (action.type === SET_ISLOADING) {
    return action.isLoading;
  }
  return state;
};

export const resultsReducer = (state=null, action) => {
  if (action.type === SET_RESULTS) {
    return action.results;  
  }
  return state;
};

export const errorReducer = (state=null, action) => {
  if (action.type === SET_ERROR) {
    return action.error;
  }
  return state;
}
