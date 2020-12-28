/**
 * Created by vohung on 12/08/2017.
 */
import React from 'react';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import { statuses as examStatus } from 'common/learn';
import Payment from 'components/learn/payment';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import sagaActions from 'actions/saga-creators';
import { examMethods } from 'configs/constants';
// import SelectExamShift from './select-exam-shift';
import Detail from './detail';

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
    const element = document.getElementById('exam-info');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
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
    let examDetailProps =
      mode === examStatus.FINISHED
        ? {
            mode: examStatus.FINISHED,
          }
        : {
            countdown: examShiftTimer.countDown > 0 && examShiftTimer.timeLeft,
            takeExamButton: (
              <RaisedButton
                primary
                label={buttonLabel}
                onClick={() => startExamAction()}
                type="submit"
              />
            ),
            startExamAction: startExamAction,
            mode: mode,
            examShiftTimer: examShiftTimer,
            timeOver: timeOver,
            canTakeExamWithFlexibleTime: this.canTakeExamWithFlexibleTime(
              examRound,
            ),
          };

    if (mode !== examStatus.FINISHED && course && course.locked) {
      return (
        <div className="container" style={{ height: '100vh' }}>
          <Payment
            paperId={paperId}
            courseIid={course && course.iid}
            executeOnSuccess={payExecuteOnSuccess}
          />
        </div>
      );
    }

    return (
      <div className="exam-info-wrapper" id="exam-info">
        <div className="quiz-content height-auto">
          <div className="info-start">
            <Detail
              course={course}
              contestName={contest.name}
              contestCode={contest.code}
              user={user}
              {...examDetailProps}
            />
          </div>
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
