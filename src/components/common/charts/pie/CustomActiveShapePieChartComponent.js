import React from 'react';
import PropTypes from 'prop-types';
import t1 from 'translate';
import PieChart from 'recharts/lib/chart/PieChart';
import Pie from 'recharts/lib/polar/Pie';
import Sector from 'recharts/lib/shape/Sector';
import Cell from 'recharts/lib/component/Cell';
import Legend from 'recharts/lib/component/Legend';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import Tooltip from 'recharts/lib/component/Tooltip';
import lodashGet from 'lodash.get';
import { sum } from 'common/utils/Array';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;
  const handleOnClick = lodashGet(payload, 'handleOnClick');
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g
      onClick={
        typeof handleOnClick === 'function'
          ? () => handleOnClick(payload)
          : null
      }
      style={typeof handleOnClick === 'function' ? { cursor: 'pointer' } : {}}
    >
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {payload.name || t1('amount')}: {payload.value}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};

const renderTooltip = (props) => {
  const { payload, data } = props;
  const total = sum(data, (d) => lodashGet(d, 'value')) || 0;
  const item = lodashGet(payload, [0, 'payload']);
  const value = lodashGet(item, 'value') || '';
  const percent = ((value / total) * 100 || 0).toFixed(2);
  const name = lodashGet(item, 'name') || '';

  return (
    <div style={{ background: 'white', border: 'solid 1px', padding: 5 }}>
      {name}
      {value ? (
        <React.Fragment>
          : <b>{value}</b> <span className="text-muted">({percent}%)</span>
        </React.Fragment>
      ) : (
        ''
      )}
    </div>
  );
};

class CustomActiveShapePieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const defaultOptions = Object.freeze({
      COLORS: [
        '#1F77B4',
        '#FF7F0E',
        '#2CA02C',
        '#D62728',
        '#9467BD',
        '#8C564B',
        '#E377C2',
        '#7F7F7F',
        '#BCBD22',
        '#17BECF',
      ],
    });

    const {
      data,
      options: {
        outerRadius,
        innerRadius,
        colors = defaultOptions.COLORS,
        getColor,
      },
      shouldShowLegend,
    } = this.props;
    const activeIndex = data[this.state.activeIndex].value
      ? this.state.activeIndex
      : data.findIndex((item) => item.value);

    return (
      <ResponsiveContainer width="100%" height="75%">
        <PieChart
          width="100%"
          height="100%"
          margin={{
            top: 30,
            bottom: 40,
          }}
        >
          <Pie
            data={data}
            dataKey="value"
            dataName="name"
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={this.onPieEnter}
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  typeof getColor === 'function'
                    ? getColor(entry)
                    : colors[index]
                }
              />
            ))}
          </Pie>
          {shouldShowLegend ? (
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          ) : null}
          <Tooltip data={data} content={renderTooltip} />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

CustomActiveShapePieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
    }),
  ),
  options: PropTypes.shape({
    outerRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    innerRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    colors: PropTypes.arrayOf(PropTypes.string),
  }),
  shouldShowLegend: PropTypes.bool,
};

CustomActiveShapePieChart.defaultProps = {
  data: [],
  options: {},
  shouldShowLegend: true,
};

export default CustomActiveShapePieChart;
