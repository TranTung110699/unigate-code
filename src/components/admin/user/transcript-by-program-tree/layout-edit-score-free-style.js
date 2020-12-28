/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';
import getLodash from 'lodash.get';
import { t1 } from 'translate';
import Paper from 'material-ui/Paper';
import Icon from 'components/common/Icon';
import MarkingRubric from 'components/common/rubric';
import Marking from 'components/admin/course/mainstage/score-and-marking/score-online/common/marking';
import { scoreScaleTypes } from 'configs/constants';
import { extractObject } from 'common/utils/Array';

class LayoutFreestyle extends React.PureComponent {
  stylePaper = {
    marginTop: 20,
    padding: 10,
  };

  elementMarking = (rubric, semesterIid, scoreScale, otherInfo = null) => {
    const handleChangeFormValueByField = getLodash(
      this.props,
      'layoutOptionsProperties.handleChangeFormValueByField',
    );

    const scores = getLodash(this.props, 'formValues.progress');
    const score =
      (Array.isArray(scores) &&
        scores.find((row) => row && row.tco_iid === rubric.iid)) ||
      {};
    return (
      <Marking
        label={
          <span>
            {typeof score.tco_iid !== 'undefined' ? score.po : rubric.po}
            <Icon icon="edit" />
          </span>
        }
        editingValue={
          typeof score.tco_iid !== 'undefined' ? score.po : rubric.po
        }
        anythingValue
        scalePartIdAsValue
        scoreScale={scoreScale}
        onChange={(progressValue) => {
          let currentScores =
            getLodash(this.props, 'formValues.progress') || [];
          currentScores = currentScores.filter(
            (row) => row.tco_iid !== rubric.iid,
          );
          if (
            typeof rubric.po !== 'undefined' ||
            (progressValue && progressValue !== '')
          ) {
            currentScores.push({
              ...extractObject(otherInfo || rubric, [
                'number_of_relearn',
                'learning_item',
              ]),
              tco_iid: rubric.iid,
              po: progressValue,
              ss: scoreScale,
              semester: semesterIid,
            });
          }
          handleChangeFormValueByField(
            this.props.formid,
            'progress',
            currentScores,
          );
        }}
      />
    );
  };

  renderElementEditScoreByRubricWithScoreScalePMD = (
    rubrics,
    semesterIid,
    scoreScale,
  ) => {
    const academicRubrics =
      Array.isArray(rubrics) &&
      rubrics.reduce((result, rubric) => {
        if (rubric.sub_type !== 'academic_score') {
          return result;
        }
        return Array.isArray(rubric.children)
          ? result.concat(rubric.children)
          : result;
      }, []);

    if (!Array.isArray(academicRubrics) || !academicRubrics.length) {
      return <h3>{t1('the_rubric_has_not_been_created')}</h3>;
    }

    const handleChangeFormValueByField = getLodash(
      this.props,
      'layoutOptionsProperties.handleChangeFormValueByField',
    );

    const rubric = academicRubrics[0];
    return (
      <MarkingRubric
        showDialog={false}
        user={{
          iid: getLodash(this.props, 'hiddenFields.userIid'),
        }}
        rubric={rubric}
        scoreScale={scoreScale}
        onMarking={(newProgress) => {
          let progress = [];
          const rubricIids = Object.keys(newProgress);

          if (Array.isArray(rubricIids) && rubricIids.length) {
            rubricIids.forEach((iid) => {
              progress.push({
                ...extractObject(rubric, [
                  'number_of_relearn',
                  'learning_item',
                ]),
                ...newProgress[iid],
                po: newProgress[iid].p_original,
                tco_iid: iid,
                ss: scoreScale,
                semester: semesterIid,
              });
            });
          } else {
            progress = null;
          }

          handleChangeFormValueByField(this.props.formid, 'progress', progress);
        }}
      />
    );
  };

