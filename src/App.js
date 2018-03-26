import React, { Component } from 'react';
import './App.css';

import Search from './Search';
import Table from './Table';
import ButtonWithLoading from './ButtonWithLoading';

import fetch from 'isomorphic-fetch';

import { connect } from 'react-redux';

import { DEFAULT_QUERY, DEFAULT_HPP, PATH_BATH, PATH_SEARCH, PARAM_SEARCH, PARAM_PAGE, param_HPP } from './constant';

class App extends Component {
  render() {
    return (
      <div className="page">
        <div className="interactions">
          <Search>
            Search
          </Search>
        </div>

        {
          this.props.error ? <div className="interactions"><p>something went wrong</p></div> : <Table />
        }

        <div className="interactions">
          <ButtonWithLoading />
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    error: state.error,
  };
};

export default connect(mapStateToProps, null)(App);
export { Search, Table };
