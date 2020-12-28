/**
 * Created by hungvo on 02/11/17.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import CircularProgress from 'material-ui/CircularProgress';
import GroupBarChart from 'components/common/d3/GroupBarChart';
import { timestampToDateTimeString } from 'common/utils/Date';
import { t1 } from 'translate';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const getKeySkillReport = (userIid, skillIid) =>
  `skill-report-${userIid}-${skillIid}`;

class ReportLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      keys: [],
      drawData: {},
    };
    this.formatDataGroupBarChart = this.formatDataGroupBarChart.bind();
  }

  componentWillMount() {
    this.getData(this.props);
    this.setState({
      loading: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { dataReport } = this.props;
    if (!dataReport && nextProps && nextProps.dataReport) {
      this.setState({
        loading: false,
      });
      this.formatDataGroupBarChart(nextProps);
    }
  }

  getData = (props) => {
    const { userIid, skillIid, dispatch } = props;
    const params = {
      skill_iid: skillIid,
      user_iid: userIid,
    };
    const url = '/progress/api/report-by-skill';
    const keyState = getKeySkillReport(userIid, skillIid);
    dispatch(sagaActions.getDataRequest({ url, keyState }, params));
  };

  formatDataGroupBarChart = (props) => {
    const { dataReport } = props;
    let drawData = {};
    let keys = [];
    if (dataReport && dataReport.histories) {
      const dataSet = [];
      keys = ['p'];

      const keyLabels = {
        p: t1('progress'),
        total_time_spent: t1('total_time_spent'),
      };

      dataReport.histories.forEach((history) => {
        dataSet.push({
          ...history,
          iid: history.time_learn_last,
          label: timestampToDateTimeString(history.time_learn_last),
        });
      });

      dataSet.push({
        ...dataReport,
        iid: dataReport.time_learn_last,
        label: timestampToDateTimeString(dataReport.time_learn_last),
      });

      drawData = {
        dataSet,
        keyLabels,
      };
    }
    this.setState({
      drawData,
      keys,
    });
  };

  render() {
    const { loading, drawData, keys } = this.state;

    const height = this.props.height || window.innerHeight;
    const width = this.props.width || window.innerWidth;

    if (loading) {
      return (
        <div>
          <CircularProgress />
          <CircularProgress size={60} thickness={5} />
          <CircularProgress size={80} thickness={7} />
        </div>
      );
    }

    if (!drawData || !drawData.dataSet) {
      return <div>AAAAAAAA</div>;
    }

    let config = {
      height,
      width,
      yAxisLabel: t1('progress'),
    };

    if (keys.includes('p')) {
      config = { ...config, min: 0, max: 100 };
    } else {
      config = {
        ...config,
        yAxisLabel: t1('total_time_spent'),
      };
    }

    return (
      <div>
        <RadioButtonGroup
          defaultSelected={keys && keys[0]}
          onChange={(event, value) => {
            this.setState({ keys: [value] });
          }}
        >
          <RadioButton value="p" label={t1('progress')} />
          <RadioButton
            value="total_time_spent"
            label={t1('total_time_spent')}
          />
        </RadioButtonGroup>
        <GroupBarChart data={{ ...drawData, keys }} config={config} />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { userIid, skillIid } = props;
  const keyState = getKeySkillReport(userIid, skillIid);
  const dataReport = state.dataApiResults[keyState];
  return {
    dataReport,
  };
}

export default connect(mapStateToProps)(ReportLayout);
