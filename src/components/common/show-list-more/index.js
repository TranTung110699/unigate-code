import React, { Component } from 'react';
import Html from '../html';
import ShowMore from '../html/ShowMoreCategories';

class ShowListMore extends Component {
  showList = (list) => {
    if (Array.isArray(list))
      return list.map((category) => (
        <Html content={category.name} key={category.id} />
      ));
    return null;
  };
  showListMore = (list) => {
    if (Array.isArray(list)) {
      if (list.length <= 2) {
        return this.showList(list);
      }
      return <ShowMore items={list} />;
    }
    return null;
  };
  render() {
    const { list } = this.props;
    return <div>{this.showListMore(list)}</div>;
  }
}

export default ShowListMore;
