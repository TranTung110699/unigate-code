import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';

import SearchLayout from './search-layout/Layout';

class BottomForm extends Component {
  searchLayoutFieldsToShow = ['school__province'];
  searchLayoutFieldsToShow1 = ['school__province', 'school__district'];

  render() {
    const { topForm } = this.props;

    return (
      <div>
        {topForm.report === 'rc_users_by_grade' && (
          <SearchLayout
            formid="report_chart_users_by_grade"
            contest={topForm.contest}
            chartType="pie"
          />
        )}
        {topForm.report === 'rc_users_by_province' && (
          <SearchLayout
            formid="report_chart_users_by_province"
            contest={topForm.contest}
            chartType="pie"
          />
        )}
        {topForm.report === 'rc_users_by_district' && (
          <SearchLayout
            formid="report_chart_users_by_district"
            contest={topForm.contest}
            fieldsToShow={this.searchLayoutFieldsToShow}
            chartType="bar"
          />
        )}
        {topForm.report === 'rc_users_by_school_in_province' && (
          <SearchLayout
            formid="report_chart_users_by_school_in_province"
            contest={topForm.contest}
            fieldsToShow={this.searchLayoutFieldsToShow}
            chartType="bar"
          />
        )}
        {topForm.report === 'rc_users_by_school_in_district' && (
          <SearchLayout
            formid="report_chart_users_by_school_in_district"
            contest={topForm.contest}
            fieldsToShow={this.searchLayoutFieldsToShow1}
            chartType="bar"
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const selector = formValueSelector('report_charts_top_form');
  const { contest, report } = selector(state, 'contest', 'report');

  return {
    topForm: {
      contest,
      report,
    },
    form: state.form,
  };
}

BottomForm.propTypes = {
  topForm: PropTypes.shape({
    contest: PropTypes.string,
    report: PropTypes.string,
  }),
};

BottomForm.defaultProps = {
  topForm: {},
};

export default connect(mapStateToProps)(BottomForm);
