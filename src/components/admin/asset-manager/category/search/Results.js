import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';

import routes from 'routes';
import { t1, t3 } from 'translate';
import apiUrls from 'api-endpoints';
import actions from 'actions/node/creators';
import Table from 'antd/lib/table';
import DisplayHtml from 'components/common/html';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import ActionToggle from 'components/common/toggle/ActionToggle';
import UpdateForm from '../new/Form';

class Results extends Component {
  iStyle = { fontSize: '21px' };
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  constructor(props) {
    super(props);
    this.updateItem = this.updateItem.bind(this);
  }

  updateItem(item) {
    const { dispatch } = this.props;
    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('edit_asset_category')}
        node={item}
        step=""
        alternativeApi="/category/index/update?type=asset"
        formid="edit_asset_category"
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_asset_category'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items, formid, ntype } = this.props;

    const columns = [
      {
        title: t1('type'),
        key: 'type',
        dataIndex: 'asset_type',
        render: (assetType) => t1(assetType),
      },
      {
        title: t1('code'),
        key: 'code',
        dataIndex: 'code',
        render: (code) => t3(code),
      },
      {
        title: t1('name'),
        key: 'name',
        dataIndex: 'name',
        render: (name) => t1(name),
      },
      {
        title: t1('description'),
        key: 'description',
        dataIndex: 'description',
        render: (description) => <DisplayHtml content={description} />,
      },
      {
        title: t1('status'),
        key: 'status',
        dataIndex: 'status',
        render: (status, item) => (
          <ActionToggle
            hideLabel
            baseURL={routes.url('node_update', {
              ...item,
              step: 'status',
              ntype: 'category',
            })}
            dataSet={this.actionToggleDataSet}
            value={status || 'queued'}
            name="status"
          />
        ),
      },
      {
        title: t1('action'),
        key: 'action',
        width: '160',
        render: (item) => (
          <React.Fragment>
            <IconButton
              title={t1('edit_asset_category')}
              iconClassName="mi mi-edit"
              onClick={() => this.updateItem(item)}
            />
            <DeleteItem
              title={t1('remove')}
              alternativeApi={apiUrls.category_delete}
              textConfirm={t1('are_you_sure_you_want_to_delete_%s?', [
                item.texts,
              ])}
              formid={formid}
              ntype={ntype}
              itemId={item.id}
            />
          </React.Fragment>
        ),
      },
    ];

    return (
      <div className="table-result">
        <Table
          columns={columns}
          dataSource={items}
          pagination={false}
          rowKey="id"
          childrenColumnName={null}
          className="white-background"
        />
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

Results.defaultProps = {
  items: [],
};

export default connect()(Results);
