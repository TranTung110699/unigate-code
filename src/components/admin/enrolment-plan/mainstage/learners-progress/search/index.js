/* eslint-disable react/prop-types,no-undef */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { t1 } from 'translate';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from 'components/admin/enrolment-plan/mainstage/learners-progress/schema/schema';
import { createSelector } from 'reselect';
import Results from './Results';

class LearnersProgress extends React.Component {
  renderResultComponent = (items, props, objects) => {
    const { formid } = this.props;

    return (
      <Results
        {...props}
        items={items}
        objects={objects}
        searchFormId={formid}
        className="whitebox"
      />
    );
  };

  render() {
    const { node, formid } = this.props;
    let { hiddenFields } = this.props;

    if (!hiddenFields) {
      hiddenFields = { enrolment_plan_iid: node.iid };
    }

    return (
      <SearchWrapper
        formid={formid}
        schema={schema}
        alternativeApi={apiUrls.enrolment_plan_learners_progress_new}
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
        noResultText={t1('no_data')}
        className="p-b-30"
      />
    );
  }
}

LearnersProgress.propTypes = {
  formid: PropTypes.string,
  node: PropTypes.shape(),
  noSearchForm: PropTypes.bool,
};

LearnersProgress.defaultProps = {
  formid: '',
  node: {},
  noSearchForm: true,
};

export default connect()(LearnersProgress);
