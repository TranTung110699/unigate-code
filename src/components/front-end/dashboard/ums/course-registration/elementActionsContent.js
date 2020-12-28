/**
 * Created by hungvo on 02/01/18.
 */
import React, { Component } from 'react';
import lodashGet from 'lodash.get';
import { connect } from 'react-redux';
import DetailOnDialog from 'components/common/detail-on-dialog';
import SessionOfUserBeforeJoinViewer from 'components/timetable/session/SessionOfUserBeforeJoinViewer';
import sagaActions from 'actions/node/saga-creators';
import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';
import { getCurrentUnixTimestamp } from 'common/utils/Date';
import { t1 } from 'translate';
import timeCountDown from 'components/common/timeCountDown';
import apiUrls from 'api-endpoints';
import courseApiUrls from 'components/admin/course/endpoints';

const actionTypes = {
  WITHDRAW_DEADLINE: 'withdraw_deadline',
  START_REGISTER_COURSE: 'start_register_course',
  DEADLINE_REGISTER_COURSE: 'deadline_register_course',
};

class Actions extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  renderElementViewerTimeTable = () => (
    <DetailOnDialog
      renderPreview={({ showFull }) => (
        <div className="m-l-5 m-r-5" title={t1('time_table')}>
          <Icon icon="timetable" className="action" onClick={showFull} />
        </div>
      )}
      renderFull={() => (
        <SessionOfUserBeforeJoinViewer
          classIid={lodashGet(this.props, 'course.iid')}
        />
      )}
    />
  );

  renderTimeCountDown = () => {
    const { countDown, timeLeft, actionType } = this.props;
    if (countDown <= 0) {
      return null;
    }

    let title = t1('count_down');
    switch (actionType) {
      case actionTypes.START_REGISTER_COURSE: {
        title = t1('countdown_start_time_registration');
        break;
      }
      case actionTypes.DEADLINE_REGISTER_COURSE: {
        title = t1('countdown_time-out_registration');
        break;
      }
      case actionTypes.WITHDRAW_DEADLINE: {
        title = t1('countdown_time-out_withdraw_deadline');
        break;
      }
      default: {
        break;
      }
    }

    return (
      <div title={title}>
        <Icon icon="clock" className="text-muted" />
        {timeLeft}
      </div>
    );
  };

  handleRegistrationCourse = () => {
    const { dispatch, course } = this.props;
    const url = courseApiUrls.register_the_course;
    dispatch(
      sagaActions.getDataRequest(
        {
          url,
          executeOnSuccess: this.executeOnSuccess,
          executeOnFailure: (rep) => {
            this.setState({ error: rep && rep.message });
          },
          showMessage: true,
        },
        {
          course_iid: course && course.iid,
        },
      ),
    );
  };

  executeOnSuccess = () => {
    const { handleRefetchData } = this.props;
    if (typeof handleRefetchData === 'function') {
      handleRefetchData();
    }
  };

  handleWithdrawRegistrationCourse = () => {
    const { dispatch, course } = this.props;
    const url = courseApiUrls.withdraw_the_course;
    dispatch(
      sagaActions.getDataRequest(
        {
          url,
          executeOnSuccess: this.executeOnSuccess,
          executeOnFailure: (rep) => {
            this.setState({ error: rep && rep.message });
          },
          showMessage: true,
        },
        {
          course_iid: course && course.iid,
        },
      ),
    );
  };

  renderElementWithdrawRegistrationCourse = () => (
    <DetailOnDialog
      renderPreview={({ showFull }) => (
        <div
          className="m-l-5 m-r-5"
          title={t1('withdraw_registration_course ')}
        >
          <Icon icon="shopping_cart" className="action" onClick={showFull} />
        </div>
      )}
      renderFull={({ closeDialog }) => (
        <div className="text-center">
          <p>{t1('you_are_sure_to_withdraw_registration_course')}</p>
          <RaisedButton
            label={t1('withdraw_registration')}
            onClick={() => {
              this.handleWithdrawRegistrationCourse();
              closeDialog();
            }}
            raisedButton
          />
        </div>
      )}
    />
  );

  renderElementRegistrationCourse = () => {
    const { timeLeft, actionType, countDown } = this.props;

    if (!countDown) {
      return (
        <div className="m-l-5 m-r-5" title={t1('time_out_registration')}>
          <Icon icon="add_shopping_cart" />
        </div>
      );
    }

    const title = t1(
      actionType === actionTypes.DEADLINE_REGISTER_COURSE
        ? 'remaining_%s_time-out_registration'
        : 'remaining_%s_to_start_a_registration',
      [timeLeft],
    );

    return (
      <div className="m-l-5 m-r-5" title={title}>
        <Icon
          icon="add_shopping_cart"
          className={
            actionType === actionTypes.DEADLINE_REGISTER_COURSE ? 'action' : ''
          }
          onClick={() => {
            if (actionType === actionTypes.START_REGISTER_COURSE) {
              return null;
            }
            return this.handleRegistrationCourse();
          }}
        />
      </div>
    );
  };

  render() {
    const { course, actionType } = this.props;

    if (!course || !course) {
      return null;
    }

    return [
      <div style={{ display: 'inline-flex' }}>
        {/* {this.renderElementViewerTimeTable()} */}
        {actionType === actionTypes.WITHDRAW_DEADLINE &&
          this.renderElementWithdrawRegistrationCourse()}
        {actionType === actionTypes.START_REGISTER_COURSE &&
          this.renderElementRegistrationCourse()}
        {actionType === actionTypes.DEADLINE_REGISTER_COURSE &&
          this.renderElementRegistrationCourse()}
      </div>,
      this.renderTimeCountDown(),
    ];
  }
}

const getDuration = (props) => {
  const timeNow = getCurrentUnixTimestamp();
  switch (props.actionType) {
    case actionTypes.WITHDRAW_DEADLINE: {
      return (
        (lodashGet(props, 'course.withdraw_deadline') ||
          lodashGet(props, 'semester.withdraw_deadline') ||
          0) - timeNow
      );
    }
    case actionTypes.START_REGISTER_COURSE: {
      return (
        (lodashGet(props, 'course.start_reg_time') ||
          lodashGet(props, 'semester.start_reg_time') ||
          0) - timeNow
      );
    }
    default:
      return (
        (lodashGet(props, 'course.end_reg_time') ||
          lodashGet(props, 'semester.end_reg_time') ||
          0) - timeNow
      );
  }
};

const mapStateToProps = (state, props) => {
  const registed = lodashGet(props, 'course.registed');
  const timeNow = getCurrentUnixTimestamp();
  if (registed) {
    return {
      actionType: actionTypes.WITHDRAW_DEADLINE,
    };
  }
  return {
    actionType:
      (lodashGet(props, 'course.start_reg_time') ||
        lodashGet(props, 'semester.start_reg_time') ||
        0) > timeNow
        ? actionTypes.START_REGISTER_COURSE
        : actionTypes.DEADLINE_REGISTER_COURSE,
  };
};

export default connect(mapStateToProps)(
  timeCountDown((props) => ({
    duration: getDuration(props),
    reCountDown: (currentProps, prevProps) =>
      currentProps.actionType !== prevProps.actionType,
  }))(Actions),
);
