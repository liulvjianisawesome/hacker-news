import * as reducers from '../Search/reducer';
import * as actions from '../Search/action';

describe('reducers', () => {
  describe('searchTermReducer', () => {
    it('should return searchTerm state', () => {
      const text = 'llj';
      const action = actions.setSearchTerm(text);
      const newState = reducers.searchTermReducer({}, action);
      expect(newState).toBe(text);
    });
  });

  describe('searchTermKey', () => {
    it('should return searchKey state', () => {
      const text = 'llj';
      const action = actions.setSearchKey(text);
      const newState = reducers.searchKeyReducer({}, action);
      expect(newState).toBe(text);
    });
  });

  describe('isLoading', () => {
    it('should return isLoading state', () => {
      const isLoading = false;
      const action = actions.setIsLoading(isLoading);
      const newState = reducers.isLoadingReducer({}, action);
      expect(newState).toBe(isLoading);
    });
  });

  describe('results', () => {
    it('should return results state', () => {
      const text = 'llj';
      const action = actions.setResults(text);
      const newState = reducers.resultsReducer({}, action);
      expect(newState).toBe(text);
    });
  });

  describe('error', () => {
    it('should return error state', () => {
      const text = 'llj';
      const action = actions.setError(text);
      const newState = reducers.errorReducer({}, action);
      expect(newState).toBe(text);
    });
  });

});