import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import UpdateExamRoundForm from 'components/admin/contest/exam-round/new/Form';
/**
 * handles editing list of invalid questions in contest
 */
class InvalidQuestions extends React.Component {
  render() {
    const { examRound, contest } = this.props;
    const formid = 'edit_exam_round_invalid_questions';

    return (
      <div>
        <h1>{t1('invalid_questions')}</h1>
        <div>
          {t1(
            'when_there_is_invalid_or_wrong_questions_found_in_the_exam_paper_after_the_test_has_been_carried_out,_bonus_points_must_be_given_to_contestants',
          )}
          {t1('click_button_below_to_add_id_of_questions_that_are_invalid')}
        </div>
        <UpdateExamRoundForm
          mode="edit"
          contest={contest}
          node={examRound}
          step={'invalid_questions'}
          formid={formid}
        />

        <hr />
      </div>
    );
  }
}

export default InvalidQuestions;
