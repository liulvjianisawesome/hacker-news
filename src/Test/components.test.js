import React from 'react';
import ReactDOM from 'react-dom';
import 'isomorphic-fetch';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { searchTermReducer, searchKeyReducer, resultsReducer } from '../Search/reducer'
import thunk from 'redux-thunk';

import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import renderer from 'react-test-renderer';

import Search from '../Search';
import Table from '../Table';

Enzyme.configure({ adapter: new Adapter() });

describe('Search', () => {
  const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  const store = createStoreWithMiddleware(combineReducers({
    searchTerm: searchTermReducer,
    results: resultsReducer,
  }));

  const subject = (
    <Provider store={store}>
      <Search>Search</Search>
    </Provider>
  );

  it('renders without crashing', () => {
    ReactDOM.render(subject, document.createElement('div'));
  });

  it('has a valid snapshot', () => {
    const component = renderer.create(subject);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Table', () => {
  const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

  const list = [
    {
      title: '1',
      author: '1',
      num_comments: 1,
      points: 2,
      objectID: 'x',
    },
    {
      title: '2',
      author: '2',
      num_comments: 1,
      points: 2,
      objectID: 'y',
    },
  ]
  const searchKey = 'test';
  const results = {
    [searchKey]: { hits: list },
  };

  const store = createStoreWithMiddleware(combineReducers({
    searchKey: searchKeyReducer,
    results: resultsReducer,
  }), {
    searchKey: searchKey,
    results: results,
  });

  const subject = (
    <Provider store={store}>
      <Table />
    </Provider>
  );

  it('renders without crashing', () => {
    ReactDOM.render(subject, document.createElement('div'));
  });

  it('has a valid snapshot', () => {
    const component = renderer.create(subject);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows tow items in list', () => {
    const element = mount(subject);

    expect(element.find('.table-row').length).toBe(2);
  })
})