import React from 'react';
import Html from 'components/common/html';
import { connect } from 'react-redux';
import { t, t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import actions from 'actions/node/creators';
import EnterOTP from '../enter-otp';
import { statuses as examStatus } from 'common/learn';
import get from 'lodash.get';
import Alert from 'antd/lib/alert';
import { Link } from 'react-router-dom';
import { examResult } from '../../routes';
import Card from 'antd/lib/card';
import Col from 'antd/lib/grid';

class Title extends React.Component {
  state = {
    otpConfirmed: false,
  };

  confirmOTPToJoinContestSuccessful = () => {
    this.setState({
      otpConfirmed: true,
    });
    // this.props.startExamAction();
  };

  openOTPDialog = () => {
    const { dispatch, user, course, startExamAction } = this.props;

    const contentDialog = (
      <EnterOTP
        confirmOTPToJoinContestSuccessful={
          this.confirmOTPToJoinContestSuccessful
        }
        contest={course.contest}
        user={user}
        startExamAction={startExamAction}
      />
    );
    const optionsProperties = {
      handleClose: true,
      modal: true,
      title: t1('OTP'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  hasScore = (course) =>
    course &&
    course.latestTake &&
    typeof course.latestTake.score !== 'undefined' &&
    course.latestTake.score !== null &&
    typeof course.latestTake.total_score !== 'undefined' &&
    course.latestTake.total_score !== null;

  render() {
    const {
      course,
      countdown,
      startButtonLabel,
      takeExamButton,
      mode,
      examShiftTimer,
      timeOver,
      canTakeExamWithFlexibleTime,
    } = this.props;

    const { contest } = course;

    const enterOTPAfterCountDown =
      ((mode === examStatus.INIT && !examShiftTimer.countDown) ||
        mode === examStatus.RETAKE ||
        mode === examStatus.STARTED) &&
      (!course || !course.locked) &&
      (!timeOver || canTakeExamWithFlexibleTime)
        ? get(contest, 'require_otp') === 1 && !this.state.otpConfirmed
        : undefined;

    return (
      <div className="text-center">
        <h1 className="m-b-10">
          {course.contest.name} ({get(course, 'contest.code')})
        </h1>

        <div>
          <Html content={get(course, 'contest.description')} />
        </div>

        {[examStatus.RETAKE].includes(mode) && (
          <div className="row">
            <div className="m-t-10 col-md-4 col-md-offset-4 text-left">
              {this.hasScore(course) ? (
                <p>
                  {mode === examStatus.RETAKE
                    ? `${t1('latest_take_score')}: `
                    : `${t1('your_score')}: `}
                  {course.latestTake.score} / {course.latestTake.total_score}
                </p>
              ) : (
                <p>
                  <Alert
                    message={
                      course.nextExamOrder > 2
                        ? t1(
                            'you_have_taken_this_test_%d_times',
                            course.nextExamOrder - 1,
                          )
                        : ''
                    }
                    description={
                      <>
                        {t1('you_can_check_your_latest_result_in')}{' '}
                        <Link
                          to={examResult(
                            this.props.contestCode,
                            course.iid,
                            course.syllabus,
                            course.latestExamOrder,
                          )}
                        >
                          <u>{t('this_link')}</u>
                        </Link>
                      </>
                    }
                    type="info"
                    showIcon
                  />
                  <div />
                </p>
              )}
            </div>
          </div>
        )}
        {!(mode === examStatus.FINISHED) &&
          (countdown ? (
            <div
              style={{
                color: '#CC0000',
                fontSize: 32,
                fontWeight: 'bold',
              }}
            >
              {countdown}
            </div>
          ) : enterOTPAfterCountDown !== undefined ? (
            <div>
              {enterOTPAfterCountDown ? (
                <RaisedButton
                  primary
                  label={t1(startButtonLabel || 'take')}
                  type="submit"
                  onClick={this.openOTPDialog}
                />
              ) : (
                takeExamButton
              )}
            </div>
          ) : this.state.otpConfirmed ? (
            takeExamButton
          ) : (
            ''
          ))}
      </div>
    );
  }
}

export default connect()(Title);
