import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import DisplayHtml from 'components/common/html';
import sagaActions from 'actions/admin/card/saga-creators';
// import apiUrls from 'api-endpoints';
import cApiUrls from 'components/admin/card/endpoints';
import Confirm from 'components/admin/card/Confirm';
import Links from 'routes/links';
import { Link } from 'react-router-dom';
import actions from 'actions/node/creators';
import EditForm from 'components/admin/card/new-card-package/Form';
import Status from './Status';
import AntTable from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import styled from 'styled-components';
import { displayVNMoney } from '../../../../common/utils/money';

const ActionsWrapper = styled.div`
  .anticon {
    font-size: 18px;
  }
`;

class Results extends Component {
  handleCancelItem = (item) => {
    const params = {
      iid: item.iid,
      formid: 'card_list',
    };
    const { dispatch } = this.props;
    dispatch(sagaActions.changeStatusRequest(cApiUrls.cancel_package, params));
  };
  handleGenerateItem = (item) => {
    const params = {
      id: item.id,
      formid: 'card_list',
    };
    const { dispatch } = this.props;
    dispatch(sagaActions.changeStatusRequest(cApiUrls.generate_card, params));
  };
  handleEditItem = (item) => {
    const { dispatch } = this.props;
    const contentDialog = (
      <EditForm
        node={item}
        title={t1('edit_package')}
        ntype="new_package"
        mode="edit"
        searchFormId="card_list"
        formid="edit_package"
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };
  // return status: true => view else status: false => Generate card
  isStatusView = (item) => item.cards && item.cards.length > 0;
  showAction = (item) => {
    if (item && item.is_cancel) {
      return '';
    }
    const viewLabel = t1('view');
    const generateLabel = t1('generate');
    const editLabel = t1('edit');
    const cancelLabel = t1('cancel');
    const textCancelConfirm = t1('are_you_sure_you_want_to_do_this');

    return (
      <ActionsWrapper>
        {this.isStatusView(item) ? (
          <Link to={Links.viewCardPackage(item.iid, true)} title={viewLabel}>
            <Icon type="eye" />
          </Link>
        ) : (
          <Icon
            title={generateLabel}
            type="barcode"
            onClick={() => this.handleGenerateItem(item)}
          />
        )}
        <Icon
          title={editLabel}
          onClick={() => this.handleEditItem(item)}
          type="edit"
          className="m-l-10 m-r-10"
        />
        <Confirm
          title={cancelLabel}
          textConfirm={textCancelConfirm}
          handleAction={() => this.handleCancelItem(item)}
        />
      </ActionsWrapper>
    );
  };

  getColumns = () => {
    return [
      { title: t1('iid'), key: 'iid', dataIndex: 'iid' },
      {
        title: t1('date_created'),
        key: 'date_created',
        dataIndex: 'date_create',
      },
      {
        title: t1('name'),
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: t1('money'),
        key: 'money',
        dataIndex: 'money',
        render: (money) => displayVNMoney(money),
      },
      { title: t1('vmoney'), key: 'vmoney', dataIndex: 'vmoney' },
      {
        title: t1('total_card'),
        key: 'total_card',
        dataIndex: 'counter.total_card',
      },
      {
        title: t1('description'),
        key: 'description',
        dataIndex: 'description',
        render: (description) => (
          <DisplayHtml
            content={description}
            className="question-content__text"
          />
        ),
      },
      {
        title: t1('status'),
        key: 'status',
        render: (item) =>
          item && item.is_cancel ? (
            <i>{t1('canceled')}</i>
          ) : (
            <Status item={item} />
          ),
      },
      {
        title: t1('action'),
        key: 'action',
        render: (item) => this.showAction(item),
      },
    ];
  };

  render() {
    const { items, formid, ntype } = this.props;

    return (
      <AntTable
        columns={this.getColumns()}
        dataSource={items}
        rowKey="iid"
        pagination={false}
        childrenColumnName={null}
        className="white-background"
        bordered
      />
    );
  }
}

export default connect()(Results);
