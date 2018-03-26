import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { searchTermReducer, searchKeyReducer, isLoadingReducer, resultsReducer, errorReducer } from './Search/reducer';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())(createStore);

const reducer = combineReducers({
  searchTerm: searchTermReducer,
  searchKey: searchKeyReducer,
  isloading: isLoadingReducer,
  results: resultsReducer,
  error: errorReducer,
});

export default createStoreWithMiddleware(reducer);