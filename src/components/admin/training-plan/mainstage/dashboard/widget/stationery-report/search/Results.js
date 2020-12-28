import React from 'react';
import PropTypes from 'prop-types';

import { t1 } from 'translate';
import AntTable from 'antd/lib/table';

class Results extends React.Component {
  render() {
    const { items } = this.props;

    const columns = [
      {
        title: t1('category_name'),
        key: 'category',
        dataIndex: 'category_name',
      },
      {
        title: t1('code'),
        key: 'code',
        dataIndex: 'code',
      },
      {
        title: t1('average_usage_rate'),
        key: 'usage_rate',
        dataIndex: 'usage_rate',
      },
      {
        title: t1('unit'),
        key: 'unit',
        dataIndex: 'unit',
      },
    ];

    return (
      <AntTable
        dataSource={items}
        columns={columns}
        childrenColumnName={null}
        pagination={false}
        rowKey="id"
      />
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

Results.defaultProps = {
  items: [],
};

export default Results;
