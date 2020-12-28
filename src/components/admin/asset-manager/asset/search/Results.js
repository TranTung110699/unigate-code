import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { t1, t3 } from 'translate';
import actions from 'actions/node/creators';
import DisplayHtml from 'components/common/html';
import IconButton from 'material-ui/IconButton';
import Table from 'antd/lib/table';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';

import UpdateForm from '../new/Form';

class Results extends Component {
  iStyle = { fontSize: '21px' };

  updateItem(item) {
    const { dispatch } = this.props;
    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('edit_asset')}
        node={item}
        step=""
        formid="edit_asset"
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_asset'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  showCategoriesList = (list) => {
    if (Array.isArray(list))
      return list.map((category) => <DisplayHtml content={category.name} />);
    return null;
  };

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
        title: t1('category'),
        key: 'category',
        dataIndex: 'detailed_asset_category',
        render: (detailedAssetCategory) =>
          detailedAssetCategory && detailedAssetCategory.name,
      },
      {
        title: t1('code'),
        key: 'code',
        dataIndex: 'code',
        render: (code) => t3(code),
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
        render: (status) => t1(status),
      },
      {
        title: t1('assigned_user'),
        key: 'assigned_user',
        dataIndex: 'pic',
        render: (pic) => (pic || []).map((person) => <div>{person.name}</div>),
      },
      {
        title: t1('action'),
        key: 'action',
        width: '160',
        render: (item) => (
          <React.Fragment>
            <IconButton
              title={t1('edit_blog')}
              iconClassName="mi mi-edit"
              onClick={() => this.updateItem(item)}
            />
            <DeleteItem formid={formid} ntype={ntype} itemId={item.id} />
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
