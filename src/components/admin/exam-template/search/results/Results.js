import React, { Component } from 'react';
import { connect } from 'react-redux';
import routes from 'routes';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';
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
              Object.assign(item, { step: 'dashboard' }),
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
              Object.assign(item, { step: 'dashboard' }),
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
      // {
      //   title: t1('skills'),
      //   key: 'skills',
      //   dataIndex: 'skills',
      //   render: (skills) => (
      //     <ul>
      //       {skills
      //         ? skills.map((skill) => <li key={skill.iid}>{skill.name}</li>)
      //         : null}
      //     </ul>
      //   ),
      // },
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
        width: '160',
        render: (item) => (
          <React.Fragment>
            <LinkWithIcon
              icon="edit"
              href={routes.url(
                'node_edit',
                Object.assign(item, { step: 'information' }),
              )}
            />
            <DeleteItem
              title={t1('delete')}
              textConfirm={t1('are_you_sure_you_want_to_do_this')}
              formid={formid}
              ntype={'exam-template'}
              itemId={item.id}
              iconButton
            />
          </React.Fragment>
        ),
      },
    ];
    return (
      <div className="table-result degree">
        <Table
          dataSource={items}
          columns={columns}
          rowKey="id"
          pagination={false}
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
