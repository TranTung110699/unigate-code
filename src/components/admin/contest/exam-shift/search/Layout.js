import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import PropTypes from 'prop-types';
import Results from './Results';
import schema from './schema-form';
import contestApiUrls from '../../endpoints';

class ExamShiftSearch extends Component {
  renderResultComponent = (items, props) => (
    <Results
      items={items}
      {...props}
      node={this.props.node}
      contest={this.props.contest}
      contestIid={this.props.contestIid}
    />
  );

  render() {
    const { contestIid } = this.props;

    let hiddenFields = {
      _sand_step: '',
      contest_iid: contestIid,
    };

    return (
      <SearchWrapper
        resetForm
        formid="exam_shift_search"
        autoSearchWhenStart
        hiddenFields={hiddenFields}
        defaultValues={{ status: ['queued', 'approved'] }}
        schema={schema}
        renderResultsComponent={this.renderResultComponent}
        classFormFilter={'display-none'}
        alternativeApi={contestApiUrls.exam_shift_search}
      />
    );
  }
}

ExamShiftSearch.propTypes = {
  dispatch: PropTypes.func,
  contest: PropTypes.shape(),
};

ExamShiftSearch.defaultProps = {
  dispatch: null,
  contest: null,
};

export default ExamShiftSearch;
