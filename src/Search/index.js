import React from 'react';
import PropTypes from 'prop-types';

import { setSearchTerm, setSearchKey, fetchData } from './action';
import { connect } from 'react-redux';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSearchChange(event) {
    this.props.dispatch(setSearchTerm(event.target.value));
  }

  onSubmit(event) {
    const { searchTerm, results } = this.props;
    this.props.dispatch(setSearchKey(searchTerm));

    if (!results[searchTerm]) {
      this.props.dispatch(fetchData(searchTerm))
    }

    event.preventDefault();
  }

  componentDidMount() {
    const { searchTerm } = this.props;
    this.props.dispatch(setSearchKey(searchTerm));
    this.props.dispatch(fetchData(searchTerm));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">
          {this.props.children}
        </button>
        <input type="text" onChange={this.onSearchChange} value={this.props.searchTerm} />
      </form>
    );
  }
}

Search.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
    results: state.results,
  };
}

export default connect(mapStateToProps, null)(Search);