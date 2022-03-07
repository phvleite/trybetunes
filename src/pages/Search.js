import React, { Component } from 'react';
import Header from '../component/Header';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <h2>Search</h2>
      </div>
    );
  }
}

export default Search;
