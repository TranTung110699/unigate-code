import React, { Component } from 'react';
import { t1 } from 'translate';
import { connect } from 'react-redux';

import actions from 'actions/node/creators';
import CurrentClassesLayout from './current-classes/Layout';
import CurrentRoomsLayout from './current-rooms/Layout';
import CurrentUsersLayout from './current-users/Layout';
import './HeadmasterOverviewContent.scss';

const optionsProperties = {
  modal: true,
  handleClose: true,
  width: '60%',
};

class HeadMasterOverviewContent extends Component {
  cssClass = 'school-dashboard-overview-info-wrapper';

  handleOpenDialogViewCurrentClassesInfo = (activeClasses) => {
    const { dispatch } = this.props;
    const contentDialog = (
      <CurrentClassesLayout activeClasses={activeClasses} />
    );

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  handleOpenDialogViewCurrentRoomsInfo = (activeRooms) => {
    const { dispatch } = this.props;
    const contentDialog = <CurrentRoomsLayout activeRooms={activeRooms} />;

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  handleOpenDialogViewCurrentUsersInfo = (attendingUsers) => {
    const { dispatch } = this.props;
    const contentDialog = (
      <CurrentUsersLayout attendingUsers={attendingUsers} />
    );

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { schoolDashboardOverviewInfo, hideTitle } = this.props;

    return (
      <div className={`${this.cssClass}`}>
        {schoolDashboardOverviewInfo && (
          <div className={`${this.cssClass}__statistics`}>
            <div className={`${this.cssClass}__statistics-box`}>
              {!hideTitle && (
                <h2 className={`${this.cssClass}__statistics-title`}>
                  {t1('school_dashboard_overview_statistics')}
                </h2>
              )}
              <div className={`${this.cssClass}__statistic`}>
                <div
                  className={`${this.cssClass}__statistic-number
                    ${this.cssClass}__statistic-number-box
                    ${this.cssClass}__statistic-number-box--active`}
                >
                  {schoolDashboardOverviewInfo.totalActiveClasses}
                </div>
                <span
                  className={`${this.cssClass}__statistic-text`}
                  onClick={() =>
                    this.handleOpenDialogViewCurrentClassesInfo(true)
                  }
                >
                  {t1('active_classes')}
                </span>
              </div>
              <div className={`${this.cssClass}__statistic`}>
                <div
                  className={`${this.cssClass}__statistic-number
                    ${this.cssClass}__statistic-number-box
                    ${this.cssClass}__statistic-number-box--inactive`}
                >
                  {schoolDashboardOverviewInfo.totalInactiveClasses}
                </div>
                <span
                  className={`${this.cssClass}__statistic-text`}
                  onClick={() =>
                    this.handleOpenDialogViewCurrentClassesInfo(false)
                  }
                >
                  {t1('inactive_classes')}
                </span>
              </div>
              <div className={`${this.cssClass}__statistic`}>
                <div
                  className={`${this.cssClass}__statistic-number
                    ${this.cssClass}__statistic-number-box
                    ${this.cssClass}__statistic-number-box--active`}
                >
                  {schoolDashboardOverviewInfo.totalAttendingStudents}
                </div>
                <span
                  className={`${this.cssClass}__statistic-text`}
                  onClick={() =>
                    this.handleOpenDialogViewCurrentUsersInfo(true)
                  }
                >
                  {t1('attending_students')}
                </span>
              </div>
              <div className={`${this.cssClass}__statistic`}>
                <div
                  className={`${this.cssClass}__statistic-number
                    ${this.cssClass}__statistic-number-box
                    ${this.cssClass}__statistic-number-box--inactive`}
                >
                  {schoolDashboardOverviewInfo.totalNotAttendingStudents}
                </div>
                <span
                  className={`${this.cssClass}__statistic-text`}
                  onClick={() =>
                    this.handleOpenDialogViewCurrentUsersInfo(false)
                  }
                >
                  {t1('not_attending_students')}
                </span>
              </div>
              <div className={`${this.cssClass}__statistic`}>
                <div
                  className={`${this.cssClass}__statistic-number
                    ${this.cssClass}__statistic-number-box
                    ${this.cssClass}__statistic-number-box--active`}
                >
                  {schoolDashboardOverviewInfo.totalActiveClassrooms}
                </div>
                <span
                  className={`${this.cssClass}__statistic-text`}
                  onClick={() =>
                    this.handleOpenDialogViewCurrentRoomsInfo(true)
                  }
                >
                  {t1('active_classrooms')}
                </span>
              </div>
              <div className={`${this.cssClass}__statistic`}>
                <div
                  className={`${this.cssClass}__statistic-number
                    ${this.cssClass}__statistic-number-box
                    ${this.cssClass}__statistic-number-box--inactive`}
                >
                  {schoolDashboardOverviewInfo.totalInactiveClassrooms}
                </div>
                <span
                  className={`${this.cssClass}__statistic-text`}
                  onClick={() =>
                    this.handleOpenDialogViewCurrentRoomsInfo(false)
                  }
                >
                  {t1('inactive_classrooms')}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect()(HeadMasterOverviewContent);
