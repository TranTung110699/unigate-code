import React from 'react';
import { getFormValues, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { Element } from 'schema-form/elements';
import userSagaActions from 'components/admin/user/actions/saga-creators';
import schemaActions from 'schema-form/actions';

class ChangeExamRoundForm extends React.Component {
  componentDidMount() {
    this.fetchOptionsData();
  }

  fetchOptionsData() {
    const { formid, dispatch, contestCode } = this.props;

    if (contestCode) {
      const params = {
        contest_code: contestCode,
      };

      dispatch(
        schemaActions.formSchemaConfigsRequest(
          'upcoming_exam_round',
          formid,
          params,
        ),
      );
    }
  }

  changeExamRoundForUsers = () => {
    const {
      userIdsToChangeExamRound,
      contestCode,
      examRound,
      dispatch,
    } = this.props;

    dispatch(
      userSagaActions.changeUsersExamRoundRequest(
        userIdsToChangeExamRound,
        examRound,
        contestCode,
      ),
    );
  };

  render() {
    const { examRounds } = this.props;
    return (
      <div className="col-md-12">
        <span>
          {t1(
            'could_you_please_choose_exam_round_and_then_click_submit_to_change_those_one_for_these_user_bellow',
          )}
        </span>
        <Element
          schema={{
            type: 'select',
            name: 'exam_round',
            floatingLabelFixed: true,
            floatingLabelText: t1('exam_round'),
            fullWidth: true,
            options: examRounds,
          }}
        />
        <RaisedButton
          primary
          onClick={() => this.changeExamRoundForUsers()}
          label={t1('change_exam_round')}
        />
      </div>
    );
  }
}

ChangeExamRoundForm.propTypes = {
  examRounds: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      primaryText: PropTypes.string,
    }),
  ),
};

ChangeExamRoundForm.defaultProps = {
  examRounds: [],
};

function mapStateToProps(state, props) {
  const defaultSelectOptions = [
    {
      value: '',
      primaryText: t1('all'),
    },
  ];

  const examResultSearchValues = getFormValues('exam_result_search')(state);
  const examResultSearchResultValues = getFormValues(
    'exam_result_search_result',
  )(state);
  const changeExamRoundResultValues = getFormValues('change_exam_round')(state);
  const contestCode =
    examResultSearchValues && examResultSearchValues.contest_code
      ? examResultSearchValues.contest_code
      : null;
  const examRound =
    changeExamRoundResultValues && changeExamRoundResultValues.exam_round
      ? changeExamRoundResultValues.exam_round
      : null;
  const userIdsToChangeExamRound =
    examResultSearchResultValues && examResultSearchResultValues.user_ids
      ? examResultSearchResultValues.user_ids
      : [];

  let examRounds = defaultSelectOptions;

  const changeExamRoundConfig = state.formSchemaConfigs['change_exam_round'];
  if (changeExamRoundConfig) {
    if (changeExamRoundConfig.upcoming_exam_round) {
      examRounds = examRounds.concat(changeExamRoundConfig.upcoming_exam_round);
    }
  }

  return {
    userIdsToChangeExamRound,
    examRounds,
    contestCode,
    examRound,
    formid: 'change_exam_round',
  };
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'change_exam_round',
  })(ChangeExamRoundForm),
);
