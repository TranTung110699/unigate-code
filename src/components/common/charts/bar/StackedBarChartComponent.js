import React from 'react';
import PropTypes from 'prop-types';

import BarChart from 'recharts/lib/chart/BarChart';
import Bar from 'recharts/lib/cartesian/Bar';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';

import { chartColorsPallete, layoutOrientations } from 'configs/constants';

class StackedBarChart extends React.Component {
  render() {
    const defaultOptions = Object.freeze({
      LAYOUT: layoutOrientations.HORIZONTAL,
      WIDTH: '100%',
      HEIGHT: '100%',
      MIN_HEIGHT: 240,
      MARGIN: {
        top: 10,
        right: 40,
        left: 20,
        bottom: 10,
      },
      COLORS: chartColorsPallete.ALL,
      MAX_BAR_SIZE: 25,
      Y_AXIS_WIDTH: 300,
    });

    let {
      data,
      dataKeys,
      tooltipValueFormatter,
      options: {
        layout = defaultOptions.LAYOUT,
        width = defaultOptions.WIDTH,
        height,
        margin = defaultOptions.MARGIN,
        colors = defaultOptions.COLORS,
        maxBarSize = defaultOptions.MAX_BAR_SIZE,
        yAxisWidth = defaultOptions.Y_AXIS_WIDTH,
      },
    } = this.props;

    let xAxisType = 'category';
    let yAxisType = 'number';
    let xAxisDataKey = 'name';
    let yAxisDataKey;
    if (layout === layoutOrientations.VERTICAL) {
      [xAxisType, yAxisType] = [yAxisType, xAxisType];
      [xAxisDataKey, yAxisDataKey] = [yAxisDataKey, xAxisDataKey];

      if (!height) {
        height = ((data && data.length) || 0) * 30;
      }
    }

    //Trường hợp có dữ liệu nhưng mà data.length chưa đủ dài thì để chiều dài về MIN_HEIGHT
    if (height && height <= defaultOptions.MIN_HEIGHT) {
      height = defaultOptions.MIN_HEIGHT;
      //Trường hợp không có data thì để default defaultOptions.HEIGHT
    } else if (!height) {
      height = defaultOptions.HEIGHT;
    }

    return (
      <ResponsiveContainer width={width} height={height}>
        <BarChart
          layout={layout}
          width={width}
          height={height}
          data={data}
          margin={margin}
          maxBarSize={maxBarSize}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type={xAxisType} dataKey={xAxisDataKey} />
          <YAxis
            type={yAxisType}
            dataKey={yAxisDataKey}
            width={yAxisWidth}
            interval={0}
          />
          <Tooltip formatter={tooltipValueFormatter} />
          <Legend />
          {dataKeys.map((key, index) => (
            <Bar
              dataKey={key.name}
              name={key.label}
              stackId={key.stack}
              fill={colors[index]}
              minPointSize={5}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

StackedBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
  dataKeys: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      stack: PropTypes.string,
    }),
  ),
  tooltipValueFormatter: PropTypes.func,
  options: PropTypes.shape({
    layout: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    margin: PropTypes.shape({
      top: PropTypes.string,
      right: PropTypes.string,
      bottom: PropTypes.string,
      left: PropTypes.string,
    }),
    colors: PropTypes.arrayOf(PropTypes.string),
    maxBarSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    yAxisWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

StackedBarChart.defaultProps = {
  data: [],
  dataKeys: [],
  tooltipValueFormatter: (f) => f,
  options: {},
};

export default StackedBarChart;
