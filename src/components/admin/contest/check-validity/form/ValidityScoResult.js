import React from 'react';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

import Warning from 'components/common/Warning';

class CheckValidity extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { sco, idx } = this.props;

    return (
      <div className="item-block" key={sco.id}>
        <div className="group-title">
          {`${t1('sco')} ${idx + 1}:`} {sco && sco.name}
        </div>
        <div>{`${t1('num_exercises')}: ${sco.num_exercises}`}</div>
        <div>
          {`${t1('weight')}:`}{' '}
          {sco.weighted ? (
            sco.weighted
          ) : (
            <Warning>{t1('weighted_of_sco_has_not_define')}</Warning>
          )}
        </div>
        <div className={'common-errors'}>
          <div className="error-title">{t1('common_errors')}</div>
          {sco && sco.num_exercises === 0 && (
            <Warning>{t1('sco_has_no_exercises')}</Warning>
          )}
          {sco &&
            sco.invalid_total_weight &&
            sco.invalid_total_weight === true && (
              <Warning>
                {t1('total_weight_for_exercises_not_equal_weight_of_sco')}
              </Warning>
            )}
          {sco && sco.invalid_number_exercises_template && (
            <Warning>
              {t1(
                'number_exercises_of_exam_template_not_equal_number_exercises_of_sco',
              )}
            </Warning>
          )}
        </div>
        {sco && sco.exercises && sco.exercises.length > 0 && (
          <div className="exercises">
            {sco.exercises.map((exercise, idx) => (
              <div className={'exercise-item'}>
                <div className="exercise-name">{`${t1('exercise')}: ${
                  exercise.name
                }`}</div>
                <div className="col-md-12">
                  <div>{`${t1('num_questions')}: ${
                    exercise.num_questions
                  }`}</div>
                  <div className={'common-errors'}>
                    <div className="error-title">{t1('common_errors')}</div>
                    {exercise && exercise.num_questions === 0 && (
                      <Warning>{t1('exercise_has_no_questions')}</Warning>
                    )}
                    {exercise && exercise.weighted_has_not_define && (
                      <Warning>
                        {t1('weighted_of_exercise_has_not_define')}
                      </Warning>
                    )}
                    {exercise &&
                      exercise.invalid_total_weight &&
                      exercise.invalid_total_weight === true && (
                        <Warning>
                          {t1(
                            'total_weight_for_questions_not_equal_weight_of_exercise',
                          )}
                        </Warning>
                      )}
                    {exercise &&
                      exercise.score_not_equal_with_score_of_exercise_in_exam_template &&
                      exercise.score_not_equal_with_score_of_exercise_in_exam_template ===
                        true && (
                        <Warning>
                          {t1(
                            'score_not_equal_with_score_of_exercise_in_exam_template',
                          )}
                        </Warning>
                      )}
                  </div>
                  {exercise &&
                    exercise.invalid_questions &&
                    exercise.invalid_questions.length > 0 && (
                      <div className={'common-errors'}>
                        <div className={'error-title'}>
                          {t1('invalid_questions')}
                        </div>
                        <div className={'table-item-list'}>
                          <Table className={'item-list'}>
                            <TableHeader
                              displaySelectAll={false}
                              adjustForCheckbox={false}
                              enableSelectAll={false}
                            >
                              <TableRow>
                                <TableHeaderColumn>
                                  {t1('question')}
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                  {t1('error/_warning')}
                                </TableHeaderColumn>
                              </TableRow>
                            </TableHeader>
                            <TableBody
                              displayRowCheckbox={false}
                              showRowHover
                              stripedRows
                            >
                              {exercise.invalid_questions.map(
                                (invalidQuestion, idx) => (
                                  <TableRow>
                                    <TableRowColumn>
                                      {invalidQuestion.numberOfQuestion}
                                    </TableRowColumn>
                                    <TableRowColumn>
                                      <Warning>{invalidQuestion.error}</Warning>
                                      {invalidQuestion.warning}
                                    </TableRowColumn>
                                  </TableRow>
                                ),
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default CheckValidity;
