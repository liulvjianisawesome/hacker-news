import { SET_SEARCHTERM, SET_SEARCHKEY, SET_ISLOADING, SET_RESULTS, SET_ERROR } from './actionType';
import { DEFAULT_QUERY, DEFAULT_HPP, PATH_BATH, PATH_SEARCH, PARAM_SEARCH, PARAM_PAGE, param_HPP } from '../constant';

export const setSearchTerm = searchTerm => ({
  type: SET_SEARCHTERM,
  searchTerm: searchTerm,
});

export const setSearchKey = searchKey => ({
  type: SET_SEARCHKEY,
  searchKey: searchKey,
});

export const setIsLoading = isLoading => ({
  type: SET_ISLOADING,
  isLoading: isLoading,
});

export const setResults = results => ({
  type: SET_RESULTS,
  results: results,
});

export const setError = error => ({
  type: SET_ERROR,
  error: error,
});

export function fetchData(searchTerm = '', page = 0) {
  return (dispatch, getState) => {
    dispatch(setIsLoading(true));

    return fetch(`${PATH_BATH}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${param_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => {
        const { hits, page } = result;
        const { searchKey, results } = getState();

        const oldHits = (results && results[searchKey])
          ? results[searchKey].hits
          : [];

        const updatedHits = [
          ...oldHits,
          ...hits
        ];

        const lastResults = {
          ...results,
          [searchKey]: { hits: updatedHits, page },
        };
        dispatch(setResults(lastResults));

        dispatch(setIsLoading(false));
      })
      .catch(err => {
        dispatch(setError(err));
      })
  }
}