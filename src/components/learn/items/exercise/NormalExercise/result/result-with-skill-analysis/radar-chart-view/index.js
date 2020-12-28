import lodashGet from 'lodash.get';
import React from 'react';
import RadarChart from 'components/common/charts/radar/RadarChart';

const valueDomain = [0, 100];

const SkillRadarChart = ({ skillAnalysis }) => {
  const data = React.useMemo(
    () => {
      return Object.values(skillAnalysis || {}).map((item) => {
        return {
          short_name: lodashGet(item, 'name'),
          name: lodashGet(item, 'name'),
          value: lodashGet(item, 'score'),
          valueAsText: `${lodashGet(item, 'score') || 0}%`,
        };
      });
    },
    [skillAnalysis],
  );

  return <RadarChart data={data} valueDomain={valueDomain} />;
};

export default SkillRadarChart;
