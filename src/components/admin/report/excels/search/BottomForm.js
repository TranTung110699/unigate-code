import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import apiUrls from 'api-endpoints';
import contestApiUrls from 'components/admin/contest/endpoints';
import PropTypes from 'prop-types';

import UsersJoinToTakeExam from './users_join_to_take_exam/Layout';
import UsersByGrade from './users_by_grade/Layout';
import ExamResultByRound from './exam-result-by-round/Layout';
import ExamResultByPeriod from './exam-result-by-period/Layout';
import UsersAllRoundsResults from './users_all_rounds/Layout';

class BottomForm extends Component {
  usersByGradeFieldsToShow = ['school__province'];
  usersByGradeFieldsToShow1 = ['school__province', 'school__district'];
  usersByGradeFieldsToShow2 = ['exam_round'];

  render() {
    const { topForm } = this.props;
    const type = topForm.report;
    return (
      <div>
        {type === 'er_users_by_province' && (
          <UsersByGrade
            id="report_number_of_users_by_province"
            contest={topForm.contest}
            exportUrl={contestApiUrls.export_report_number_of_users_by_province}
          />
        )}
        {type === 'er_users_by_district' && (
          <UsersByGrade
            id="report_number_of_users_by_district"
            contest={topForm.contest}
            exportUrl={contestApiUrls.export_report_number_of_users_by_district}
            fieldsToShow={this.usersByGradeFieldsToShow}
          />
        )}
        {type === 'er_users_by_school_in_province' && (
          <UsersByGrade
            id="report_number_of_users_by_school_in_province"
            contest={topForm.contest}
            exportUrl={
              contestApiUrls.export_report_number_of_users_by_school_in_province
            }
            fieldsToShow={this.usersByGradeFieldsToShow}
          />
        )}
        {type === 'er_users_by_school_in_district' && (
          <UsersByGrade
            id="report_number_of_users_by_school_in_district"
            contest={topForm.contest}
            exportUrl={
              contestApiUrls.export_report_number_of_users_by_school_in_district
            }
            fieldsToShow={this.usersByGradeFieldsToShow1}
          />
        )}
        {type === 'er_take_round_one' && (
          <UsersByGrade
            id="report_number_of_users_take_round_one_by_school"
            contest={topForm.contest}
            exportUrl={
              contestApiUrls.export_report_number_of_users_take_round_one_by_school
            }
          />
        )}
        {type === 'er_users_in_one_round' && (
          <UsersByGrade
            id="report_number_of_users_in_one_round_by_school"
            contest={topForm.contest}
            exportUrl={
              contestApiUrls.export_report_number_of_users_in_one_round_by_school
            }
            fieldsToShow={this.usersByGradeFieldsToShow2}
          />
        )}
        {type === 'er_all_rounds' && (
          <UsersAllRoundsResults
            id="report_users_in_all_rounds"
            contest={topForm.contest}
            exportUrl={contestApiUrls.export_report_users_in_all_rounds}
          />
        )}
        {type === 'er_round' && (
          <ExamResultByRound
            id={topForm.report}
            sortScore="0"
            contest={topForm.contest}
          />
        )}
        {type === 'er_score_d' && (
          <ExamResultByRound
            id={topForm.report}
            sortScore="-1"
            contest={topForm.contest}
          />
        )}
        {type === 'er_score_a' && (
          <ExamResultByRound
            id={topForm.report}
            sortScore="1"
            contest={topForm.contest}
          />
        )}
        {type === 'er_score_period' && (
          <ExamResultByPeriod id={topForm.report} contest={topForm.contest} />
        )}
        {type === 'er_users_join_to_take_exam' && (
          <UsersJoinToTakeExam
            id="users_join_to_take_exam"
            contest={topForm.contest}
          />
        )}
        ,
      </div>
    );
  }
}

function mapStateToProps(state) {
  const selector = formValueSelector('report_excels_top_form');
  const { contest, report } = selector(state, 'contest', 'report');

  return {
    topForm: {
      contest,
      report,
    },
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
