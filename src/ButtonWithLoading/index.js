import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../Search/action';
import withLoading from '../HOC/withLoading';

function LoadMore(props) {
  const { searchKey, results, dispatch } = props;
  let page = (results && results[searchKey] && results[searchKey].page) || 0;

  return (
    <button onClick={() => dispatch(fetchData(searchKey, page + 1))}>More</button>
  );
}

const mapStateToProps = state => {
  return {
    searchKey: state.searchKey,
    results: state.results,
    isloading: state.isloading,
  };
}

export default connect(mapStateToProps, null)(withLoading(LoadMore));

