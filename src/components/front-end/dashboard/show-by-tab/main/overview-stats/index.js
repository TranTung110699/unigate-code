import React, { Component } from 'react';
import lodashGet from 'lodash.get';

import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import Request from 'common/network/http/Request';
import Loading from 'components/common/loading/LoadingAnt';
import CustomActiveChart from 'components/common/charts/pie/CustomActiveShapePieChart';

class WidgetStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataChart: {},
      total: 0,
      loading: true,
    };
  }

  componentDidMount() {
    Request.post(apiUrls.get_data_overview, {
      user_iid: this.props.userInfo.iid,
    }).then((res) => {
      if (res.success) {
        const data = res.result;
        if (data) {
          this.setState({
            dataChart: {
              pass: lodashGet(data, 'pass', []),
              fail: lodashGet(data, 'fail', []),
              learning: lodashGet(data, 'learning', []),
              notYetLearn: lodashGet(data, 'notYetLearn', []),
            },
            loading: false,
            total: lodashGet(data, 'total', 0),
          });
        }
      }
    });
  }

  render() {
    const { dataChart, loading } = this.state;
    const dataPresent = [
      {
        name: t1('complete'),
        value: lodashGet(dataChart, 'pass', []).length,
      },
      {
        name: t1('learning'),
        value: lodashGet(dataChart, 'learning', []).length,
      },
      {
        name: t1('dropout'),
        value: lodashGet(dataChart, 'fail', []).length,
      },
      {
        name: t1('not_yet_learned'),
        value: lodashGet(dataChart, 'notYetLearn', []).length,
      },
    ];
    return loading ? (
      <Loading message={t1('overview_is_loading')} />
    ) : (
      <CustomActiveChart
        data={dataPresent}
        options={{
          outerRadius: '60%',
          innerRadius: '50%',
          colors: ['#216fed', '#36e02a', '#ed2020'],
        }}
      />
    );
  }
}

export default WidgetStatistics;
