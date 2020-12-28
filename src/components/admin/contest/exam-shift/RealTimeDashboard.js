import React from 'react';
import { t1 } from 'translate';
import contestApiUrls from 'components/admin/contest/endpoints';
import fetchData from 'components/common/fetchData';
import getLodash from 'lodash.get';

class RealTimeDashboard extends React.Component {
  render() {
    // fetch data here
    const { stats, examShift, iid, total } = this.props;

    return (
      <div>
        <h1>
          #{iid} - {examShift.name}
        </h1>
        <div>
          {t1('started_contestants')}: {getLodash(stats, 'started')}
        </div>
        <div>
          {t1('finished_contestants')}: {getLodash(stats, 'finished')}
        </div>
        <div>
          {t1('total')}: {total}
        </div>
      </div>
    );
  }
}

export default fetchData((props) => ({
  baseUrl: contestApiUrls.get_realtime_dashboard_for_shift,
  params: {
    iid: getLodash(props, 'iid'),
  },
  propKey: 'stats',
  fetchCondition: getLodash(props, 'iid'),
  refetchCondition: (prevProps) => {
    const iid = getLodash(props, 'iid');
    return iid && iid !== getLodash(prevProps, 'iid');
  },
}))(RealTimeDashboard);
