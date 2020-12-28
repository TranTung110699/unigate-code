import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayHtml from 'components/common/html';
import { t1 } from 'translate';
import Widget from 'components/common/Widget';
import Descriptions from 'antd/lib/descriptions';
import { displayVNMoney } from 'common/utils/money';
import AntTable from 'antd/lib/table';
import get from 'lodash.get';

class Results extends Component {
  render() {
    const { item } = this.props;

    const columns = [
      {
        title: t1('seri'),
        key: 'seri',
        dataIndex: 'seri',
      },
      {
        title: t1('pin'),
        key: 'pin',
        dataIndex: 'pin',
      },
      {
        title: t1('status'),
        key: 'status',
        dataIndex: 'status',
        render: (status) => t1(status),
      },
    ];

    return (
      <Widget title={`${t1('package')}: ${item.name}`}>
        <Descriptions column={1}>
          <Descriptions.Item label={t1('description')}>
            <DisplayHtml
              content={item.description}
              className="question-content__text"
            />
          </Descriptions.Item>
          <Descriptions.Item label={t1('money')}>
            {displayVNMoney(item.money)}
          </Descriptions.Item>
          <Descriptions.Item label={t1('vmoney')}>
            {item.vmoney}
          </Descriptions.Item>
          <Descriptions.Item label={t1('total')}>
            {item.counter.total_card}
          </Descriptions.Item>
        </Descriptions>
        <AntTable
          dataSource={get(item, 'cards', [])}
          columns={columns}
          pagination={false}
          childrenColumns={null}
          rowKey="seri"
          bordered
        />
      </Widget>
    );
  }
}

export default connect()(Results);
