import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './index';
// import apiUrls from 'api-endpoints';
import budgetApiUrls from 'components/admin/budgetary-allocations/endpoints';
import schema from './schema';
import lodashGet from 'lodash.get';
import connect from 'react-redux/es/connect/connect';
import { createSelector } from 'reselect';

class Layout extends Component {
  constructor(props) {
    super(props);
    // this.renderResultComponent = this.renderResultComponent.bind(this);
  }
  formid = 'criteria_report';
  renderResultComponent = (items, props) => (
    <Results formid={this.formid} items={items} {...props} />
  );

  render() {
    const { allocations_budgetary_equivalent } = this.props;
    let modeConfig = 'credit_programs';
    if (allocations_budgetary_equivalent) {
      modeConfig = 'equivalent_positions';
    }
    const alternativeApi = budgetApiUrls.get_data_criteria_budgetary;
    return (
      <div>
        <SearchWrapper
          step={'report_criteria'}
          schema={schema}
          hiddenFields={{
            modeConfig,
          }}
          formid={this.formid}
          renderResultsComponent={this.renderResultComponent}
          alternativeApi={alternativeApi}
          destroyOnUnmount
        />
      </div>
    );
  }
}
const mapStateToProps = createSelector(
  (state, props) => lodashGet(state, 'domainInfo.conf'),
  (conf) => ({
    allocations_budgetary_equivalent: lodashGet(
      conf,
      'support_equivalent_job_positions',
    ),
  }),
);
export default connect(mapStateToProps)(Layout);
