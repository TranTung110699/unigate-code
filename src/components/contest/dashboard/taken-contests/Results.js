import React, { PureComponent } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { t, t1, t3 } from 'translate';
import { secondsToTimeString, timestampToDateString } from 'common/utils/Date';
import lGet from 'lodash.get';
import ComponentWithoutContent from 'components/common/utils/ComponentWithoutContent';
import { configTableHeader } from './configs';
import Links from 'routes/links';
import Icon from 'components/common/Icon';
import { Link } from 'react-router-dom';
import './stylesheet.scss';

class Results extends PureComponent {
  renderActionCell(examRound) {
    const canViewPaper = parseInt(
      lGet(examRound, 'exam_round_info.contestants_can_preview_take'),
    );

    if (canViewPaper) {
      return (
        <Link
          to={Links.previewTake(examRound.id)}
          className="btn btn-sm"
          target="_blank"
          title={t1('preview_contestant_take')}
        >
          <Icon icon="preview" />
        </Link>
      );
    }
    return null;
  }

  renderScoreCell(examRound, contest) {
    const shouldShowScore = parseInt(
      lGet(examRound, 'exam_round_info.should_show_score'),
    );

    if (!shouldShowScore) {
      // const startTime = lGet(
      //   examRound,
      //   'exam_round_info.publish_score_start_time',
      //   '',
      // );
      // const convertedStartTime = timestampToDateString(startTime);
      // const endTime = lGet(
      //   examRound,
      //   'exam_round_info.publish_score_end_time',
      //   '',
      // );
      // const convertedEndTime = timestampToDateString(endTime);

      return t('your_result_will_be_revealed_later');
    } else if (!examRound.score && !examRound.total_score) {
      return '';
    }

    let ret;
    if (examRound && examRound.exam_format === 'toeic') {
      let borderBottomStyle = { borderBottom: '1px solid #dfdfdf' };
      ret = (
        <div>
          <div style={borderBottomStyle}>
            {t1('score')}: <b>{examRound.score}</b>
          </div>
          <div style={borderBottomStyle}>
            <b>{t1('listening')}</b>
            <br />
            {t1('number_of_correct_answers')}:{' '}
            <b>{lGet(examRound.score_detail[0], 'weighted')}</b>
            <br />
            {t1('score')}: <b>{lGet(examRound.score_detail[0], 'score')}</b>
          </div>
          <div>
            <b>{t1('reading')}</b>
            <br />
            {t1('number_of_correct_answers')}:{' '}
            <b>{lGet(examRound.score_detail[1], 'weighted') || 0}</b>
            <br />
            {t1('score')}:{' '}
            <b>{lGet(examRound.score_detail[1], 'score') || 0}</b>
          </div>
        </div>
      );
    } else {
      ret = `${examRound.score}/${examRound.total_score}`;
    }

    return ret;
  }

  renderSpentTime = (d, h, m, s) => {
    if (parseInt(d, 10))
      return t1('%s_day_%s_hour_%s_min_%s_second', [d, h, m, s]);
    if (parseInt(h, 10)) return t1('%s_hour_%s_min_%s_second', [h, m, s]);
    if (parseInt(m, 10)) return t1('%s_min_%s_second', [m, s]);
    if (parseInt(s, 10)) return t1('%s_second', [s]);
    return null;
  };

  render() {
    const thCols = configTableHeader();
    const { items, user } = this.props;

    return (
      <div className="exam-result-wrapper">
        <div className="table-result">
          <Table>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow>
                {Array.isArray(items) && items.length > 0 ? (
                  thCols &&
                  thCols.constructor === Array &&
                  thCols.length > 0 &&
                  thCols.map((thCol) => (
                    <TableHeaderColumn key={thCol.id}>
                      {thCol && thCol.label}
                    </TableHeaderColumn>
                  ))
                ) : (
                  <ComponentWithoutContent content="taken_contests" />
                )}
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              showRowHover={false}
              stripedRows={false}
            >
              {Array.isArray(items) &&
                items.map((contestResult) => {
                  if (
                    !Array.isArray(contestResult && contestResult.exam_rounds)
                  ) {
                    return null;
                  }

                  return contestResult.exam_rounds.map(
                    (examRound, indexExamRound) => (
                      <TableRow
                        key={`${contestResult.code}-${
                          examRound.id
                        }-${indexExamRound}`}
                      >
                        {indexExamRound === 0 && (
                          <TableRowColumn
                            className="contest-name"
                            rowSpan={contestResult.exam_rounds.length}
                          >
                            {contestResult && contestResult.name}
                          </TableRowColumn>
                        )}
                        <TableRowColumn className="exam-round">
                          {lGet(examRound, 'exam_round_info.name', '')}
                        </TableRowColumn>
                        <TableRowColumn className="exam-shift-date">
                          {timestampToDateString(
                            lGet(examRound, 'exam_shift.start_date', ''),
                          )}
                          <br />
                          {timestampToDateString(
                            lGet(examRound, 'exam_shift.end_date', ''),
                          )}
                        </TableRowColumn>
                        <TableRowColumn className="exam-submitted-time">
                          {timestampToDateString(
                            lGet(examRound, 'finished_time'),
                            { showTime: true },
                          )}
                        </TableRowColumn>
                        <TableRowColumn className="spent-taken">
                          {examRound &&
                            examRound.spent_time > 0 &&
                            secondsToTimeString(
                              examRound.spent_time,
                              true,
                              this.renderSpentTime,
                            )}
                        </TableRowColumn>
                        <TableRowColumn className="exam-order">
                          {lGet(examRound, 'exam.exam_order')}
                        </TableRowColumn>
                        <TableRowColumn className="score">
                          {this.renderScoreCell(examRound, contestResult)}
                        </TableRowColumn>
                        <TableRowColumn className="action">
                          {this.renderActionCell(examRound)}
                        </TableRowColumn>
                      </TableRow>
                    ),
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Results;
