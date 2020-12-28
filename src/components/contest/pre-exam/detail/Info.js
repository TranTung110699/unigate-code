import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import { t1 } from 'translate';
import { timestampToDateTimeString } from 'common/utils/Date';
import './style.scss';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import Rules from '../rules';
import Testing from '../browser-checking';
import { statuses as examStatus } from 'common/learn';
import { secondsToTimeString } from '../../../../common/utils/Date';

const Info = (props) => {
  const { course, examRules, mode } = props;
  const { contest, exam_round_info } = course;

  return (
    <Row
      gutter={32}
      className="container-fluid contest-information-container m-r-0"
    >
      <Col md={12} xs={24} className="m-t-10">
        <Card size="small">
          <table>
            <tr>
              <th colSpan="2" className="contest-information-block-title">
                {t1('contest_information')}
              </th>
            </tr>
            <tr>
              <td>{t1('your_exam_shift')}</td>
              <td className="desc">{course.name}</td>
            </tr>
            <tr>
              <td>{t1('date_time')}</td>
              <td className="desc">
                <div>{timestampToDateTimeString(contest.start_time)}</div>
                <div>{timestampToDateTimeString(contest.end_time)}</div>
              </td>
            </tr>
            <tr>
              <th colSpan="2" className="contest-information-block-title">
                {t1('your_exam')}
              </th>
            </tr>
            <tr>
              <td>{t1('exam_name')}</td>
              <td className="desc">{exam_round_info.name}</td>
            </tr>
            <tr>
              <td>{t1('duration')}</td>
              <td className="desc">{exam_round_info.duration}</td>
            </tr>
            <tr>
              <td>{t1('structure')}</td>
              <td className="desc">
                <div>{t1('%s_parts', [exam_round_info.exam_scos_count])}</div>
                <div />
              </td>
            </tr>
            <tr>
              <td>{t1('passing_score')}</td>
              <td className="desc">
                {t1('%s/%s_points', [
                  exam_round_info.min_score,
                  exam_round_info.total_score,
                ])}
              </td>
            </tr>
            <tr>
              <td>{t1('can_do')}</td>
              <td className="desc">
                {t1('%s_times', [exam_round_info.options.can_do])}
              </td>
            </tr>
            {exam_round_info.options
              .limit_time_that_user_can_spend_on_each_question ? (
              <tr>
                <td>{t1('duration_per_question_(mm:ss)')}</td>
                <td className="desc">
                  {secondsToTimeString(
                    exam_round_info.options
                      .limit_time_that_user_can_spend_on_each_question,
                  )}
                </td>
              </tr>
            ) : null}
            <tr>
              <th colSpan="2" className="contest-information-block-title">
                {t1('additional_information')}
              </th>
            </tr>
            <tr>
              <td>{t1('marking')}</td>
              <td>
                {t1(
                  exam_round_info.options &&
                    exam_round_info.options.instant_marking_on_finish
                    ? 'instant_marking_on_finish'
                    : 'manual',
                )}
              </td>
            </tr>
            {/*<tr>*/}
            {/*  <td>{t1('support')}</td>*/}
            {/*  <td>*/}
            {/*    <div>Mr. BinhPT -</div>*/}
            {/*    <div>Mr. HoangTV -</div>*/}
            {/*  </td>*/}
            {/*</tr>*/}
          </table>
        </Card>
      </Col>
      <Col md={12} xs={24} className="m-t-10">
        <Card size="small">
          {!(mode === examStatus.FINISHED) ? (
            <div>
              <Rules examRules={examRules} />
              <Testing />
            </div>
          ) : null}
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = createSelector(
  (state) =>
    state.domainInfo &&
    state.domainInfo.conf &&
    state.domainInfo.conf.exam_rules,
  (state) => state.domainInfo && state.domainInfo.conf,
  (examRules, conf) => ({
    examRules,
    conf,
  }),
);

export default connect(mapStateToProps)(Info);
