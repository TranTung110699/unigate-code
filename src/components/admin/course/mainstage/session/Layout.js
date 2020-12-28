import React, { Component } from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import fetchData from 'components/common/fetchData';
import { loadingStatuses } from 'configs/constants';
import Loading from 'components/common/loading';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from 'components/admin/course/mainstage/session/form-filter/schema-form';
import Results from './Results';
import Alert from 'antd/lib/alert';

class Layout extends Component {
  renderResultComponent = (items) => {
    const { node, sessions, hasPermission, permissions } = this.props;

    return (
      <Results
        users={items}
        sessions={sessions}
        node={node}
        onAttendanceChanged={this.handleAttendanceChanged}
        hasPermission={hasPermission}
        permissions={permissions}
      />
    );
  };

  handleAttendanceChanged = () => {
    this.props.handleRefetch();
  };

  render() {
    const { node, sessions, loadingStatus } = this.props;

    if (loadingStatus !== loadingStatuses.FINISHED) {
      return <Loading />;
    } else if (!Array.isArray(sessions) || !sessions.length) {
      return <div>{t1('data_missing')}</div>;
    }

    return (
      <div>
        <div id="teacher-search-form" className="m-b-10">
          <Alert
            message={`${t1('session_class')}: ${node && node.name}`}
            type="info"
            showIcon
          />
        </div>
        <SearchWrapper
          formid={'session_search_user'}
          showResult
          schema={schema(this.props)}
          hiddenFields={{ course_iid: node.iid }}
          renderResultsComponent={this.renderResultComponent}
          showQueryField={false}
        />
      </div>
    );
  }
}

export default fetchData((props) => ({
  baseUrl: apiUrls.session_search,
  params: {
    course_iid: get(props, 'node.iid'),
    items_per_page: -1,
  },
  propKey: 'sessions',
  fetchCondition: get(props, 'node.iid'),
  refetchCondition: (prevProps) =>
    get(props, 'node.iid') &&
    get(prevProps, 'node.iid') !== get(props, 'node.iid'),
}))(Layout);
