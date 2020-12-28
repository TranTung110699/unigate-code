/* eslint-disable no-undef,react/prop-types,camelcase,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BigCalendar from 'components/common/calendar';
import { createSelector } from 'reselect';
import get from 'lodash.get';

import Perm from 'common/utils/Perm';
import Links from 'routes/links';
import apiUrls from 'api-endpoints';
import { layouts, schoolTypes } from 'configs/constants';
import { getThemeConfig } from 'utils/selectors';
import action from 'actions/event';
import sagaActions from 'actions/node/saga-creators';
import { DefinedUrlParams } from 'routes/links/common';

import ToolBar from 'components/front-end/dashboard/ums/event/ToolBar';
import Event from 'components/front-end/dashboard/ums/teacher-schedule/Event';
import { getTimeInterval } from 'components/front-end/dashboard/ums/event/Utils';
import ShortEvent from 'components/front-end/dashboard/ums/teacher-schedule/ShortEvent';
import { convertSessionToSchedule } from 'components/timetable/views/Utils';

import 'components/front-end/dashboard/ums/event/stylesheet.scss';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import DetailSchedule from './DetailSchedule';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import './style.scss';

const views = ['month', 'week', 'day'];

const defaultBackground = '#51c1d6';

const eventPropGetters = {
  red: {
    style: { background: '#e13542' },
  },
  green: {
    style: { background: defaultBackground },
  },
};

class Layout extends Component {
  constructor(props) {
    super(props);
    this.init(props);
  }

  componentWillMount() {
    this.handleFetchData(this.state.date || new Date(), this.state.view);
  }

  init = (props) => {
    const { timestamp } = props;
    const view = timestamp ? 'day' : 'month';
    let date = new Date();
    if (timestamp) {
      date = new Date(parseInt(timestamp, 10) * 1000);
    }
    this.state = { view, date };
  };

  /**
   * TODO this is hot-fix check permission on server return true
   */
  getPermissionOfUser = () => {
    if (Perm.hasPerm('root')) {
      return 'root';
    }

    if (Perm.hasPerm('teacher')) {
      return 'teacher';
    }

    return 'student';
  };

  handleFetchData = (date, syntheticEvent) => {
    this.setState({ view: syntheticEvent });
    const interval = getTimeInterval(date, syntheticEvent);
    if (!interval) return;

    const { dispatch, courseIid, userIid } = this.props;
    let { this_user_only } = this.props;
    this_user_only = this_user_only || false;

    const params = {
      from: parseInt(interval.from.getTime(), 0) / 1000,
      to: parseInt(interval.to.getTime(), 0) / 1000,
      ciid: courseIid,
      this_user_only,
      perm: this.getPermissionOfUser(),
      user_iid: userIid,
    };

    dispatch(action.changeViewType(syntheticEvent));
    dispatch(
      sagaActions.getDataRequest(
        { url: apiUrls.sessions_search, keyState: 'sessionCalendar' },
        params,
      ),
    );
  };

  handleCloseDialog = () => {
    const { dispatch, dialogKey } = this.props;
    dispatch(actions.handleOpenDialog({ openDialog: false }, dialogKey));
  };

  showDetail = (schedule) => {
    const { dispatch, history, place, dialogKey } = this.props;

    const contentDialog = (
      <DetailSchedule
        schedule={schedule}
        onCloseDialog={this.handleCloseDialog}
        history={history}
        place={place}
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,
      width: '40%',
      title: t1('detail_schedule'),
    };

    dispatch(
      actions.handleOpenDialog(
        {
          contentDialog,
          optionsProperties,
        },
        dialogKey,
      ),
    );
  };

  handleSelectEvent = (schedule) => {
    const { themeConfig } = this.props;
    const isEnterprise = get(themeConfig, 'type') === schoolTypes.ENTERPRISE;
    const isSeabank = get(themeConfig, 'layout') === layouts.SEABANK;

    if (isEnterprise && isSeabank) {
      this.showDetail(schedule);
      return;
    }

    const { history } = this.props;
    history.push(schedule && schedule.linkTo);
  };

  renderCalendar = () => {
    const {
      schedules,
      themeConfig,
      shortView,
      provinceColor,
      isFeatureEnabled,
    } = this.props;

    const isEnterprise =
      themeConfig && themeConfig.type === schoolTypes.ENTERPRISE;

    const { view, date } = this.state;

    const calendarComponent = {
      toolbar: ToolBar,
      event: shortView ? ShortEvent : Event,
    };

    return (
      <BigCalendar
        events={schedules}
        views={views}
        step={60}
        culture="vi-VN"
        view={view}
        date={date}
        defaultView={view}
        defaultDate={date}
        popup
        onNavigate={(event, syntheticEvent) =>
          this.handleFetchData(event, syntheticEvent)
        }
        onView={(syntheticEvent) => this.handleFetchData(date, syntheticEvent)}
        components={calendarComponent}
        eventPropGetter={(data) => {
          if (isEnterprise) {
            const province = get(data, 'room.venue.province');

            const color =
              get(provinceColor, get(province, 'iid')) ||
              get(provinceColor, get(province, 'name')) ||
              defaultBackground;
            return {
              style: { background: color },
            };
          }

          return get(data, 'absent')
            ? eventPropGetters.red
            : eventPropGetters.green;
        }}
        onSelectEvent={(schedule) => this.handleSelectEvent(schedule)}
        className={
          isFeatureEnabled(features.NEW_UI_JULY_2019)
            ? 'timetable-container'
            : ''
        }
      />
    );
  };

  render() {
    const { hasAdminMainstate } = this.props;

    if (hasAdminMainstate)
      return <div className="event">{this.renderCalendar()}</div>;

    return this.renderCalendar();
  }
}

Layout.propTypes = {
  hasAdminMainstate: PropTypes.bool,
};

Layout.defaultProps = {
  hasAdminMainstate: true,
};

const getSchedulesBySessions = (sessions, themeConfig, userIid) => {
  if (themeConfig.layout === layouts.SEABANK) {
    return convertSessionToSchedule(
      sessions,
      null,
      (course) => Links.overViewCourse(course, false),
      userIid,
    );
  }
  if (Perm.hasPerm('teacher')) {
    return convertSessionToSchedule(sessions, 'teach', null, userIid);
  }

  return convertSessionToSchedule(
    sessions,
    null,
    (course, session) =>
      `/learn/timetable/${get(session, 'assigned_dates[0]')}`,
    userIid,
  );
};

const mapStateToProps = createSelector(
  (state) => get(state, 'dataApiResults.sessionCalendar'),
  (state, props) =>
    props.classIid || get(props, `match.params[${DefinedUrlParams.IID}]`),
  (state, props) => props.classIid || get(props, 'match.params.module'),
  (state) => getThemeConfig(state),
  (state) => get(state, 'user.info.iid'),
  (state) => get(state, 'domainInfo.conf.province_color'),
  (sessions, courseIid, module, themeConfig, userIid, provinceColor) => ({
    courseIid: module !== 'training-plan' ? courseIid : null,
    themeConfig,
    schedules: getSchedulesBySessions(sessions, themeConfig, userIid),
    provinceColor,
  }),
);
export default withRouter(connect(mapStateToProps)(withFeatureFlags()(Layout)));
