import React, { Component } from 'react';
import { getSearchFormId } from './common';
import CommonSearchSurveyOfAppliedItem from 'components/admin/survey/mainstage/applied-items/common/search-survey-of-applied-items';

class Search extends Component {
  render() {
    const { node } = this.props;
    return (
      <CommonSearchSurveyOfAppliedItem
        formid={getSearchFormId(node)}
        node={node}
      />
    );
  }
}

export default Search;
