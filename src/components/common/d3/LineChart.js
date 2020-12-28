import React from 'react';
import PropTypes from 'prop-types';
import XAxis from './XAxis';
import YAxis from './YAxis';
import Legend from './Legend';
import { curveMonotoneX, line } from 'd3-shape';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { extent, max } from 'd3-array';
import { scaleLinear, scaleOrdinal, scaleTime } from 'd3-scale';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, config } = this.props;
    const { margin, width, height, yAxisLabel, yDomain, xDomain } = config;
    const x = scaleTime().range([0, width]);
    const y = scaleLinear().range([height, 0]);

    // Scale the range of the data
    const mergedDataSet = data.reduce(
      (merged, { dataSet }) => merged.concat(dataSet),
      [],
    );
    x.domain(xDomain || extent(mergedDataSet, (d) => d.x));
    y.domain(yDomain || [0, max(mergedDataSet, (d) => d.y)]);

    const valueline = line()
      .x((d) => x(d.x))
      .y((d) => y(d.y))
      .curve(curveMonotoneX);

    const color = scaleOrdinal(schemeCategory10);

    return (
      <svg
        ref={(el) => {
          this.component = el;
        }}
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          {data.map(({ dataSet }, index) => (
            <g>
              {dataSet.map((point) => (
                <circle
                  cx={x(point.x)}
                  cy={y(point.y)}
                  r={2}
                  style={{
                    fill: color(index),
                  }}
                />
              ))}
              <path
                style={{
                  fill: 'none',
                  stroke: color(index),
                  strokeWidth: 2,
                }}
                d={valueline(dataSet)}
              />
            </g>
          ))}
          <XAxis scale={x} posY={height} />
          <YAxis label={yAxisLabel} scale={y} />
          <Legend
            posX={width}
            data={data.map(({ label }, index) => ({
              label,
              color: color(index),
            }))}
          />
        </g>
      </svg>
    );
  }
}

LineChart.propTypes = {
  config: PropTypes.shape({
    margin: PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
    }),
    width: PropTypes.number,
    height: PropTypes.number,
    yAxisLabel: PropTypes.string,
  }),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      dataSet: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.number,
          y: PropTypes.string,
          color: PropTypes.string,
        }),
      ),
      color: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
};

LineChart.defaultProps = {
  config: null,
  data: null,
};

export default LineChart;
