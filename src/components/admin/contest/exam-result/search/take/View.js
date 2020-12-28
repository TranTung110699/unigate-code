import React, { Component } from 'react';
import { t1 } from 'translate';
import contestApiUrls from 'components/admin/contest/endpoints';
import fetchData from 'components/common/fetchData';
import getLodash from 'lodash.get';
import Loading from 'components/common/loading';

import Tabs from 'antd/lib/tabs';
import TakeOverview from './Overview';
import ScoreOverview from './ScoreOverview';
import ReduxEventLog from './redux-log/ReduxEventLog';

class TakeView extends Component {
  render() {
    const { take, readOnly, handleRefetch } = this.props;
    if (!take) {
      return <Loading />;
    }

    return (
      <div>
        <h1>{getLodash(take, 'u.name')}</h1>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab={`${t1('result_overview')}`} key="1">
            <TakeOverview {...this.props} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={`${t1('score_and_marking')}`} key="2">
            <ScoreOverview {...this.props} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={`${t1('exam_event_log')}`} key="3">
            <ReduxEventLog take={take} readOnly={readOnly} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default fetchData((props) => ({
  baseUrl: contestApiUrls.get_take_by_id,
  params: {
    id: getLodash(props, 'id'),
  },
  propKey: 'take',
  fetchCondition: getLodash(props, 'id'),
  refetchCondition: (prevProps) => {
    const idNew = getLodash(props, 'id');
    const idOld = getLodash(prevProps, 'id');
    return idNew && idOld !== idNew;
  },
}))(TakeView);
