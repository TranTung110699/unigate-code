import React from 'react';
import RadarChart from 'recharts/lib/chart/RadarChart';
import PolarGrid from 'recharts/lib/polar/PolarGrid';
import PolarAngleAxis from 'recharts/lib/polar/PolarAngleAxis';
import PolarRadiusAxis from 'recharts/lib/polar/PolarRadiusAxis';
import Radar from 'recharts/lib/polar/Radar';
import Tooltip from 'recharts/lib/component/Tooltip';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import lodashGet from 'lodash.get';

const cssClass = 'lms-radar-chart';

const RadarChartView = ({ data, valueDomain }) => {
  const renderTooltip = ({ payload }) => {
    const item = lodashGet(payload, [0, 'payload']);

    const valueAsText = lodashGet(item, 'valueAsText') || '';
    const name = lodashGet(item, 'name') || '';

    return (
      <div style={{ background: 'white', border: 'solid 1px', padding: 5 }}>
        {name}
        {valueAsText ? (
          <React.Fragment>
            : <b>{valueAsText}</b>
          </React.Fragment>
        ) : (
          ''
        )}
      </div>
    );
  };

  return (
    <div className={cssClass}>
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart outerRadius={90} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="short_name" />
          <PolarRadiusAxis
            domain={valueDomain}
            display={'none'}
            tickCount={1}
          />
          <Radar
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Tooltip content={renderTooltip} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartView;
