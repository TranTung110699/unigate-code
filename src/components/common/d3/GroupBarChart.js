import React from 'react';
import PropTypes from 'prop-types';
import XAxis from './XAxis';
import YAxis from './YAxis';
import { max as d3Max } from 'd3-array';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import Legend from './Legend';

class GroupBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, XAxisOnclick } = this.props;
    let { config } = this.props;
    config = config || {};
    config.margin = config.margin || {};

    config.margin.top = config.margin.top || 100;
    config.margin.right = config.margin.right || 50;
    config.margin.bottom = config.margin.bottom || 150;
    config.margin.left = config.margin.left || 150;

    config.width = config.width || 1080;
    config.height = config.height || 720;

    data.colors = data.colors || [
      '#98abc5',
      '#8a89a6',
      '#7b6888',
      '#6b486b',
      '#a05d56',
      '#d0743c',
      '#ff8c00',
    ];

    const width = config.width + config.margin.left + config.margin.right;
    const height = config.height + config.margin.top + config.margin.bottom;

    const x0 = scaleBand()
      .rangeRound([0, config.width])
      .paddingInner(0.1);

    const x1 = scaleBand().padding(0.05);

    const y = scaleLinear().rangeRound([config.height, 0]);

    const colorScale = scaleOrdinal().range(data.colors);

    const dataSet = data.dataSet;
    const keyLabels = data.keyLabels;
    const keys = data.keys || Object.keys(keyLabels);

    x0.domain(dataSet.map((d) => d.label));

    x1.domain(keys).rangeRound([0, x0.bandwidth()]);

    const min = config.min || 0;
    const max =
      config.max ||
      d3Max(dataSet, (item) => d3Max(keys.map((key) => item[key]))) * 1.05;

    const yAxisLabel = config.yAxisLabel;

    y.domain([min, max]).nice();

    return (
      <svg
        ref="componentPanel"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMinYMin meet"
      >
        <g transform={`translate(${config.margin.left},${config.margin.top})`}>
          <g>
            {dataSet.map((gData) => (
              <g
                key={gData.label}
                transform={`translate(${x0(gData.label)},0)`}
              >
                {keys.map((key) => (
                  <rect
                    key={key}
                    x={x1(key)}
                    y={y(gData[key])}
                    width={x1.bandwidth()}
                    height={config.height - y(gData[key])}
                    fill={colorScale(key)}
                  />
                ))}
              </g>
            ))}
          </g>
          <XAxis handleOnclick={XAxisOnclick} scale={x0} posY={config.height} />
          <YAxis scale={y} label={yAxisLabel} />
          {keys && keys.length > 1 && (
            <Legend
              data={keys
                .slice()
                .reverse()
                .map((key) => ({
                  label: keyLabels[key],
                  color: colorScale(key),
                }))}
              posX={config.width}
            />
          )}
        </g>
      </svg>
    );
  }
}

GroupBarChart.propTypes = {
  config: PropTypes.shape({
    margin: PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
    }),
    width: PropTypes.number,
    height: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    yAxisLabel: PropTypes.string,
  }),
  data: PropTypes.shape({
    dataSet: PropTypes.arrayOf(PropTypes.any),
    colors: PropTypes.arrayOf(PropTypes.string),
    keyLabels: PropTypes.shape(),
    keys: PropTypes.arrayOf(PropTypes.string),
  }),
  XAxisOnclick: PropTypes.func,
};

GroupBarChart.defaultProps = {
  config: null,
  data: null,
  XAxisOnclick: () => {},
};

export default GroupBarChart;
