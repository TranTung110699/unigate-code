import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import IconButton from 'material-ui/IconButton';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import DisplayHtml from 'components/common/html';
import MUTags from 'schema-form/elements/tags';
import routes from 'routes';
import PropTypes from 'prop-types';
import ActionToggle from 'components/common/toggle/ActionToggle';
import { Link } from 'react-router-dom';
import AntTable from 'antd/lib/table';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

class Results extends Component {
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  render() {
    const { items, formid, ntype, isFeatureEnabled } = this.props;

    const nameLabel = t1('name');
    const idLabel = t1('id');
    const blogTypeLabel = t1('type');
    const categoryLabel = t1('category');
    const tagsLabel = t1('tags');
    const statusLabel = t1('status');
    const actionLabel = t1('action');
    const editPageLabel = t1('edit_page');
    const removeLabel = t1('remove');
    const textConfirm = t1('are_you_sure_you_want_to_do_this');
    const columns = [
      {
        title: blogTypeLabel,
        key: 'blogtype',
        dataIndex: 'blog_type',
      },
      {
        title: categoryLabel,
        key: 'category',
        dataIndex: 'category_name',
        render: (categoryName) => <DisplayHtml content={categoryName} />,
      },
      {
        title: nameLabel,
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: tagsLabel,
        key: 'tags',
        dataIndex: 'tags',
        render: (tags) => <MUTags tags={tags} />,
      },
      {
        title: statusLabel,
        key: 'status',
        dataIndex: 'status',
        render: (status, item) => (
          <ActionToggle
            baseURL={routes.url('node_update', {
              ...item,
              step: 'status',
              ntype: 'page',
            })}
            dataSet={this.actionToggleDataSet}
            value={status || 'queued'}
            name="status"
            noLabel
          />
        ),
      },
      {
        title: actionLabel,
        key: 'action',
        width: 160,
        render: (item) => (
          <>
            <Link to={`/admin/page/${item.iid}`}>
              <IconButton title={editPageLabel} iconClassName="mi mi-edit" />
            </Link>
            <DeleteItem
              title={removeLabel}
              textConfirm={textConfirm}
              formid={formid}
              ntype={ntype}
              itemId={item.id}
            />
            {item.link && (
              <Link to={`${item.link}`}>
                <IconButton
                  title={t1('preview')}
                  iconClassName="mi mi-remove-red-eye"
                />
              </Link>
            )}
          </>
        ),
      },
    ];

    return (
      <AntTable
        dataSource={items}
        columns={columns}
        rowKey="id"
        childrenColumnName={null}
        pagination={false}
        className={
          isFeatureEnabled(features.NEW_UI_JULY_2019)
            ? 'table-border-round'
            : 'white-background'
        }
      />
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default connect()(withFeatureFlags()(Results));
