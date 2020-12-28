import React from 'react';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import getLodash from 'lodash.get';
import { Link } from 'react-router-dom';
import Links from 'routes/links';
import IconButton from 'material-ui/IconButton';
import { scoreScaleTypes } from 'configs/constants';
import { getFinalScoreOfSubject } from './utils';

class ShowTranscriptBySemester extends React.PureComponent {
  getHeaderColumn = ({
    index,
    scoreScale,
    finalExamColSpan,
    testColSpan,
    headerRowSpan,
    scoreScalesToShowFinalScore,
  }) => {
    const isPMD = scoreScale === scoreScaleTypes.pmd;
    if (index === 0) {
      return [
        <th
          key="header-stt-by-semester"
          rowSpan={headerRowSpan}
          className="text-center"
        >
          {t1('stt')}
        </th>,
        <th
          key="header-subject-by-semester"
          rowSpan={headerRowSpan}
          className="text-center"
        >
          {t1('subject_name')}
        </th>,
        <th
          key="header-credit-by-semester"
          rowSpan={headerRowSpan}
          className="text-center"
        >
          {t1('credit')}
        </th>,
        isPMD ? (
          <th
            key="header-final-score-by-semester"
            rowSpan={headerRowSpan}
            className="text-center"
          >
            {t1('pmd_final_score')}
          </th>
        ) : (
          <th
            key="header-attendance-by-semester"
            rowSpan={headerRowSpan}
            className="text-center"
          >
            {t1('attendance')}
          </th>
        ),
        !isPMD && testColSpan > 0 && (
          <th
            key="header-component-score-by-semester"
            colSpan={testColSpan}
            rowSpan={testColSpan > 1 ? 1 : headerRowSpan}
            className="text-center"
          >
            {t1('component_score')}
          </th>
        ),
        !isPMD && finalExamColSpan > 0 && (
          <th
            key="header-final-score-by-semester"
            colSpan={finalExamColSpan}
            rowSpan={finalExamColSpan > 1 ? 1 : headerRowSpan}
            className="text-center"
          >
            {t1('final_score')}
          </th>
        ),
        !isPMD && (
          <th
            key="average-score-by-semester"
            colSpan={2 + scoreScalesToShowFinalScore.length}
            className="text-center"
          >
            {t1('average_score')}
          </th>
        ),
      ].filter(Boolean);
    }

    let result = [];
    if (testColSpan > 1) {
      result = result.concat(
        Array(...Array(testColSpan)).map((value, tIndex) => (
          <th
            rowSpan={headerRowSpan - 1}
            key={`index-header-test-score-${tIndex}-by-semester`}
            className="text-center"
          >
            {t1('on_going_%s', [tIndex + 1])}
          </th>
        )),
      );
    }

    if (finalExamColSpan > 1) {
      result = result.concat(
        Array(...Array(finalExamColSpan)).map((value, eIndex) => (
          <th
            rowSpan={headerRowSpan - 1}
            key={`index-header-academic-score-${eIndex}-by-semester`}
            className="text-center"
          >
            {t1(`final_exam_${eIndex}`)}
          </th>
        )),
      );
    }

    result = result.concat([
      <th key="header-passed-by-semester" className="text-center">
        {t1('status_passed')}
      </th>,
      <th key="header-score-original-by-semester" className="text-center">
        {t1(`score_by_scale_${scoreScale}`)}
      </th>,
    ]);

    if (
      Array.isArray(scoreScalesToShowFinalScore) &&
      scoreScalesToShowFinalScore.length
    ) {
      result = result.concat(
        scoreScalesToShowFinalScore.map((scale) => (
          <th
            key={`score_by_scale_${scale}-by-semester`}
            className="text-center"
          >
            {t1(`score_by_scale_${scale}`)}
          </th>
        )),
      );
    }

    return result;
  };

  getSurveyToTake = (semesterIid) => {
    const surveysToTake = this.props.surveysToTake;
    if (
      !semesterIid ||
      !Array.isArray(surveysToTake) ||
      !surveysToTake.length
    ) {
      return null;
    }

    return (
      surveysToTake.find((survey) => {
        return (
          getLodash(survey, 'semester.iid') === semesterIid &&
          getLodash(survey, 'survey.apply_survey_for') === 'end_semester'
        );
      }) || null
    );
  };

  getAverageScoroBySemester = (accumulation = {}, scoreScale = '0_10') => {
    if (scoreScale === scoreScaleTypes.pmd) {
      return accumulation.average_score;
    }

    return accumulation.average_score_by_0_4
      ? accumulation.average_score_by_0_4.toFixed(2)
      : '-';
  };

