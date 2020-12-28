import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'components/common/mui/FlatButton';
import PropTypes from 'prop-types';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog.js';
import actions from 'actions/node/creators';
import ActionToggle from 'components/common/toggle/ActionToggle';
import routes from 'routes';
import apiUrls from 'api-endpoints';

import Table from 'antd/lib/table';

import UpdateForm from '../new/Form';

class Results extends Component {
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
        node={item}
        step={'blog'}
        alternativeApi="/category/index/update?type=blog"
        formid="edit_blog"
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items, formid, ntype } = this.props;
    const blogCodeLabel = t1('blog_code');
    const blogNameLabel = t1('blog_name');
    const parentLabel = t1('parent');
    const phoneLabel = t1('phone');
    const actionsLabel = t1('actions');
    const editBlogLabel = t1('edit_blog');
    const removeLabel = t1('remove');
    const statusLabel = t1('approved');
    const textConfirm = t1('are_you_sure_you_want_to_do_this');

    const columns = [
      {
        title: blogCodeLabel,
        key: 'code',
        dataIndex: 'code',
        width: '10%',
        render: (code, item) => (
          <FlatButton onClick={() => this.updateItem(item)}>{code}</FlatButton>
        ),
      },
      {
        title: blogNameLabel,
        key: 'name',
        dataIndex: 'name',
        width: '20%',
      },
      {
        title: parentLabel,
        key: 'parent',
        dataIndex: 'parent',
        width: '20%',
        render: (parent) => parent && parent.name,
      },
      {
        title: phoneLabel,
        key: 'phone',
        dataIndex: 'phone',
        width: '20%',
      },
      {
        title: statusLabel,
        key: 'status',
        dataIndex: 'status',
        width: '10%',
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
        title: actionsLabel,
        key: 'action',
        width: '7%',
        render: (item) => (
          <React.Fragment>
            <IconButton
              title={editBlogLabel}
              iconClassName="mi mi-edit"
              onClick={() => this.updateItem(item)}
            />
            {item.parent && (
              <DeleteItem
                title={removeLabel}
                alternativeApi={apiUrls.category_delete}
                textConfirm={textConfirm}
                formid={formid}
                ntype={ntype}
                itemId={item.id}
              />
            )}
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
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default connect()(Results);
