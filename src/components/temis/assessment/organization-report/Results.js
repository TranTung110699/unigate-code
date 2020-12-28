import React from 'react';
import TableResult from './table-result/index';
import ChartResult from './chart-result/index';
import { t1 } from 'translate/index';
import RaisedButton from 'components/common/mui/RaisedButton';
import Icon from 'components/common/Icon/index';

const getDateResultToChart = ({ data } = {}) => {
  if (!Array.isArray(data) || !data.length) {
    return [];
  }

  return data.filter(({ detail }) => Array.isArray(detail) && !!detail.length);
};

const Results = ({ dataResult, tcnn }) => {
  const dataChart = getDateResultToChart(dataResult);
  return (
    <div>
      {!!dataChart.length && (
        <div>
          <ChartResult dataResult={dataResult} type={tcnn} />
        </div>
      )}
      <TableResult dataResult={dataResult} tcnn={tcnn} />
      <RaisedButton
        className="m-t-20"
        label={t1('export_pdf')}
        icon={<Icon icon="export" />}
      />
    </div>
  );
};

export default Results;
