import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import schema from './schema';

import { t1 } from 'translate';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import Results from './Results';

class Search extends React.Component {
  renderResultComponent = (items, props) => {
    const { formid, columnsNotToShow } = this.props;

    return (
      <Results
        {...props}
        items={items}
        searchFormId={formid}
        columnsNotToShow={columnsNotToShow}
      />
    );
  };

  render() {
    const { node, trainingPlan, noSearchForm, formid } = this.props;

    return (
      <SearchWrapper
        formid={formid}
        schema={schema}
        showSearchButton={!noSearchForm}
        alternativeApi={apiUrls.enrolment_plan_not_started_learners}
        hiddenFields={{
          enrolment_plan_iid: node && node.iid,
          training_plan_iid: trainingPlan && trainingPlan.iid,
        }}
        renderResultsComponent={this.renderResultComponent}
        noResultText={t1('no_data')}
        noNeedBackground
      />
    );
  }
}

Search.propTypes = {
  formid: PropTypes.string,
  node: PropTypes.shape(),
  noSearchForm: PropTypes.bool,
};

Search.defaultProps = {
  formid: '',
  node: {},
  noSearchForm: true,
};

export default connect()(Search);
