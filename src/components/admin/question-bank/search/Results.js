import React, { Component } from 'react';
import { connect } from 'react-redux';
import routes from 'routes';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import AntdTable from 'antd/lib/table';
import { Link } from 'react-router-dom';
import LinkWithIcon from 'components/common/router/LinkWithIcon';

class Results extends Component {
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  render() {
    const { items, formid } = this.props;

    const columns = [
      {
        title: t1('code'),
        key: 'code',
        dataIndex: 'code',
        render: (code, item) => (
          <Link
            to={routes.url(
              'node_edit',
              Object.assign(item, {
                step: 'dashboard',
                ntype: 'question-bank',
              }),
            )}
          >
            {code}
          </Link>
        ),
      },
      {
        title: t1('name'),
        key: 'name',
        dataIndex: 'name',
        render: (name, item) => (
          <Link
            to={routes.url(
              'node_edit',
              Object.assign(item, {
                step: 'dashboard',
                ntype: 'question-bank',
              }),
            )}
          >
            {name}
          </Link>
        ),
      },
      {
        title: t1('bank'),
        key: 'bank_questions_count',
        dataIndex: 'bank_questions_count',
      },
      {
        title: t1('organizations'),
        key: 'organizations',
        dataIndex: 'organizations',
        render: (origanizations, item) => (
          <div>
            {origanizations
              ? origanizations.map((origanization) => (
                  <div key={`${origanization.iid}-extpl`}>
                    {origanization.name}
                  </div>
                ))
              : null}
          </div>
        ),
      },
      {
        title: t1('approved'),
        key: 'status',
        dataIndex: 'status',
        render: (status) =>
          status === 'approved' ? t1('approved') : t1('queued'),
      },
      {
        title: t1('action'),
        key: 'action',
        render: (item) => (
          <React.Fragment>
            <LinkWithIcon
              className="m-r-10"
              icon="edit"
              href={routes.url(
                'node_edit',
                Object.assign(item, {
                  step: 'information',
                  ntype: 'question-bank',
                }),
              )}
            />
            <DeleteItem
              title={t1('delete')}
              textConfirm={t1('are_you_sure_you_want_to_do_this')}
              formid={formid}
              ntype={'question-bank'}
              itemId={item.id || item._id}
              iconButton
            />
          </React.Fragment>
        ),
      },
    ];
    return (
      <div className="table-result degree">
        <AntdTable
          dataSource={items}
          columns={columns}
          rowKey="id"
          bordered
          pagination={false}
          childrenColumnName={null}
          className="white-background"
        />
      </div>
    );
  }
}

export default connect()(Results);