  renderElementEditScoreByRubricWithScoreScaleNormal = (
    rubrics,
    history,
    semesterIid,
    scoreScale,
  ) => {
    if (!Array.isArray(rubrics) || !rubrics.length) {
      return <h3>{t1('the_rubric_has_not_been_created')}</h3>;
    }

    let rubricsMarking = [];
    let rubricsLevel1 = [];
    let rubricsLevel2 = [];
    let otherInfo = null;

    rubrics.forEach((rubric) => {
      if (!otherInfo && typeof rubric.po !== 'undefined') {
        otherInfo = extractObject(rubric, [
          'number_of_relearn',
          'learning_item',
        ]);
      }

      if (
        rubric.sub_type !== 'attendance' &&
        Array.isArray(rubric.children) &&
        rubric.children.length > 1
      ) {
        rubricsLevel1 = rubricsLevel1.concat([rubric]);
        rubric.children.forEach((chil) => {
          rubricsMarking = rubricsMarking.concat([chil]);
          rubricsLevel2 = rubricsLevel2.concat([chil]);
        });
      } else if (
        rubric.sub_type !== 'attendance' &&
        Array.isArray(rubric.children) &&
        rubric.children.length === 1 &&
        rubric.children[0].iid
      ) {
        rubricsMarking.push(getLodash(rubric, 'children[0]'));
        rubricsLevel1.push(rubric);
      } else {
        delete rubric.children;
        rubricsMarking = rubricsMarking.concat([rubric]);
        rubricsLevel1 = rubricsLevel1.concat([rubric]);
      }
    });

    const headerRowSpan = rubricsLevel2.length ? 2 : 1;

    return (
      <table className="table text-center">
        <thead>
          {Array(...Array(headerRowSpan)).map((value, rindex) => (
            <tr key={`index-header-row-transcripr-${rindex}-by_${semesterIid}`}>
              {rindex === 0 &&
                rubricsLevel1.map((rubric) => (
                  <td
                    rowSpan={
                      Array.isArray(rubric.children) &&
                      rubric.children.length > 1
                        ? 1
                        : headerRowSpan
                    }
                    colSpan={
                      Array.isArray(rubric.children) &&
                      rubric.children.length > 1
                        ? rubric.children.length
                        : 1
                    }
                  >
                    {getLodash(rubric, 'name')}
                    {getLodash(rubric, 'children.[0].name') && (
                      <span className="text-muted">
                        {' '}
                        (#
                        {getLodash(rubric, 'children.[0].name')})
                      </span>
                    )}
                  </td>
                ))}
              {rindex === 0 && (
                <td rowSpan={headerRowSpan}>{t1('final_score')}</td>
              )}
              {rindex === 0 && <td rowSpan={headerRowSpan}>{t1('passed')}</td>}

              {rindex === 1 &&
                rubricsLevel2.map((rubric) => (
                  <td>{getLodash(rubric, 'name')}</td>
                ))}
            </tr>
          ))}
        </thead>
        <tbody>
          <tr>
            {rubricsMarking.map((rubric, tindex) => (
              <td key={`${rubric.iid}-index-body-col-${tindex}`}>
                {rubric.sub_type === 'attendance'
                  ? '...'
                  : this.elementMarking(
                      rubric,
                      semesterIid,
                      scoreScale,
                      otherInfo,
                    )}
              </td>
            ))}
            <td>{getLodash(history, 'current_score.po')}</td>
            <td>
              {typeof getLodash(history, 'current_score.pf') !==
                'undefined' && (
                <Icon
                  icon={
                    getLodash(history, 'current_score.pf') ? 'check' : 'cancel'
                  }
                  style={{
                    fontSize: 20,
                    color: getLodash(history, 'current_score.pf')
                      ? 'deepskyblue'
                      : 'red',
                  }}
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  renderElementEditScoreByRubric = (history) => {
    const fieldNames = getLodash(this.props, 'groups.default.fieldNames');
    const rubrics = getLodash(history, 'rubric.children');

    const semesterIid =
      getLodash(history, 'semester.iid') ||
      getLodash(this.props, 'formValues.semester', null);

    const scoreScale =
      getLodash(history, 'current_score.ss') ||
      getLodash(this.props, 'layoutOptionsProperties.scoreScale');

    return (
      <div className="row">
        {getLodash(history, 'semester.name') && (
          <div className="col-md-6">
            {`${t1('semester')}: ${getLodash(history, 'semester.name')}`}
          </div>
        )}
        {!getLodash(history, 'semester.name') && (
          <div className="col-md-4">{fieldNames.school_year}</div>
        )}
        {!getLodash(history, 'semester.name') && (
          <div className="col-md-4">{fieldNames.semester}</div>
        )}
        <div
          className={
            getLodash(history, 'semester.name') ? 'col-md-6' : 'col-md-4'
          }
        >
          {getLodash(history, 'course.name') &&
            `${t1('course')}: ${getLodash(history, 'course.name')}`}
        </div>
        {semesterIid && (
          <div className="table-border col-md-12">
            {scoreScale === scoreScaleTypes.pmd
              ? this.renderElementEditScoreByRubricWithScoreScalePMD(
                  rubrics,
                  semesterIid,
                  scoreScale,
                )
              : this.renderElementEditScoreByRubricWithScoreScaleNormal(
                  rubrics,
                  history,
                  semesterIid,
                  scoreScale,
                )}
          </div>
        )}
      </div>
    );
  };

  render() {
    const fieldNames = getLodash(this.props, 'groups.default.fieldNames');
    const creditTransfert = getLodash(
      this.props,
      'formValues.credit_transfert',
    );
    const subject = getLodash(this.props, 'layoutOptionsProperties.subject');

    if (
      !subject ||
      !Array.isArray(subject.histories) ||
      !subject.histories.length
    ) {
      return null;
    }

    const { histories } = subject;

    if (!fieldNames) {
      return null;
    }

    const scoreScale = getLodash(
      this.props,
      'layoutOptionsProperties.scoreScale',
    );
    const handleChangeFormValueByField = getLodash(
      this.props,
      'layoutOptionsProperties.handleChangeFormValueByField',
    );

    return (
      <div>
        <Paper style={this.stylePaper}>
          <div className="row">
            <h3 className="col-md-4">{`${t1('subject_code')}: ${
              subject.code
            }`}</h3>
            <h3 className="col-md-4">{`${t1('subject_name')}: ${
              subject.name
            }`}</h3>
            <h3 className="col-md-4">
              {typeof getLodash(subject, 'final_score.po') !== 'undefined' &&
                `${t1('final_score')}: ${getLodash(subject, 'final_score.po')}`}
            </h3>
          </div>
        </Paper>
        <Paper style={this.stylePaper}>
          <div className="col-md-12 m-t-20">
            <div style={{ maxWidth: 250 }}>{fieldNames.credit_transfert}</div>
          </div>
          <div className="col-md-12">
            {creditTransfert ? (
              <div>
                <div className="col-md-4">{fieldNames.school_year}</div>
                <div className="col-md-4">{fieldNames.semester}</div>
                <div className="col-md-4 m-t-30">
                  <h3>
                    {t1('score_final')}:{' '}
                    <Marking
                      style={{ display: 'inline-flex' }}
                      label={
                        <span>
                          {getLodash(this.props, 'formValues.po')}
                          <Icon icon="edit" />
                        </span>
                      }
                      anythingValue
                      scalePartIdAsValue
                      scoreScale={scoreScale}
                      onChange={(newValue) => {
                        handleChangeFormValueByField(
                          this.props.formid,
                          'po',
                          typeof newValue !== 'undefined' ? newValue : null,
                        );
                      }}
                    />
                  </h3>
                </div>
              </div>
            ) : (
              histories.map((history, index) => {
                const rubrics = getLodash(history, 'rubric.children');
                return !Array.isArray(rubrics) || !rubrics.length ? null : (
                  <Paper style={this.stylePaper} key={index}>
                    {this.renderElementEditScoreByRubric(history, index)}
                  </Paper>
                );
              })
            )}
          </div>
          <div className="col-md-12">{fieldNames.note}</div>
          <div className="col-md-12">{fieldNames.attachments}</div>
          <div className="text-center">{this.props.submitButton}</div>
        </Paper>
      </div>
    );
  }
}

export default LayoutFreestyle;
