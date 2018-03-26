import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { setResults } from '../Search/action';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
}

const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
  const sortClass = classNames(
    'button-inline',
    { 'button-active': sortKey === activeSortKey }
  )

  return (
    <button
      className={sortClass}
      onClick={() => onSort(sortKey)}>
      {children}
    </button>
  )
}

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    };

    this.onSort = this.onSort.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse = sortKey === this.state.sortKey && !this.state.isSortReverse;

    this.setState({
      sortKey,
      isSortReverse,
    });
  }

  onDismiss(id) {
    const { results, searchKey } = this.props;
    const { hits, page } = results[searchKey];

    const updatedHits = hits.filter(item => item.objectID !== id);

    const lastResults = {
      ...results,
      [searchKey]: { hits: updatedHits, page },
    };

    this.props.dispatch(setResults(lastResults));
  }

  render() {
    const { list } = this.props;
    const { sortKey, isSortReverse } = this.state;
    const onSort = this.onSort;

    const finalList = isSortReverse ? SORTS[sortKey](list).reverse() : SORTS[sortKey](list);

    return (
      <div className="table">
        <div className="table-header">
          <span style={{ width: '40%' }}>
            <Sort
              sortKey={'TITLE'}
              onSort={onSort}
              activeSortKey={sortKey}
            >
              Title
            </Sort>
          </span>
          <span style={{ width: '30%' }}>
            <Sort
              sortKey={'AUTHOR'}
              onSort={onSort}
              activeSortKey={sortKey}
            >
              Author
            </Sort>
          </span>
          <span style={{ width: '10%' }}>
            <Sort
              sortKey={'COMMENTS'}
              onSort={onSort}
              activeSortKey={sortKey}
            >
              Comments
            </Sort>
          </span>
          <span style={{ width: '10%' }}>
            <Sort
              sortKey={'POINTS'}
              onSort={onSort}
              activeSortKey={sortKey}
            >
              Points
            </Sort>
          </span>
          <span style={{ width: '10%' }}>
          </span>
        </div>
        {
          finalList
            .map((item) => {
              return (
                <div key={item.objectID} className="table-row">
                  <span style={{ width: '40%' }}>
                    <a href={item.url}>{item.title}</a>
                  </span>
                  <span style={{ width: '30%' }}>{item.author}</span>
                  <span style={{ width: '10%' }}>{item.num_comments}</span>
                  <span style={{ width: '10%' }}>{item.points}</span>
                  <span style={{ width: '10%' }}>
                    <button className="button-inline" onClick={() => this.onDismiss(item.objectID)}>Dismiss</button>
                  </span>
                </div>
              );
            })
        }
      </div>
    )
  }
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired,
}

const mapStateToProps = (state) => {
  return {
    results: state.results,
    searchKey: state.searchKey,
    list: (state.results && state.results[state.searchKey] && state.results[state.searchKey].hits) || [],
  }
}

export default connect(mapStateToProps, null)(Table);