/**
 * Created by vohung on 12/08/2017.
 */
import React from 'react';
import Icon from 'components/common/Icon';
import { t1, t3 } from 'translate';
import get from 'lodash.get';
import RaisedButton from 'components/common/mui/RaisedButton';
import { statuses as examStatus } from 'common/learn';
import Payment from 'components/learn/payment';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import sagaActions from 'actions/saga-creators';
import { examMethods } from 'configs/constants';
import { Link } from 'react-router-dom';

// import SelectExamShift from './select-exam-shift';
import EnterOTP from './enter-otp';
import AudioTester from './AudioTester';
import { timestampToDateString } from 'common/utils/Date';
const styles = {
  icon: {
    color: '#19191d',
  },
};

const stateKeyCountUp = 'exam-count-up';

class ExamInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCountUp: false,
      otpConfirmed: false,
    };
  }

  setCountUpForLateTime = (props) => {
    const { dispatch, course, differenceTs } = props;
    const timeNow = parseInt(Date.now() / 1000, 10) + differenceTs;
    const allowedLateDuration = course.allowed_late_duration;
    const timeStarted = course.start_date;

    if (timeNow >= timeStarted) {
      const countUp = timeStarted + allowedLateDuration * 60 - timeNow;
      if (timeNow < timeStarted + allowedLateDuration * 60) {
        dispatch(
          sagaActions.timeCountUp(
            timeNow - timeStarted,
            // Thêm đoạn (timeNow - timeStarted) để fix bug thời gian cho phép vào muộn là 10 phút, nhưng cứ quá một nửa thời gian
            // Là 5 phút thì đã báo vào muộn, do trong sagaActions.timeCountUp có check điều kiện timeNow - timeStarted < countUp + (timeNow - timeStarted)
            countUp + (timeNow - timeStarted),
            stateKeyCountUp,
          ),
        );
      }
      this.state.isCountUp = true;
    }
  };

  checkAndSetCountUpForLateTime = () => {
    if (
      this.props.examShiftTimer &&
      (!this.props.examShiftTimer.countDown ||
        parseInt(this.props.examShiftTimer.countDown, 10) <= 0) &&
      !this.state.isCountUp
    ) {
      this.setCountUpForLateTime(this.props);
    }
  };

  componentDidMount() {
    this.checkAndSetCountUpForLateTime();
  }

  componentDidUpdate() {
    this.checkAndSetCountUpForLateTime();
  }

  canTakeExamWithFlexibleTime = (examRound) =>
    examRound &&
    examRound.exam_method &&
    [
      examMethods.FLEXIBLE_TIME_FULL_DURATION,
      examMethods.FLEXIBLE_TIME_STRICT_DURATION,
    ].includes(examRound.exam_method);

  hasScore = (course) =>
    course &&
    course.latestTake &&
    typeof course.latestTake.score !== 'undefined' &&
    course.latestTake.score !== null &&
    typeof course.latestTake.total_score !== 'undefined' &&
    course.latestTake.total_score !== null;

  confirmOTPToJoinContestSuccessful = () => {
    this.setState({
      otpConfirmed: true,
    });
  };

  render() {
    const {
      course,
      examShiftTimer,
      mode,
      startExamAction,
      payExecuteOnSuccess,
      paperId,
      user,
      examRules,
      countUpTimer,
      contestCode,
      enableExamTemplate,
    } = this.props;
    const regulation = course.overview;
    const duration = course.duration;
    const timeOver =
      (this.state.isCountUp && (!countUpTimer || !countUpTimer.timeLeft)) ||
      course.start_date + course.allowed_late_duration * 60 <=
        parseInt(Date.now() / 1000, 10);
    const buttonLabel =
      mode === examStatus.INIT ? t1('take_exam') : t1('retake_now');

    const contest = course && course.contest;
    const examRound = course && course.exam_round_info;

    // mode === examStatus.STARTED && !examShiftTimer.countDown) || mode === examStatus.RETAKE) && (!course || !course.locked) && !timeOver
    // console.log({mode, timeOver});
    return (
      <div className="exam-info-wrapper">
        <div className="quiz-content text-center height-auto">
          {mode === examStatus.FINISHED ? (
            <Icon icon="result" className="icon" />
          ) : (
            <Icon icon="competition" className="icon competition" />
          )}

          <h3>{contest && contest.name}</h3>
          {mode === examStatus.FINISHED && (
            <div className="m-b-10">
              <h4>{t1('congratulations_you_have_finished_your_exam')}</h4>

              {course.latestExamOrder > 1 && (
                <div>
                  {t1(
                    'you_have_taken_this_test_%d_times',
                    course.latestExamOrder,
                  )}
                </div>
              )}
            </div>
          )}

          {[examStatus.FINISHED, examStatus.RETAKE].includes(mode) && (
            <div>
              {this.hasScore(course) ? (
                <p>
                  {mode === examStatus.RETAKE
                    ? `${t1('latest_take_score')}: `
                    : `${t1('your_score')}: `}
                  {course.latestTake.score} / {course.latestTake.total_score}
                </p>
              ) : (
                <p>
                  {course.nextExamOrder > 2 && (
                    <div>
                      {t1(
                        'you_have_taken_this_test_%d_times',
                        course.nextExamOrder - 1,
                      )}
                    </div>
                  )}
                  <div>
                    {t1('you_can_check_your_latest_result_in_this_link')}{' '}
                    <Link to={'/dashboard/taken-contests'}>
                      <RaisedButton label={t1('exam_results')} secondary />
                    </Link>
                  </div>
                </p>
              )}
            </div>
          )}

          {mode !== examStatus.FINISHED &&
            (examShiftTimer.countDown > 0 ||
              this.canTakeExamWithFlexibleTime(examRound) ||
              (countUpTimer && countUpTimer.countUp > 0)) && (
              <div className="info-start">
                {/*
                <span className="info-start--title">
                  <Icon icon="time" className="icon duration" />
                  {t1('duration')}
                </span>
                   */}
                <span className="col-md-12">
                  <span className="col-xs-6 info-start--label">
                    <p>{t1('your_exam_shift_starts_at')}:</p>
                    <p>{t1('test_will_last_in')}:</p>
                    {examShiftTimer.countDown > 0 && (
                      <p>{t1('time_can_start')}:</p>
                    )}
                    {countUpTimer &&
                      countUpTimer.timeLeft &&
                      !this.canTakeExamWithFlexibleTime(examRound) && (
                        <p>{t1('you_were_late_for')}:</p>
                      )}
                  </span>
                  <span className="col-xs-6  info-start--content text-bold">
                    <p>
                      {timestampToDateString(course.start_date, {
                        showTime: true,
                      })}
                    </p>
                    <p>{duration}</p>
                    {examShiftTimer.countDown > 0 && (
                      <p
                        className={
                          examShiftTimer.countDown < 10 ? 'highlights' : ''
                        }
                      >
                        {examShiftTimer.timeLeft}
                      </p>
                    )}
                    {countUpTimer &&
                      countUpTimer.timeLeft &&
                      !this.canTakeExamWithFlexibleTime(examRound) && (
                        <p className={'highlights'}>{countUpTimer.timeLeft}</p>
                      )}
                  </span>
                </span>
              </div>
            )}

          {/*
          {![examStatus.FINISHED, examStatus.RETAKE].includes(mode) &&
            !examShiftTimer.countDown &&
            timeOver &&
            !this.canTakeExamWithFlexibleTime(examRound) && (
              <SelectExamShift
                contestCode={contestCode}
                currentExamShift={course}
              />
            )}


             */}
          {mode !== examStatus.FINISHED &&
            (!timeOver || examShiftTimer.countDown > 0) && (
              <div>
                <span className="mention">
                  <Icon icon="mention" className="icon" style={styles.icon} />
                  {t1('exam_regulations')}
                </span>
                {regulation && (
                  <div
                    className="exam-regulations exam-regulations-content container"
                    dangerouslySetInnerHTML={{ __html: regulation }}
                  />
                )}
              </div>
            )}

          {mode !== examStatus.FINISHED && course && course.locked && (
            <div className="exam-info-wrapper__locked">
              <Payment
                paperId={paperId}
                courseIid={course && course.iid}
                executeOnSuccess={payExecuteOnSuccess}
              />
            </div>
          )}

          <div className="clearfix" />

          {((mode === examStatus.INIT && !examShiftTimer.countDown) ||
            mode === examStatus.RETAKE ||
            mode === examStatus.STARTED) &&
            (!course || !course.locked) &&
            (!timeOver || this.canTakeExamWithFlexibleTime(examRound)) && (
              <div className="m-b-20">
                {get(contest, 'require_otp') === 1 &&
                !this.state.otpConfirmed ? (
                  <div>
                    <hr />
                    <EnterOTP
                      confirmOTPToJoinContestSuccessful={
                        this.confirmOTPToJoinContestSuccessful
                      }
                      contest={contest}
                      user={user}
                    />
                  </div>
                ) : (
                  <RaisedButton
                    primary
                    label={buttonLabel}
                    onClick={() => startExamAction()}
                  />
                )}
              </div>
            )}
          {mode !== examStatus.FINISHED && (
            <div>
              <hr />
              <AudioTester />
            </div>
          )}
          {examRules && (
            <div className="exam-rules">
              <h3>{t1('exam_rules')}</h3>
              {examRules.map((rule) => (
                <div key={rule}>- {rule}.</div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  (state) => state.user && state.user.info,
  (state) =>
    state.domainInfo &&
    state.domainInfo.conf &&
    state.domainInfo.conf.exam_rules,
  (state) => state.timer,
  (state) =>
    state.domainInfo &&
    state.domainInfo.conf &&
    state.domainInfo.conf.enable_exam_template,
  (user, examRules, timer, enableExamTemplate) => ({
    user,
    examRules,
    countUpTimer: timer[stateKeyCountUp],
    enableExamTemplate,
  }),
);

export default connect(mapStateToProps)(ExamInfo);
