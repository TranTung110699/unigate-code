/**
 * Created by hungvo on 03/05/2017.
 */
import React, { Component } from 'react';
import GroupBarChart from 'components/common/d3/GroupBarChart';
import RadarChart from 'components/common/d3/RadarChart';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import { t1, t2 } from 'translate';

class UserReport extends Component {
  spanStyle = { display: 'inline-block', width: 200, float: 'right' };
  divStyle = { height: 500 };

  constructor(props) {
    super(props);
    this.state = {
      dataRadarChart: {},
      dataBarChar: {},
      targetDraw: {
        skill: true,
        item: false,
      },
    };
    this.XAxisOnclick = this.XAxisOnclick.bind(this);
  }

  componentWillMount() {
    const { userProgress, skills } = this.props;
    this.formatDataDrawChart(userProgress, skills);
  }

  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps !== 'undefined' &&
      typeof nextProps.userProgress !== 'undefined' &&
      nextProps.userProgress
    ) {
      this.formatDataDrawChart(nextProps.userProgress, nextProps.skills);
    }
  }

  XAxisOnclick = (d, i) => {
    const { dataBarChar } = this.state || {};
    const { dataSet } = dataBarChar || [];
    const itemEdit = dataSet[i];
  };

  formatDataDrawChart = (userProgress = [], skills = []) => {
    const targetDraw = this.state.targetDraw;
    const { skill, item } = targetDraw;
    const drawSkill = !!(skill && skills.length);
    const drawItem = !!(!skills.length || item);

    const variables = [];
    const dataRadarChart = [];
    if (userProgress) {
      userProgress.forEach((chunkProgress = [], index) => {
        const values = {};
        const dataBarChart = [];
        chunkProgress.forEach((item = {}, i) => {
          if (
            index === 0 &&
            ((drawSkill && item.ntype === 'skill') ||
              (drawItem && item.ntype !== 'skill'))
          ) {
            variables.push({ key: item.iid || i, label: item.name || i });
          }
          values[item.iid] = item.p || 0;
          if (
            (drawSkill && item.ntype === 'skill') ||
            (drawItem && item.ntype !== 'skill')
          ) {
            dataBarChart.push({
              label: item.name,
              iid: item.iid,
              progress: item.p || 0.1,
            });
          }
        });
        if (dataBarChart.length) {
          this.setState({
            dataBarChar: {
              dataSet: dataBarChart,
              keyLabels: { progress: 'progress' },
            },
          });
        }
        if (Object.keys(values).length) {
          dataRadarChart.push({
            key: index,
            lable: index,
            values,
          });
        }
      });
    }

    this.setState({
      dataRadarChart: {
        variables,
        sets: dataRadarChart,
      },
    });
  };

  renderContentRadarChart = (data) => {
    const config = {
      width: 500,
      height: 500,
      padding: 50,
      domainMax: 100,
    };
    if (data && data.sets && Object.keys(data.sets).length) {
      return <RadarChart config={config} data={data} />;
    }
    return '';
  };

  renderContentBarChart = (data) => {
    if (data && Object.keys(data).length) {
      const width = window.innerWidth * 0.8;
      return (
        <GroupBarChart
          XAxisOnclick={this.XAxisOnclick}
          data={data}
          config={{
            min: 0,
            max: 100,
            yAxisLabel: 'progress',
            height: width * 0.4,
            width,
            margin: { top: 0 },
          }}
        />
      );
    }
    return '';
  };

  setTargetReport = (target, value) => {
    const targetDraw = this.state.targetDraw;
    targetDraw[target] = value;
    if (!targetDraw.skill && !targetDraw.item) {
      targetDraw.skill = true;
      targetDraw.item = true;
    }
    this.setState({ targetDraw });
    const { userProgress, skills } = this.props;
    this.formatDataDrawChart(userProgress, skills);
  };

  render() {
    const { dataRadarChart, dataBarChar } = this.state;
    const { treeData } = this.props;
    const radarChart = this.renderContentRadarChart(dataRadarChart);
    const barChart = this.renderContentBarChart(dataBarChar);
    const skills = this.props.skills || [];
    return (
      <div>
        {skills && skills.length && (
          <div className="row">
            <span style={this.spanStyle}>
              <Checkbox
                checkedIcon={<ActionFavorite />}
                uncheckedIcon={<ActionFavoriteBorder />}
                label={t2('item_learning')}
                checked={this.state.targetDraw.item}
                onCheck={(e, value) => {
                  this.setTargetReport('item', value);
                }}
              />
            </span>
            <span style={this.spanStyle}>
              <Checkbox
                checkedIcon={<ActionFavorite />}
                uncheckedIcon={<ActionFavoriteBorder />}
                label={t1('skill')}
                checked={this.state.targetDraw.skill}
                onCheck={(e, value) => {
                  this.setTargetReport('skill', value);
                }}
              />
            </span>
          </div>
        )}
        <div className="col-md-6" style={this.divStyle}>
          {treeData}
        </div>
        <div className="col-md-6" style={this.divStyle}>
          {radarChart}
        </div>
        <div>{barChart}</div>
      </div>
    );
  }
}

export default UserReport;
