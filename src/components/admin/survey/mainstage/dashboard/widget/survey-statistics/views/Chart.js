import React, { Component } from 'react';

import PieChart from 'recharts/lib/chart/PieChart';
import Pie from 'recharts/lib/polar/Pie';
import Sector from 'recharts/lib/shape/Sector';
import Legend from 'recharts/lib/component/Legend';
import Cell from 'recharts/lib/component/Cell';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#006064',
  '#880E4F',
  '#b71c1c',
  '#3E2723',
  '#263238',
];
const COLORS_ETEP = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE'];

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
    value,
  } = props;
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
    // algorithm to anchor the label
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.subName}
      </text>
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
      >{`Total (${payload.value})`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const style = {
  top: 40,
  left: 400,
  lineHeight: '24px',
};

class SurveyReportQuestionChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
    this.onPieEnter = this.onPieEnter.bind(this);
  }

  onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    });
  }

  render() {
    const { answers, totalAnswer, loops } = this.props;
    const data = [];

    // print out percentage alongside answer text
    answers &&
      answers.map((answer, index) => {
        let percentage = 0;

        if (totalAnswer > 0) {
          percentage = (parseFloat(loops[index]) / totalAnswer) * 100;
          if (isNaN(percentage)) {
            percentage = 0;
          }
        }

        data.push({
          name: `${index + 1}) ${answer.text} (${percentage.toFixed(2)}%)`,
          subName: '',
          value: totalAnswer > 0 ? loops[index] : 0,
        });
      });

    return (
      <PieChart width={700} height={150}>
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={200}
          cy={70}
          innerRadius={20}
          outerRadius={35}
          fill="#8884d8"
          onMouseEnter={this.onPieEnter}
          dataKey="value"
        >
          {window.isETEP
            ? data.map((entry, index) => (
                <Cell
                  fill={COLORS_ETEP[index % COLORS_ETEP.length]}
                  key={`spcp-${index}`}
                />
              ))
            : data.map((entry, index) => (
                <Cell
                  fill={COLORS[index % COLORS.length]}
                  key={`spcp-${index}`}
                />
              ))}
        </Pie>
        <Legend
          iconSize={12}
          width={700}
          height={140}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
          className="text-muted"
        />
      </PieChart>
    );
  }
}

export default SurveyReportQuestionChart;
