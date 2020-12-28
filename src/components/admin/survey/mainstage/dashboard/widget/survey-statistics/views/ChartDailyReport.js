import React from 'react';
import { t1 } from 'translate';
import LineChart from 'recharts/lib/chart/LineChart';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import Tooltip from 'recharts/lib/component/Tooltip';
import Line from 'recharts/lib/cartesian/Line';
import { timestampToDateString } from 'common/utils/Date';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import lodashGet from 'lodash.get';

const ChartDailyReport = ({ items, lineKeys = [], strokes = {} }) => {
  if (
    !Array.isArray(items) ||
    !items.length ||
    !Array.isArray(lineKeys) ||
    !lineKeys.length
  ) {
    return null;
  }

  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <LineChart
          width={width}
          height={250}
          data={items
            .map(({ updated_ts, ...item }) => {
              if (!updated_ts) {
                return false;
              }

              lineKeys.forEach((key) => {
                item[key] = item[key] || 0;
              });

              return {
                ...item,
                updated_ts,
                date: timestampToDateString(updated_ts),
              };
            })
            .filter(Boolean)
            .sort(
              (item, anotherItem) =>
                lodashGet(item, 'updated_ts') -
                lodashGet(anotherItem, 'updated_ts'),
            )}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          {lineKeys.map((key) => (
            <Line
              type="monotone"
              dataKey={key}
              name={t1(key)}
              stroke={strokes[key]}
            />
          ))}
        </LineChart>
      )}
    </AutoSizer>
  );
};

export default ChartDailyReport;
