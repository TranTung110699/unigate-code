import React, { Component } from 'react';
import SearchWrapper from '../../../common/search-wrap-v2/SearchWrapper';
import Results from './Results';
import apiUrls from '../../../../api-endpoints';
import budgetApiUrls from 'components/admin/budgetary-allocations/endpoints';

import schema from './search-schema';
import RaisedButton from '../../../common/mui/RaisedButton';
import { t1 } from '../../../../translate';
import { jobsActions } from 'actions/job';
import lodashGet from 'lodash.get';
import connect from 'react-redux/es/connect/connect';
import { getUrl } from 'routes/links/common';
import { Link } from 'react-router-dom';
import { createSelector } from 'reselect';
import commonSagaActions from 'actions/saga-creators';
import { getFormValues } from 'redux-form';

const formid = 'budgetary_search';

class Layout extends Component {
  constructor(props) {
    super(props);
    // this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  cronJobsToReport = (url, params) => {
    const { dispatch } = this.props;

    dispatch(jobsActions.cronJobsToReport(url, params));
  };
  renderResultComponent = (items, props) => (
    <Results formid={this.formid} items={items} {...props} />
  );

  handleExport = () => {
    const { dispatch, formValues } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_equivalent_positions_programs,
        {
          report_type: 'report_type_equivalent_positions_programs',
          year: lodashGet(formValues, 'year'),
          submit: 1,
          modeConfig: lodashGet(formValues, 'modeConfig'),
        },
      ),
    );
  };

  renderExportButton = () => {
    if (
      lodashGet(this.props, 'formValues.report_type') !==
      'report_type_equivalent_positions_programs'
    ) {
      return null;
    }
    return (
      <RaisedButton
        label={t1('export')}
        primary
        style={{ margin: '0 10px 10px 0' }}
        onClick={this.handleExport}
      />
    );
  };

  render() {
    const { allocations_budgetary_equivalent } = this.props;
    let modeConfig = 'credit_programs';
    if (allocations_budgetary_equivalent) {
      modeConfig = 'equivalent_positions';
    }
    let alternativeApi = '';
    switch (modeConfig) {
      case 'equivalent_positions':
        alternativeApi = budgetApiUrls.api_budgetary_search_mode_equivalent;
        break;
      default:
        alternativeApi = budgetApiUrls.api_budgetary_search;
    }
    const styleButton = { margin: '0 10px 10px 0' };
    return (
      <div>
        <div className={'row'}>
          {' '}
          {/* role block */}
          <div className="col-md-12">
            <RaisedButton
              name="job_log"
              id="job_log"
              label={t1('run_job_report')}
              primary
              style={styleButton}
              onClick={() =>
                this.cronJobsToReport(
                  budgetApiUrls.cron_job_to_log_expense_to_report_budgetary_master_by_equivalent_positions,
                  {},
                )
              }
            />
            <Link
              to={getUrl('budgetary-allocations/criteria')}
              style={styleButton}
            >
              <RaisedButton primary label={t1('criteria')} />
            </Link>
            {this.renderExportButton()}
          </div>
        </div>
        <SearchWrapper
          hiddenFields={{
            modeConfig,
          }}
          schema={schema}
          formid={formid}
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
  (state) => getFormValues(formid)(state),
  (conf, formValues) => ({
    allocations_budgetary_equivalent: lodashGet(
      conf,
      'support_equivalent_job_positions',
    ),
    formValues,
  }),
);
export default connect(mapStateToProps)(Layout);
