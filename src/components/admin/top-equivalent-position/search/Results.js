import React, { Component } from 'react';
import Table from 'antd/lib/table';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import apiUrls from 'api-endpoints';
import topEquivalentPositionApiUrls from 'components/admin/top-equivalent-position/endpoints';
import IconButton from 'material-ui/IconButton';
import routes from 'routes';
import { Link } from 'react-router-dom';

class Results extends Component {
  cssClass = 'admin-goal-tree-results';

  width = {
    actions: '20%',
  };

  render() {
    const { items, formid } = this.props;

    const columns = [
      {
        title: t1('code'),
        key: 'code',
        render: (item) => (
          <Link
            to={routes.url(
              'node_edit',
              Object.assign({}, item, {
                ntype: 'top_equivalent_position',
                step: 'info',
              }),
            )}
          >
            {item.CDANHTDUONG_EVN_CODE} <br />
          </Link>
        ),
      },
      {
        title: t1('name'),
        key: 'name',
        render: (item) => (
          <Link
            to={routes.url(
              'node_edit',
              Object.assign({}, item, {
                ntype: 'top_equivalent_position',
                step: 'info',
              }),
            )}
          >
            {item.CDANHTDUONG_EVN} <br />
          </Link>
        ),
      },
      {
        title: t1('actions'),
        key: 'action',
        width: this.width.actions,
        render: (item) => (
          <React.Fragment>
            <Link
              to={routes.url(
                'node_edit',
                Object.assign({}, item, {
                  ntype: 'top_equivalent_position',
                  step: 'info',
                }),
              )}
            >
              <IconButton title={t1('edit')} iconClassName="mi mi-edit" />
            </Link>
            <DeleteItem
              title={t1('delete')}
              textConfirm={t1('are_you_sure_you_want_to_delete_%s?', [
                t1(item.name),
              ])}
              formid={formid}
              itemId={item.id}
              alternativeApi={
                topEquivalentPositionApiUrls.evn_equivalent_position_delete
              }
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

export default Results;
