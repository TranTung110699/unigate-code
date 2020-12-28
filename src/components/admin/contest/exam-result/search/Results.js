import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues, reduxForm } from 'redux-form';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Icon from 'components/common/Icon';
import Links from 'routes/links';
import {
  TableAsReduxFormField as Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';
import SuccessAlert from 'components/common/SuccessAlert';
import Warning from 'components/common/Warning';
import { timestampToDateString } from 'common/utils/Date';
import lodashGet from 'lodash.get';
import { takeOverview } from 'components/admin/contest/routes';

class ExamResults extends Component {
  render() {
    const { items, formid, userIdsToChangeExamRound, contestIid } = this.props;
    const itemList = items && items.filter((item) => !!item);
    if (!itemList) {
      return null;
    }

    const checkKey = 'user_id';
    const keysSave = ['id'];

    const isToeic = Boolean(
      (items || []).find((item) => {
        return item.exam_format === 'toeic';
      }),
    );

    const toeicPartConfig = [
      {
        title: t1('listening'),
      },
      {
        title: t1('reading'),
      },
    ];

    let parts = lodashGet(items[0], 'score_detail');
    if (!parts) parts = lodashGet(items[0], 'score_detail'); //items[1]['score_detail'];

    if (!parts) parts = [];

    return (
      <div className="table-result">
        <Table
          name="user_ids"
          itemList={itemList}
          checkKey={checkKey}
          keysSave={keysSave}
          multiSelectable
        >
          <TableHeader>
            {[
              <TableRow key={1} rowCheckBoxSpan={isToeic ? 2 : 1}>
                <TableHeaderColumn rowSpan={isToeic ? 2 : 1}>
                  {t1('user_code')}
                </TableHeaderColumn>
                <TableHeaderColumn rowSpan={isToeic ? 2 : 1}>
                  {t1('user_mail')}
                </TableHeaderColumn>

                <TableHeaderColumn rowSpan={isToeic ? 2 : 1}>
                  {t1('full_name')}
                </TableHeaderColumn>
                <TableHeaderColumn rowSpan={isToeic ? 2 : 1}>
                  {t1('job_position')}
                </TableHeaderColumn>

                <TableHeaderColumn rowSpan={isToeic ? 2 : 1}>
                  {t1('user_organization')}
                </TableHeaderColumn>
                <TableHeaderColumn rowSpan={isToeic ? 2 : 1}>
                  {t1('user_department')}
                </TableHeaderColumn>

                <TableHeaderColumn rowSpan={isToeic ? 2 : 1}>
                  {t1('submitted_time')}
                </TableHeaderColumn>
                {parts &&
                  Array.isArray(parts) &&
                  parts.length > 1 &&
                  parts.map((part) => (
                    <TableHeaderColumn rowSpan={1}>
                      {part.pname}
                    </TableHeaderColumn>
                  ))}

                {isToeic
                  ? toeicPartConfig.map(({ title }, index) => (
                      <TableHeaderColumn key={index} colSpan={2}>
                        {title}
                      </TableHeaderColumn>
                    ))
                  : null}
                <TableHeaderColumn rowSpan={isToeic ? 2 : 1}>
                  {t1('score')}
                </TableHeaderColumn>
                <TableHeaderColumn rowSpan={isToeic ? 2 : 1}>
                  {t1('parts_passed')}
                </TableHeaderColumn>
                <TableHeaderColumn rowSpan={isToeic ? 2 : 1}>
                  {t1('passed')}
                </TableHeaderColumn>
                <TableHeaderColumn rowSpan={isToeic ? 2 : 1}>
                  {t1('spent_time')} (mm:ss)
                </TableHeaderColumn>
                <TableHeaderColumn rowSpan={isToeic ? 2 : 1}>
                  {t1('exam_order')}
                </TableHeaderColumn>
                <TableHeaderColumn rowSpan={isToeic ? 2 : 1}>
                  {t1('nr_of_answers')}
                </TableHeaderColumn>
                <TableHeaderColumn rowSpan={isToeic ? 2 : 1}>
                  {t1('nr_of_violations')}
                </TableHeaderColumn>
                <TableHeaderColumn rowSpan={isToeic ? 2 : 1}>
                  {t1('manual_marking_status')}
                </TableHeaderColumn>
                <TableHeaderColumn rowSpan={isToeic ? 2 : 1}>
                  {t1('take_details')}
                </TableHeaderColumn>
                <TableHeaderColumn rowSpan={isToeic ? 2 : 1}>
                  {t1('preview')}
                </TableHeaderColumn>
              </TableRow>,
              isToeic ? (
                <TableRow key={2} rowCheckBoxSpan={0}>
                  {toeicPartConfig
                    .map((p, index) => [
                      <TableHeaderColumn key={`${index}_weighted`}>
                        {t1('number_of_correct_answers')}
                      </TableHeaderColumn>,
                      <TableHeaderColumn key={`${index}_score`}>
                        {t1('score')}
                      </TableHeaderColumn>,
                    ])
                    .flat()}
                </TableRow>
              ) : null,
            ].filter((h) => h !== null)}
          </TableHeader>

          <TableBody deselectOnClickaway={false} showRowHover stripedRows>
            {items &&
              items.map((item) => {
                const id = item.id;
                const code = lodashGet(item, 'user.code');
                const name = lodashGet(item, 'user.name');
                const positionsTitle = lodashGet(item, 'user.positions_title');
                const orgTitle = lodashGet(
                  item,
                  'user.user_organizations_name',
                );
                const phongbanTitle = lodashGet(
                  item,
                  'user.user_phongbans_name',
                );

                const ts = item.finished_time
                  ? timestampToDateString(item.finished_time, {
                      showTime: true,
                    })
                  : '';
                const score = item.score;
                const totalScore = item.total_score;
                const spentTime = item.spent_time;

                return (
                  <TableRow key={id}>
                    <TableRowColumn title={code}>{code}</TableRowColumn>
                    <TableRowColumn title={lodashGet(item, 'user.mail')}>
                      {lodashGet(item, 'user.mail')}
                    </TableRowColumn>
                    <TableRowColumn title={name}>{name}</TableRowColumn>
                    <TableRowColumn title={positionsTitle}>
                      {positionsTitle}
                    </TableRowColumn>
                    <TableRowColumn title={orgTitle}>{orgTitle}</TableRowColumn>
                    <TableRowColumn title={phongbanTitle}>
                      {phongbanTitle}
                    </TableRowColumn>
                    <TableRowColumn title={ts}>{ts}</TableRowColumn>
                    {item &&
                      item.score_detail &&
                      item.score_detail.length > 1 &&
                      item.score_detail.map((part) => (
                        <TableRowColumn rowSpan={1}>
                          {part.weighted}
                        </TableRowColumn>
                      ))}

                    {isToeic
                      ? toeicPartConfig
                          .map((p, index) => {
                            return [
                              <TableRowColumn
                                key={`${index}_weighted`}
                                title={lodashGet(item, [
                                  'score_detail',
                                  index,
                                  'weighted',
                                ])}
                              >
                                <strong>
                                  {lodashGet(item, [
                                    'score_detail',
                                    index,
                                    'weighted',
                                  ])}
                                </strong>
                              </TableRowColumn>,
                              <TableRowColumn
                                key={`${index}_score`}
                                title={lodashGet(item, [
                                  'score_detail',
                                  index,
                                  'score',
                                ])}
                              >
                                <strong>
                                  {lodashGet(item, [
                                    'score_detail',
                                    index,
                                    'score',
                                  ])}
                                </strong>
                              </TableRowColumn>,
                            ];
                          })
                          .flat()
                      : null}
                    <TableRowColumn title={score}>
                      <strong>{score}</strong> / {totalScore}
                    </TableRowColumn>

                    <TableRowColumn title={item.exam_result_point_parts_status}>
                      {item.exam_result_point_parts_status === 'passed' ? (
                        <SuccessAlert>{t1('passed')}</SuccessAlert>
                      ) : (
                        <Warning>{t1('failed')}</Warning>
                      )}
                    </TableRowColumn>

                    <TableRowColumn title={item.exam_result_status}>
                      {item.exam_result_status === 'passed' ? (
                        <SuccessAlert>{t1('passed')}</SuccessAlert>
                      ) : (
                        <Warning>{t1('failed')}</Warning>
                      )}
                    </TableRowColumn>

                    <TableRowColumn title={spentTime}>
                      {spentTime}
                    </TableRowColumn>
                    <TableRowColumn title={ts}>
                      {item.exam.exam_order}
                    </TableRowColumn>
                    <TableRowColumn title={item.number_of_answers}>
                      {item.number_of_answers}
                    </TableRowColumn>
                    <TableRowColumn title={item.violation_total}>
                      {item.violation_total}
                    </TableRowColumn>
                    <TableRowColumn title={item.violation_total}>
                      {item.manual_marking_status ? (
                        <SuccessAlert inline>{t1('finished')}</SuccessAlert>
                      ) : (
                        t1('not_marked')
                      )}
                    </TableRowColumn>

                    <TableRowColumn>
                      <Link to={takeOverview(contestIid, item.id)}>
                        <Icon icon="preview" />
                      </Link>
                      {/*
                          <button
                            onClick={() => {
                              this.viewTakeInDialog(item.id);
                            }}
                          >
                            <Icon icon="preview" />
                          </button>

                         */}
                    </TableRowColumn>

                    <TableRowColumn>
                      {item && item.exam_shift && item.exam && (
                        <Link
                          to={Links.previewTake(
                            item.id,
                            item.iid,
                            item.exam_shift.iid,
                            {
                              ...item.exam,
                              exam_order: item.exam.exam_order,
                            },
                            item.user.iid,
                            item.syllabus_iid,
                          )}
                          className="btn btn-sm"
                          target="_blank"
                          title={t1('preview_contestant_take')}
                        >
                          <Icon icon="preview" /> {t1('preview')}
                        </Link>
                      )}
                    </TableRowColumn>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

ExamResults.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

ExamResults.defaultProps = {
  items: [],
};

function mapStateToProps(state) {
  const examResultSearchResultValues = getFormValues(
    'exam_result_search_result',
  )(state);

  const userIdsToChangeExamRound =
    examResultSearchResultValues && examResultSearchResultValues.user_ids
      ? examResultSearchResultValues.user_ids
      : [];

  return {
    userIdsToChangeExamRound,
  };
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'exam_result_search_result',
  })(withRouter(ExamResults)),
);
