import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import sagaActions from 'actions/admin/card/saga-creators';
// import apiUrls from 'api-endpoints';
import cApiUrls from 'components/admin/card/endpoints';
import Confirm from 'components/admin/card/Confirm';
import AntdTable from 'antd/lib/table';
import { displayVNMoney } from '../../../../common/utils/money';

class Results extends Component {
  handleCancelItem = (item) => {
    const { formid } = this.props;
    const params = {
      id: item.id,
      formid,
    };
    const { dispatch } = this.props;
    dispatch(sagaActions.changeStatusRequest(cApiUrls.cancel_card, params));
  };

  handleVisibleAction = (item) => {
    if (item.status === 'cancel' || item.status === 'used') {
      return;
    }
    const cancelLabel = t1('cancel');
    const textCancelConfirm = t1('are_you_sure_you_want_to_do_this');
    return (
      <Confirm
        title={cancelLabel}
        textConfirm={textCancelConfirm}
        handleAction={() => this.handleCancelItem(item)}
      />
    );
  };

  render() {
    const { items } = this.props;

    const columns = [
      {
        title: t1('package'),
        key: 'package',
        dataIndex: 'package_name',
      },
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
      {
        title: t1('money'),
        key: 'money',
        dataIndex: 'money',
        render: (money) => displayVNMoney(money),
      },
      {
        title: t1('vmoney'),
        key: 'vmoney',
        dataIndex: 'vmoney',
      },
      {
        title: t1('action'),
        key: 'action',
        render: (item) => this.handleVisibleAction(item),
      },
    ];

    return (
      <AntdTable
        dataSource={items}
        columns={columns}
        pagination={false}
        childrenColumnName={null}
        rowKey="id"
        bordered
        className="white-background"
      />
    );
  }
}

export default connect()(Results);
