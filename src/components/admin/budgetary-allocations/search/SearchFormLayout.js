import React from 'react';
import RaisedButton from '../../../common/mui/RaisedButton';
import { t1 } from '../../../../translate';
import commonSagaActions from '../../../../actions/saga-creators';
import apiUrls from '../../../../api-endpoints';
import budgetApiUrls from 'components/admin/budgetary-allocations/endpoints';

import connect from 'react-redux/es/connect/connect';
import get from 'lodash.get';

class SearchFormLayout extends React.PureComponent {
  handleExport = () => {
    const { dispatch, formValues } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        budgetApiUrls.export_budgetary,
        formValues,
      ),
    );
  };

  render() {
    const { groups, submitButton, formValues } = this.props;
    const report_type = get(formValues, 'report_type');
    if (report_type === 'credit_program') {
      return (
        <div className="container-fluid elementGroup">
          <div className="row">
            <div className="col-md-6">
              {groups.default.fieldNames.report_type}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">{groups.default.fieldNames.text}</div>
            <div className="col-md-6">
              {groups.default.fieldNames.organizations}
            </div>
          </div>
          <div className="row">
            {groups.default.fieldNames.year && (
              <div className="col-md-3">{groups.default.fieldNames.year}</div>
            )}
            {groups.default.fieldNames.reportBy && (
              <div className="col-md-3">
                {groups.default.fieldNames.reportBy}
              </div>
            )}
            {groups.default.fieldNames.start_month && (
              <div className="col-md-3">
                {groups.default.fieldNames.start_month}
              </div>
            )}
            {groups.default.fieldNames.end_month && (
              <div className="col-md-3">
                {groups.default.fieldNames.end_month}
              </div>
            )}
            {groups.default.fieldNames.forMonthMultiple && (
              <div className="col-md-3">
                {groups.default.fieldNames.forMonthMultiple}
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-12 m-t-20 text-center">
              {submitButton}
              <RaisedButton
                name="export"
                onClick={this.handleExport}
                id="export"
                label={t1('Export')}
                className="admin-btn"
                primary
              />
            </div>
          </div>
        </div>
      );
    } else if (report_type === 'positions') {
      return (
        <div className="container-fluid elementGroup">
          <div className="row">
            <div className="col-md-6">
              {groups.default.fieldNames.report_type}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {groups.default.fieldNames.organizations}
            </div>
            <div className="col-md-6 m-t-20">
              {groups.default.fieldNames.positions}
            </div>
          </div>
          <div className="row">
            {groups.default.fieldNames.year && (
              <div className="col-md-3">{groups.default.fieldNames.year}</div>
            )}
            {groups.default.fieldNames.reportBy && (
              <div className="col-md-3">
                {groups.default.fieldNames.reportBy}
              </div>
            )}
            {groups.default.fieldNames.start_month && (
              <div className="col-md-3">
                {groups.default.fieldNames.start_month}
              </div>
            )}
            {groups.default.fieldNames.end_month && (
              <div className="col-md-3">
                {groups.default.fieldNames.end_month}
              </div>
            )}
            {groups.default.fieldNames.forMonth && (
              <div className="col-md-3">
                {groups.default.fieldNames.forMonth}
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-12 m-t-20 text-center">
              {submitButton}
              {/* <RaisedButton */}
              {/* name="export" */}
              {/* onClick={this.handleExport} */}
              {/* id="export" */}
              {/* label={t1('Export')} */}
              {/* className="admin-btn" */}
              {/* primary */}
              {/* /> */}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className="col-md-6">
            {groups.default.fieldNames.report_type}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">{groups.default.fieldNames.text}</div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {groups.default.fieldNames.organizations}
            {groups.default.fieldNames.include_sub_organizations}
          </div>
        </div>
        <div className="row">
          {groups.default.fieldNames.year && (
            <div className="col-md-3">{groups.default.fieldNames.year}</div>
          )}
          {groups.default.fieldNames.reportBy && (
            <div className="col-md-3">{groups.default.fieldNames.reportBy}</div>
          )}
          {groups.default.fieldNames.start_month && (
            <div className="col-md-3">
              {groups.default.fieldNames.start_month}
            </div>
          )}
          {groups.default.fieldNames.end_month && (
            <div className="col-md-3">
              {groups.default.fieldNames.end_month}
            </div>
          )}
          {groups.default.fieldNames.forMonth && (
            <div className="col-md-3">{groups.default.fieldNames.forMonth}</div>
          )}
        </div>
        <div className="row">
          <div className="col-md-12 m-t-20 text-center">
            {submitButton}
            {/* <RaisedButton */}
            {/* name="export" */}
            {/* onClick={this.handleExport} */}
            {/* id="export" */}
            {/* label={t1('Export')} */}
            {/* className="admin-btn" */}
            {/* primary */}
            {/* /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(SearchFormLayout);
