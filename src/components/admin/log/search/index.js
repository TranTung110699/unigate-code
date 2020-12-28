import React, { Component } from 'react';
import SearchForm from './SearchForm';

class LogSearch extends Component {
  render() {
    return <SearchForm {...this.props} />;
  }
}

export default LogSearch;