  render() {
    const {
      isAdmin,
      scoreScale,
      transcript,
      testColSpan,
      finalExamColSpan,
      accumulationBySemester,
      elementExportTranscript,
      scoreScalesToShowFinalScore,
    } = this.props;

    const isPMD = scoreScale === scoreScaleTypes.pmd;

    const headerRowSpan = isPMD ? 1 : 2;
    const numberColumn = isPMD
      ? 4
      : 6 + testColSpan + finalExamColSpan + scoreScalesToShowFinalScore.length;
    const accumulationColSpan1 = Math.round(numberColumn / 2);
    const accumulationColSpan2 = numberColumn - accumulationColSpan1;

    let disabled = false;

    return [
      <table className="table table-border whitebox" style={{ width: '100%' }}>
        <thead>
          {Array(...Array(headerRowSpan)).map((value, index) => (
            <tr
              key={`index-header-transcripr-${index}`}
              style={isPMD ? { height: 60 } : {}}
            >
              {this.getHeaderColumn({
                index,
                scoreScale,
                testColSpan,
                finalExamColSpan,
                headerRowSpan,
                scoreScalesToShowFinalScore,
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {Array.isArray(transcript) &&
            transcript.map(({ semester, subjects }) => {
              const surveyToTake = this.getSurveyToTake(
                getLodash(semester, 'iid'),
              );

              const semesterInfo = (
                <tr>
                  <td colSpan={numberColumn}>
                    {!semester || !semester.iid ? (
                      <p className="m-t-10">{t1('list_credit_transferted')}</p>
                    ) : (
                      <p className="m-t-10">
                        {`${semester.name} - ${semester.code}`}{' '}
                        <span className="text-muted">{`(${
                          semester.start_month
                        }/${semester.start_year} - ${semester.end_month}/${
                          semester.end_year
                        })`}</span>
                      </p>
                    )}
                    {isAdmin && surveyToTake && (
                      <p style={{ color: 'red' }}>
                        {t1('not_yet_take_the_survey')}
                      </p>
                    )}
                  </td>
                </tr>
              );

              const componentScoreSubject =
                (isAdmin || !surveyToTake) &&
                Array.isArray(subjects) &&
                subjects.map(
                  ({ current_score, final_score, rubrics, subject }, index) => {
                    if (!subject || !subject.iid || !Array.isArray(rubrics)) {
                      return null;
                    }

                    const showTranscriptFinal =
                      isAdmin ||
                      getLodash(current_score, 'transcript_status', 0);

                    const subjectName = `${subject.name} (${subject.code})`;

                    let columns = [
                      <td className="text-center">{index + 1}</td>,
                      <td>
                        {showTranscriptFinal ? (
                          subjectName
                        ) : (
                          <Link to="/learn/timetable">{subjectName}</Link>
                        )}{' '}
                      </td>,
                      <td className="text-center">{subject.credit}</td>,
                    ];

                    if (!isPMD) {
                      const attendanceRubric = rubrics.find(
                        (rubric) => rubric && rubric.sub_type === 'attendance',
                      );
                      let academicRubrics = rubrics.find(
                        (rubric) =>
                          rubric && rubric.sub_type === 'academic_score',
                      );
                      academicRubrics = Array.isArray(
                        academicRubrics && academicRubrics.children,
                      )
                        ? academicRubrics.children
                        : [];
                      const testRubrics =
                        rubrics
                          .filter(
                            (rubric) =>
                              !['attendance', 'academic_score'].includes(
                                rubric && rubric.sub_type,
                              ),
                          )
                          .reduce(
                            (result, rubric) =>
                              Array.isArray(rubric.children) &&
                              rubric.children.length
                                ? result.concat(rubric.children)
                                : result.concat([rubric]),
                            [],
                          ) || [];

                      columns = columns.concat([
                        <td className="text-center">
                          {' '}
                          {attendanceRubric && attendanceRubric.p_original}
                        </td>,
                      ]);

                      if (testColSpan > 0) {
                        columns = columns.concat(
                          Array(...Array(testColSpan)).map((col, tIndex) => {
                            const score = testRubrics[tIndex];
                            return (
                              <td className="text-center">
                                {score && score.p_original}
                              </td>
                            );
                          }),
                        );
                      }

                      if (finalExamColSpan > 0) {
                        columns = columns.concat(
                          Array(...Array(finalExamColSpan)).map(
                            (col, eIdex) => {
                              const score = academicRubrics[eIdex];
                              return (
                                <td className="text-center">
                                  {score && score.po && score.p_original}
                                </td>
                              );
                            },
                          ),
                        );
                      }

                      columns = columns.concat([
                        <td className="text-center">
                          {!!showTranscriptFinal && (
                            <Icon
                              icon={
                                getLodash(current_score, 'pf')
                                  ? 'check'
                                  : 'cancel'
                              }
                              style={{
                                fontSize: 20,
                                color: getLodash(current_score, 'pf')
                                  ? 'deepskyblue'
                                  : 'red',
                              }}
                            />
                          )}
                        </td>,
                      ]);
                    }

                    const creditTransfert =
                      final_score && final_score.credit_transfert;

                    if (subject.weighted === 1 && !creditTransfert) {
                      columns = columns.concat(
                        [
                          <td className="text-center">
                            {!!showTranscriptFinal &&
                              getFinalScoreOfSubject(
                                scoreScale,
                                current_score && current_score.p_original,
                              )}
                          </td>,
                        ],
                        !isPMD &&
                          scoreScalesToShowFinalScore.map((scale) => (
                            <td className="text-center">
                              {!!showTranscriptFinal &&
                                current_score &&
                                current_score[scale]}
                            </td>
                          )),
                      );
                    } else {
                      columns = columns.concat([
                        <td
                          className="text-center"
                          colSpan={1 + scoreScalesToShowFinalScore.length}
                        >
                          {t1('is_skill_course_or_prerequisites')}
                        </td>,
                      ]);
                    }

                    return (
                      <tr
                        key={`subject-${subject.iid}-semester-${semester &&
                          semester.iid}-index-${index}`}
                      >
                        {(() => {
                          if ((!semester || !semester.iid) && creditTransfert) {
                            return [
                              <td className="text-center">{index + 1}</td>,
                              <td colSpan={numberColumn - 1}>
                                {' '}
                                {subject.name}{' '}
                                <span className="text-muted">
                                  {' '}
                                  ({subject.code}){' '}
                                </span>
                              </td>,
                            ];
                          } else if (creditTransfert) {
                            return [
                              <td className="text-center">{index + 1}</td>,
                              <td>
                                {' '}
                                {subject.name}{' '}
                                <span className="text-muted">
                                  {' '}
                                  ({subject.code}){' '}
                                </span>
                              </td>,
                              <td className="text-center">{subject.credit}</td>,
                              <td
                                className="text-center"
                                colSpan={numberColumn - 3}
                              >
                                {t1('credit_transferted')}
                              </td>,
                            ];
                          }
                          return columns.filter(Boolean);
                        })()}
                      </tr>
                    );
                  },
                );

              const accumulationSummary =
                Array.isArray(accumulationBySemester) &&
                accumulationBySemester.find(({ semester_iid }) => {
                  return semester_iid === (semester && semester.iid);
                });

              const accumulationEl = (isAdmin || !surveyToTake) &&
                accumulationSummary &&
                (typeof accumulationSummary.average_score !== 'undefined' ||
                  accumulationSummary.credit_accumulation) && (
                  <tr>
                    <td colSpan={accumulationColSpan1}>
                      {t1(
                        isPMD
                          ? 'accumulated_points_by_semester'
                          : 'medium_score_by_semester',
                      )}{' '}
                      :{' '}
                      {this.getAverageScoroBySemester(
                        accumulationSummary,
                        scoreScale,
                      )}
                    </td>
                    <td colSpan={accumulationColSpan2}>
                      {t1('accumulated_credit')} :{' '}
                      {accumulationSummary.credit_accumulation}
                    </td>
                  </tr>
                );

              const startSurveyToTake = !isAdmin && surveyToTake && (
                <tr>
                  <td colSpan={numberColumn} className="text-center">
                    <IconButton
                      iconClassName="ti-comment-alt"
                      containerElement={
                        <Link
                          to={Links.startSurvey(
                            getLodash(surveyToTake, 'survey.iid'),
                            getLodash(surveyToTake, 'semester'),
                          )}
                        />
                      }
                      title={t1('go_to_take_survey')}
                    />
                    <h3>{`${t1('you_need_to_take_the_survey')}: ${getLodash(
                      surveyToTake,
                      'survey.name',
                    )}`}</h3>
                  </td>
                </tr>
              );

              return [
                semesterInfo,
                componentScoreSubject,
                accumulationEl,
                startSurveyToTake,
              ].filter(Boolean);
            })}
        </tbody>
      </table>,
      !isAdmin && typeof elementExportTranscript === 'function' && (
        <div className="m-t-20">
          {elementExportTranscript(disabled, disabled ? t1('') : null)}
        </div>
      ),
    ];
  }
}

export default ShowTranscriptBySemester;
