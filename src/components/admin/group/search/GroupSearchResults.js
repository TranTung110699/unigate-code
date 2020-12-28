import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1 } from 'translate/index';
import Table from 'antd/lib/table';
import IconButton from 'material-ui/IconButton';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import routes from 'routes/index';
import { Link } from 'react-router-dom';
import NodeNew from 'components/admin/node/new/index';
import actions from 'actions/node/creators';
import { categoryRelationTypes } from 'configs/constants/index';
import { timestampToDateString } from 'common/utils/Date';
import userGroupSchema from 'components/admin/group/schema/form';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';

class GroupSearchResults extends Component {
  handleOnClick = (node) => {
    const { dispatch, formid } = this.props;

    const contentDialog = (
      <NodeNew
        ntype={'group'}
        schema={userGroupSchema(node && node.type ? { type: node.type } : {})}
        mode={'edit'}
        step={'request_category'}
        alternativeApi={'/category/index/update'}
        node={node}
        formid={`edit-category-${node.iid}`}
        searchFormId={formid}
      />
    );

    const optionsProperties = {
      handleClose: true,

      title: t1(`edit_${node && node.type}`),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { items, formid, isSIS, type, renderResultActions } = this.props;
    const editLabel = t1('edit_user_group');
    const removeLabel = t1('remove');
    const textConfirm = t1('are_you_sure_you_want_to_do_this');
    const isSeniorGroup =
      type &&
      [
        categoryRelationTypes.ADMISSION,
        categoryRelationTypes.STUDENT_RECOGNITION,
        categoryRelationTypes.FINISHING_SENIOR,
        categoryRelationTypes.GRADUATING_SENIOR,
        categoryRelationTypes.EXPULSION_GROUP,
      ].includes(type);
    const width = {
      code: '20%',
    };

    const columns = [
      {
        title: t1('code'),
        key: 'code',
        dataIndex: 'code',
        width: width.code,
        render: (code, item) => (
          <React.Fragment>
            {code} <span className="text-muted">{item.iid}</span>
          </React.Fragment>
        ),
      },
      {
        title: t1('name'),
        key: 'name',
        dataIndex: 'name',
      },
      ...(!isSIS
        ? []
        : isSeniorGroup
        ? [
            {
              title: t1('created_user'),
              key: 'u',
              dataIndex: 'u',
              render: (user) => (user.name ? user.name : ''),
            },
            {
              title: t1('approved_user'),
              key: 'change_status_author',
              dataIndex: 'change_status_author',
              render: (change_status_author = {}) => {
                return change_status_author.name;
              },
            },
          ]
        : [
            {
              title: t1('type'),
              key: 'type',
              dataIndex: 'type',
              render: (type) => t1(type),
            },
            {
              title: t1('target_groups'),
              key: 'smart',
              dataIndex: 'smart',
              render: (smart) => (smart ? t1('smart') : t1('manual')),
            },
          ]),
      ...(!isSIS
        ? [
            {
              title: t1('organizations'),
              key: 'organizations',
              dataIndex: 'organizations',
              render: (org, item) => (
                <div>
                  {item &&
                  item.__expand &&
                  item.__expand.organizations &&
                  item.__expand.organizations.length ? (
                    <OrganizationsOrPhongBan
                      item={item}
                      attr={'organizations'}
                    />
                  ) : null}
                </div>
              ),
            },
          ]
        : []),
      {
        title: t1('members'),
        key: 'members',
        dataIndex: 'current_members',
        render: (members) => members || 0,
      },
      {
        title: t1('created_at'),
        key: 'created_at',
        dataIndex: 'ts',
        render: (timestamp) => timestampToDateString(timestamp),
      },
      {
        title: t1('action'),
        width: 150,
        key: 'action',
        dataIndex: 'action',
        render: (text, item) =>
          renderResultActions ? (
            renderResultActions(item)
          ) : (
            <React.Fragment>
              <IconButton
                title={editLabel}
                iconClassName="mi mi-edit"
                containerElement={
                  <Link
                    to={routes.url(
                      'node_edit',
                      Object.assign({}, item, {
                        ntype: 'group',
                        step: 'members',
                      }),
                    )}
                  />
                }
              />
              {/*<Link to={routes.url(
                'node_edit',
                Object.assign({}, item, {
                  ntype: 'group',
                  step: 'members',
                }),
              )}>
                <Tooltip placement="top" title={editLabel}>
                  <Button
                    type="link"
                    icon="edit"
                  />
                </Tooltip></Link>
                {' '}*/}
              <DeleteItem
                textConfirm={textConfirm}
                formid={formid}
                ntype="category"
                itemId={item.id}
                title={removeLabel}
              />
            </React.Fragment>
          ),
      },
    ];
    return (
      <div className="table-result">
        <Table
          dataSource={items}
          columns={columns}
          pagination={false}
          className="white-background"
          childrenColumnName={null}
          rowKey="id"
        />
      </div>
    );
  }
}

GroupSearchResults.propTypes = {
  formid: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

GroupSearchResults.defaultProps = {
  formid: 'category_group_search_result',
  items: [],
};

export default connect()(withSchoolConfigs(GroupSearchResults));
