import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { confSelector } from 'common/selectors';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import schema from './schema/search-form';
import Results from './Results';

class Layout extends Component {
  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  render() {
    const { maxNumberOfExamResit } = this.props;
    const hiddenFields = {
      maxNumberOfExamResit,
    };

    return (
      <SearchWrapper
        hiddenFields={hiddenFields}
        alternativeApi="/student/api/search-students-taking-the-exam"
        formid="students_in_offline_exam"
        schema={schema}
        renderResultsComponent={this.renderResultComponent}
      />
    );
  }
}

Layout.propTypes = {
  type: PropTypes.string,
};

Layout.defaultProps = {
  type: '',
};

function mapStateToProps(state) {
  const conf = confSelector(state);
  const maxNumberOfExamResit = conf.max_number_of_exam_resits;

  return {
    maxNumberOfExamResit,
  };
}

export default connect(mapStateToProps)(Layout);
