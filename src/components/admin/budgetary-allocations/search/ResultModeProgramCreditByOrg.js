import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AntdTable from 'antd/lib/table';
import { t1 } from '../../../../translate';
import get from 'lodash.get';
import {
  caculatorScoll,
  sum,
  caculatorAllocationByMonth,
  NoData,
} from './common';

class ResultModeProgramCreditByOrg extends PureComponent {
  render() {
    const { month, items } = this.props;
    const scoll = caculatorScoll(month);
    const columns = [
      {
        title: t1('code'),
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: t1('name'),
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Spend',
        render: (text, row) => (
          <div>{`${parseInt(get(row, 'spend', 0)).toLocaleString()} VNĐ`}</div>
        ),
        dataIndex: 'spend',
        key: 'spend',
      },
    ];
    return (
      <div>
        <AntdTable
          columns={columns}
          bordered
          pagination={false}
          dataSource={items}
        />
      </div>
    );
  }
}
ResultModeProgramCreditByOrg.propTypes = {
  items: PropTypes.array.isRequired,
  month: PropTypes.array.isRequired,
};
export default ResultModeProgramCreditByOrg;
