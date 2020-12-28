import React from 'react';
import lodashGet from 'lodash.get';
import { userSchoolLevelToText } from 'configs/constants/user';
import PieChart from 'components/common/charts/pie/CustomActiveShapePieChart';
import { getLabelOfScoreFromScale } from 'common/utils/Score';
import Legend from 'components/common/charts/legend/Legend';
import './stylesheet.scss';
import { t1 } from 'translate';

const colors = [
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
];

const getColorForValue = (value) => {
  return colors[value];
};

const cssClass = 'temis-tcnn-report-chart-result';

const ChartResult = ({ dataResult, type }) => {
  const data = lodashGet(dataResult, 'data') || [];
  const scoreScale = lodashGet(dataResult, 'score_scale');

  return (
    <div className={`${cssClass}`}>
      <div className={`${cssClass}__legend-wrapper col-md-12`}>
        <Legend
          className="col-md-12"
          align="right"
          payload={(scoreScale || []).map((sc) => {
            const id = lodashGet(sc, 'id');
            return {
              color: getColorForValue(id),
              type: 'rect',
              value: lodashGet(sc, 'name'),
            };
          })}
        />
      </div>
      <div className={`${cssClass}__charts row`}>
        {data.map((row, index) => {
          const id = lodashGet(row, 'school_level');
          const title = userSchoolLevelToText(id);
          const detail = lodashGet(row, 'detail');

          if (!Array.isArray(detail) || detail.length === 0) {
            return null;
          }

          const pieChartData = detail.map((d) =>
            Object.assign({}, d, {
              name: getLabelOfScoreFromScale(lodashGet(d, 'id'), scoreScale),
              value: lodashGet(d, 'total'),
            }),
          );

          return (
            <div className={`${cssClass}__chart-box col-md-3`}>
              <div className={`${cssClass}__chart-title`}>{title}</div>
              <div className={`${cssClass}__chart-wrapper`}>
                {detail.every((d) => !lodashGet(d, 'total')) ? (
                  <em>{t1('there_is_no_data_to_report')}</em>
                ) : (
                  <PieChart
                    options={{
                      innerRadius: 30,
                      getColor: (pieChartDataRow) => {
                        return getColorForValue(
                          lodashGet(pieChartDataRow, 'id'),
                        );
                      },
                    }}
                    key={id}
                    data={pieChartData}
                    shouldShowLegend={false}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartResult;
