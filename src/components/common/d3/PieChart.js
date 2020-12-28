import React from 'react';
import PropTypes from 'prop-types';
import { arc as d3Arc, pie as d3Pie } from 'd3-shape';
import { scaleOrdinal } from 'd3-scale';
import { sum } from 'd3-array';
import Legend from './Legend';

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    let { config } = this.props;

    config = config || {};
    config.margin = config.margin || {};

    config.margin.top = config.margin.top || 100;
    config.margin.right = config.margin.right || 50;
    config.margin.bottom = config.margin.bottom || 100;
    config.margin.left = config.margin.left || 40;

    config.width = config.width || 1080;
    config.height = config.height || 720;

    config.radius = config.radius || Math.min(config.width, config.height) / 2;

    data.colors = data.colors || [
      '#98abc5',
      '#8a89a6',
      '#7b6888',
      '#6b486b',
      '#a05d56',
      '#d0743c',
      '#ff8c00',
    ];

    const dataSet = data.dataSet;

    const pie = d3Pie()
      .sort(null)
      .value((d) => d.value);

    const arc = d3Arc()
      .outerRadius(config.radius * 0.8)
      .innerRadius(config.radius * 0.4);

    const outerArc = d3Arc()
      .innerRadius(config.radius * 0.9)
      .outerRadius(config.radius * 0.9);

    const width = config.width + config.margin.left + config.margin.right;
    const height = config.height + config.margin.top + config.margin.bottom;

    const colorScale = scaleOrdinal().range(data.colors);

    const midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2;

    return (
      <svg
        ref="componentPanel"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMinYMin meet"
      >
        <g transform={`translate(${config.width / 2},${config.height / 2})`}>
          <text textAnchor="middle" fontSize="4em">
            {sum(dataSet, (d) => d.value)}
          </text>
          <g className="slices">
            {pie(dataSet).map((pieData) => (
              <path
                key={pieData.data.label}
                fill={colorScale(pieData.data.label)}
                className="slice"
                d={arc(pieData)}
              />
            ))}
          </g>
          <g className="labels">
            {pie(dataSet).map((pieData) => (
              <text
                key={pieData.data.label}
                dy=".35em"
                transform={(() => {
                  const pos = outerArc.centroid(pieData);
                  pos[0] =
                    config.radius * (midAngle(pieData) < Math.PI ? 1 : -1);
                  return `translate(${pos})`;
                })()}
                textAnchor={midAngle(pieData) < Math.PI ? 'start' : 'end'}
              >
                {pieData.data.label}
              </text>
            ))}
          </g>
          <g className="lines">
            {pie(dataSet).map((pieData) => (
              <polyline
                key={pieData.data.label}
                opacity=".3"
                stroke="black"
                strokeWidth="2px"
                fill="none"
                points={(() => {
                  const pos = outerArc.centroid(pieData);
                  pos[0] =
                    config.radius *
                    0.95 *
                    (midAngle(pieData) < Math.PI ? 1 : -1);
                  return [
                    arc.centroid(pieData),
                    outerArc.centroid(pieData),
                    pos,
                  ];
                })()}
              />
            ))}
          </g>
          <Legend
            data={dataSet.map((datum) => ({
              label: datum.legendLabel,
              color: colorScale(datum.label),
            }))}
            posX={config.width / 2}
          />
        </g>
      </svg>
    );
  }
}

PieChart.propTypes = {
  config: PropTypes.shape({
    margin: PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
    }),
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  data: PropTypes.shape({
    dataSet: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.string,
        legendLabel: PropTypes.string,
      }),
    ),
    colors: PropTypes.arrayOf(PropTypes.string),
  }),
};

PieChart.defaultProps = {
  config: null,
  data: null,
};

export default PieChart;
