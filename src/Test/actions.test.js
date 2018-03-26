import { setSearchTerm, setSearchKey, setIsLoading, setResults, setError, fetchData } from '../Search/action';
import { SET_SEARCHTERM, SET_SEARCHKEY, SET_ISLOADING, SET_RESULTS, SET_ERROR } from '../Search/actionType';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
const middlewares = [thunk];
const createMockStore = configureStore(middlewares);

import { stub } from 'sinon';
import 'isomorphic-fetch';

describe('actions', () => {
  describe('setSearchTerm', () => {
    it('should create an action to setSearchTerm', () => {
      const text = 'test';
      const action = setSearchTerm(text);

      expect(action.type).toBe(SET_SEARCHTERM);
      expect(action.searchTerm).toBe(text);
    });
  });

  describe('setSearchKey', () => {
    it('should create an action to setSearchKey', () => {
      const text = 'test';
      const action = setSearchKey(text);

      expect(action.type).toBe(SET_SEARCHKEY);
      expect(action.searchKey).toBe(text);
    });
  });

  describe('setIsLoading', () => {
    it('should create an action to setIsLoading', () => {
      const text = 'test';
      const action = setIsLoading(text);

      expect(action.type).toBe(SET_ISLOADING);
      expect(action.isLoading).toBe(text);
    });
  });

  describe('setResults', () => {
    it('should create an action to setResults', () => {
      const text = 'test';
      const action = setResults(text);

      expect(action.type).toBe(SET_RESULTS);
      expect(action.results).toBe(text);
    });
  });

  describe('setError', () => {
    it('should create an action to setError', () => {
      const text = 'test';
      const action = setError(text);

      expect(action.type).toBe(SET_ERROR);
      expect(action.error).toBe(text);
    });
  });

  describe('fetchData', () => {
    let stubbedFetch;

    beforeEach(() => {
      stubbedFetch = stub(global, 'fetch');
    });

    afterEach(() => {
      stubbedFetch.restore();
    });

    it('fetchData test', () => {
      const mockResponse = {
        page: 0,
        hits: [
          {
            author: 'llj',
            num_comments: 12,
            objectID: 0,
            points: 20,
            title: 'hahaha'
          },
          {
            author: 'ja',
            num_comments: 21,
            objectID: 1,
            points: 30,
            title: 'baba'
          }
        ]
      };

      stubbedFetch.returns(Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      }));

      const store = createMockStore();
  
      return store.dispatch(fetchData()).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions.length).toBe(3);
        expect(dispatchedActions[0].type).toBe(SET_ISLOADING);
        expect(dispatchedActions[1].type).toBe(SET_RESULTS);
        expect(dispatchedActions[2].type).toBe(SET_ISLOADING);
      });
    })
  })
});
