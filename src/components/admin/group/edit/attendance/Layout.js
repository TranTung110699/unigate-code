import React, { Component } from 'react';
import get from 'lodash.get';
import apiUrls from 'api-endpoints';
import fetchData from 'components/common/fetchData';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './form-filter/schema-form';
import Results from 'components/admin/course/mainstage/session/Results';
import { getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import {
  generateDateFrameByRoundTime,
  makeArrayAttendanceToKeyMap,
} from './Utils';

const formid = 'search_group_members';

const date = new Date();

class Layout extends Component {
  defaultSessionName = `${date.getDate()}/${date.getMonth() +
    1}/${date.getFullYear()}`;

  constructor(props) {
    super(props);
    this.state = { sessions: [] };
  }

  renderResultComponent = (items, props) => {
    const { group, hasPermission, permissions } = this.props;
    const attendanceType =
      get(group, 'type') === 'bus_group'
        ? 'attendance-by-bus'
        : 'attendance-by-group';
    return (
      <Results
        users={items}
        sessions={this.state.sessions}
        defaultSessionName={this.defaultSessionName}
        node={group}
        onAttendanceChanged={this.handleAttendanceChanged}
        hasPermission={hasPermission}
        permissions={permissions}
        attendanceType={attendanceType}
      />
    );
  };

  handleAttendanceChanged = () => {
    this.props.handleRefetch();
  };

  componentWillReceiveProps(nextProps) {
    if (
      get(nextProps, 'start_date') !== get(this.props, 'start_date') ||
      get(nextProps, 'end_date') !== get(this.props, 'end_date') ||
      get(nextProps, 'attendancesByGroup') !==
        get(this.props, 'attendancesByGroup')
    ) {
      const sessions = this.generateSessions(nextProps);
      this.setState({ sessions });
    }
  }

  generateSessions = (props) => {
    const dates = generateDateFrameByRoundTime(
      parseInt(get(props, 'start_date', 0)),
      parseInt(get(props, 'end_date', 0)),
    );
    if (!dates) {
      return [];
    }

    const attendancesByGroup = makeArrayAttendanceToKeyMap(
      get(props, 'attendancesByGroup'),
    );
    return dates
      .map((date) => {
        const key = `${date.day}-${date.month}-${date.year}`;
        return !date
          ? null
          : {
              name: `${date.day}/${date.month}/${date.year}`,
              date,
              attendances: get(attendancesByGroup, `[${key}]`),
            };
      })
      .filter(Boolean);
  };

  render() {
    const { group } = this.props;
    const hiddenFields = {
      type: 'user_group',
      category_iid: group.iid,
      group_type: 'user_group',
      rt_mode: 'current',
      _sand_step: 'list_members',
    };

    return (
      <SearchWrapper
        formid={formid}
        showResult
        hiddenFields={hiddenFields}
        ignoreOptimize
        schema={schema(this.props)}
        renderResultsComponent={this.renderResultComponent}
        showQueryField={false}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    start_date: get(getFormValues(formid)(state), 'start_date'),
    end_date: get(getFormValues(formid)(state), 'end_date'),
  };
};

export default connect(mapStateToProps)(
  fetchData((props) => ({
    baseUrl: apiUrls.group_attendance_search,
    params: {
      group_iid: get(props, 'group.iid'),
      items_per_page: -1,
      start_date: get(props, 'start_date'),
      end_date: get(props, 'end_date'),
      group_type: get(props, 'group.type'),
    },
    propKey: 'attendancesByGroup',
    fetchCondition: get(props, 'group.iid'),
    refetchCondition: (prevProps) =>
      get(prevProps, 'start_date') !== get(props, 'start_date') ||
      get(prevProps, 'end_date') !== get(props, 'end_date'),
  }))(Layout),
);
