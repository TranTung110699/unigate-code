import React from 'react';
import { t1 } from 'translate';
import PieChart from 'components/common/charts/pie/CustomActiveShapePieChart';
import lodashGet from 'lodash.get';
import Legend from 'components/common/charts/legend/Legend';
import Title from 'schema-form/field-set/Title';

const configDrawByStatus = [
  {
    status: 'not_yet',
    color: '#D62728',
    name: t1('not_yet_assess'),
  },
  {
    status: 'awaiting',
    color: '#BCBD22',
    name: t1('awaiting_approval'),
  },
  {
    status: 'not_passed',
    color: '#8C564B',
    name: t1('has_not_passed'),
  },
  {
    status: 'passed',
    color: '#2CA02C',
    name: t1('has_passed'),
  },
];

const OverviewByCharts = ({ items, handleOnClick = null }) => {
  if (!Array.isArray(items) || !items.length) {
    return t1('there_is_no_data_to_report');
  }

  return (
    <div>
      <hr />
      <div className="m-t-20">
        <Legend
          wrapperStyle={{ position: 'initial' }}
          align="right"
          onClick="row"
          payload={configDrawByStatus.map((sc) => ({
            ...sc,
            type: 'rect',
            value: sc.name,
          }))}
        />
      </div>
      <div className="flex-container-wrap">
        {items.map(({ id, detail }) => {
          if (!Array.isArray(detail) || detail.length === 0) {
            return null;
          }

          const pieChartData = detail.map(({ status_of_assessment, count }) => {
            const item = configDrawByStatus.find(
              ({ status }) => status === status_of_assessment,
            );

            return {
              ...item,
              value: count,
              handleOnClick,
            };
          });

          return (
            <div className="flex-item">
              <Title
                title={t1(`overview_tcnn_by_${id}`)}
                className={'text-transform'}
              />
              {pieChartData.every((d) => !lodashGet(d, 'value')) ? (
                t1('AAAA')
              ) : (
                <div style={{ height: 350, width: 500 }}>
                  <PieChart
                    options={{
                      innerRadius: 30,
                      getColor: ({ color }) => color,
                    }}
                    data={pieChartData}
                    shouldShowLegend={false}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OverviewByCharts;
