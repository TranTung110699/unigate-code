import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lodashGet from 'lodash.get';
import { doesQuestionAverageScoreMeaningful } from 'common/learn/Question';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import Rating from 'schema-form/elements/rating/index';
import { confSelector } from 'common/selectors';
import {
  getSurveyNumberQuestionRange,
  getSurveyNumberAnswerDisplayingScale,
} from 'common/conf';
import DetailOnDialog from 'components/common/detail-on-dialog';
import { average } from 'common/utils/Array';
import { t1 } from 'translate';

class SurveyResult extends React.Component {
  displayAvgScore = (avgScore) => {
    const {
      surveyNumberQuestionMaxScore,
      surveyNumberAnswerDisplayingScale,
    } = this.props;

    const scaledScore =
      (avgScore / surveyNumberQuestionMaxScore) *
      surveyNumberAnswerDisplayingScale;

    return surveyNumberAnswerDisplayingScale == 5 ? (
      <Rating
        className="rating"
        count={scaledScore.toFixed(1)}
        size={20}
        color2="#ffd700"
        half={false}
        edit={false}
      />
    ) : (
      scaledScore.toFixed(1)
    );
  };

  render() {
    const {
      surveys,
      surveyTargetItems,
      getAvgScoreThatUserGiveAnTargetItemsInQuestionOfSurvey,
      surveyNumberQuestionMaxScore,
      surveyNumberAnswerDisplayingScale,
    } = this.props;

    return (
      (surveys &&
        surveys.map((sv, svIndex) => {
          const questions = (lodashGet(sv, 'children') || []).filter(
            doesQuestionAverageScoreMeaningful,
          );

          return (
            <div>
              <div>{`${svIndex + 1}. ${lodashGet(sv, 'name')}`}</div>
              <div className="table-result p-l-10 p-r-10">
                <Table>
                  <TableHeader
                    displaySelectAll={false}
                    enableSelectAll={false}
                    adjustForCheckbox={false}
                  >
                    <TableRow>
                      <TableHeaderColumn />
                      {surveyTargetItems &&
                        surveyTargetItems.map((cs) => (
                          <TableHeaderColumn>
                            {lodashGet(cs, 'name')}
                          </TableHeaderColumn>
                        ))}
                    </TableRow>
                  </TableHeader>

                  <TableBody
                    displayRowCheckbox={false}
                    showRowHover
                    stripedRows
                  >
                    {questions &&
                      questions.map((q) => (
                        <TableRow key={q.id}>
                          <TableRowColumn>
                            <DetailOnDialog
                              textPreviewIsHtml
                              textPreview={q.content}
                              textFull={q.content}
                            />
                          </TableRowColumn>
                          {surveyTargetItems &&
                            surveyTargetItems.map((item) => {
                              return (
                                <TableRowColumn>
                                  {this.displayAvgScore(
                                    getAvgScoreThatUserGiveAnTargetItemsInQuestionOfSurvey(
                                      lodashGet(sv, 'iid'),
                                      lodashGet(item, 'iid'),
                                      lodashGet(q, 'iid'),
                                    ),
                                  )}
                                </TableRowColumn>
                              );
                            })}
                        </TableRow>
                      ))}
                    <TableRow>
                      <TableRowColumn>{t1('average')}</TableRowColumn>
                      {surveyTargetItems &&
                        surveyTargetItems.map((item) => {
                          return (
                            <TableRowColumn>
                              {this.displayAvgScore(
                                average(
                                  (questions || []).map((q) =>
                                    getAvgScoreThatUserGiveAnTargetItemsInQuestionOfSurvey(
                                      lodashGet(sv, 'iid'),
                                      lodashGet(item, 'iid'),
                                      lodashGet(q, 'iid'),
                                    ),
                                  ),
                                ),
                              )}
                            </TableRowColumn>
                          );
                        })}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          );
        })) ||
      null
    );
  }
}

SurveyResult.propTypes = {
  data: PropTypes.shape(),
  surveyNumberQuestionMaxScore: PropTypes.number,
  surveyNumberAnswerDisplayingScale: PropTypes.number,
};

SurveyResult.defaultProps = {
  surveyNumberQuestionMaxScore: 5,
  surveyNumberAnswerDisplayingScale: 10,
};

const mapStateToProps = (state) => {
  const surveyNumberQuestionRange = getSurveyNumberQuestionRange(
    confSelector(state),
  );
  const surveyNumberAnswerDisplayingScale = getSurveyNumberAnswerDisplayingScale(
    confSelector(state),
  );

  return {
    surveyNumberQuestionMaxScore: lodashGet(surveyNumberQuestionRange, 'max'),
    surveyNumberAnswerDisplayingScale,
  };
};

export default connect(mapStateToProps)(SurveyResult);
