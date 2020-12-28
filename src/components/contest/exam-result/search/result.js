import React from 'react';
import { t1 } from 'translate';
import { secondsToTimeString } from 'common/utils/Date';
import Button from 'antd/lib/button';
import Links from 'routes/links';
import { Link } from 'react-router-dom';
import lGet from 'lodash.get';
import AntResult from 'antd/lib/result';
import styled from 'styled-components';

class Result extends React.Component {
  renderSpentTime = (d, h, m, s) => {
    if (parseInt(d, 10))
      return t1('%s_day_%s_hour_%s_min_%s_second', [d, h, m, s]);
    if (parseInt(h, 10)) return t1('%s_hour_%s_min_%s_second', [h, m, s]);
    if (parseInt(m, 10)) return t1('%s_min_%s_second', [m, s]);
    if (parseInt(s, 10)) return t1('%s_second', [s]);
    return null;
  };

  renderIfFinish(course) {
    const { canRetake } = this.props;
    const shouldShowScore = parseInt(
      lGet(course, 'exam_round_info.should_show_score'),
    );

    const ReloadButton = styled(Button)`
      span {
        color: #fff !important;
      }
    `;

    if (!shouldShowScore) {
      // const startTime = lGet(
      //   course,
      //   'exam_round_info.publish_score_start_time',
      //   '',
      // );
      // const convertedStartTime = timestampToDateString(startTime);
      // const endTime = lGet(
      //   course,
      //   'exam_round_info.publish_score_end_time',
      //   '',
      // );
      // const convertedEndTime = timestampToDateString(endTime);

      return t1('your_result_will_be_revealed_later');
    } else if (!course.score && !course.total_score) {
      return (
        <AntResult
          status="success"
          title={t1('congratulations_you_have_finished_your_exam')}
          subTitle={t1('your_result_will_be_revealed_later')}
          extra={[
            ...(canRetake
              ? [
                  <ReloadButton
                    type="primary"
                    onClick={() => window.location.reload()}
                    key="retake"
                  >
                    {t1('retake')}
                  </ReloadButton>,
                ]
              : []),
            <Button key="home">
              <Link to="/">{t1('home')}</Link>
            </Button>,
          ]}
        />
      );
    }
  }

  render() {
    let { items, examRoundIid } = this.props;

    let examRounds;
    if (items[0]) examRounds = items[0].exam_rounds;
    if (examRounds) {
      examRounds = examRounds.filter((exam_round) => {
        return exam_round.exam_round_iid === examRoundIid;
      });
    }

    if (examRounds && examRounds.length) {
      return examRounds.map((examRound) => {
        return (
          <table>
            <tr>
              <th colSpan="2">{t1('summary')}</th>
            </tr>
            <tr>
              <td>{t1('spent_duration')}</td>
              <td>
                {examRound.spent_time > 0 &&
                  secondsToTimeString(
                    examRound.spent_time,
                    true,
                    this.renderSpentTime,
                  )}
              </td>
            </tr>
            <tr>
              <td>{t1('number_of_answer')}</td>
              <td />
            </tr>
            <tr>
              <td>{t1('number_of_violation')}</td>
              <td />
            </tr>
            <tr>
              <td>{t1('take_order')}</td>
              <td />
            </tr>
            <tr>
              <td colSpan="2" />
            </tr>
            <tr>
              <th>{t1('marking')}</th>
              <td>
                <h2 />
              </td>
            </tr>
            <tr>
              <td>{t1('total_mark')}</td>
              <td />
            </tr>
            {
              <>
                <tr>
                  <td />
                  <td />
                </tr>
              </>
            }
            <tr>
              <td>{t1('review')}</td>
              <td>
                <Button type="dashed" icon="eye">
                  <Link
                    to={Links.previewTake(
                      null, // TODO: put take id
                      examRound.exam_shift.iid,
                      {
                        ...examRound.exam,
                        exam_order: examRound.exam.exam_order,
                      },
                      this.props.user.iid,
                      this.props.syllabusIid,
                    )}
                    target="_blank"
                    title={t1('preview_contestant_take')}
                    className="text-secondary"
                  >
                    &nbsp;{t1('click_to_review')}
                  </Link>
                </Button>
              </td>
            </tr>
          </table>
        );
      });
    }
    return this.renderIfFinish(this.props.course);
  }
}

export default Result;
