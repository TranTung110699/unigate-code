import React, { Component } from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import { timestampToDateString } from 'common/utils/Date';
import lodashGet from 'lodash.get';
import { Link } from 'react-router-dom';
import LinkWithIcon from 'components/common/router/LinkWithIcon';
import DeleteBtn from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import routes from 'routes';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

import Table from 'antd/lib/table';

class Results extends Component {
  render() {
    const { items, formid, isFeatureEnabled } = this.props;
    const editLink = (item) =>
      routes.url(
        'node_edit',
        Object.assign(
          {
            ntype: 'training_plan',
          },
          item,
        ),
      );

    const width = {
      code: '15%',
      name: '40%',
      other: '9%',
      user: '12%',
      action: '6%',
    };

    const columns = [
      {
        title: t1('code'),
        key: 'code',
        dataIndex: 'code',
        width: width.code,
        render: (code, item) => <Link to={editLink(item)}>{code}</Link>,
      },
      {
        title: t1('name'),
        key: 'name',
        dataIndex: 'name',
        width: width.name,
        render: (name, item) => <Link to={editLink(item)}>{name}</Link>,
      },
      {
        title: t1('from_date'),
        key: 'start_date',
        dataIndex: 'start_date',
        width: width.other,
        className: 'text-center',
        render: (startDate) => timestampToDateString(startDate),
      },
      {
        title: t1('to_date'),
        key: 'end_date',
        dataIndex: 'end_date',
        width: width.other,
        className: 'text-center',
        render: (endDate) => timestampToDateString(endDate),
      },
      {
        title: t1('created_date'),
        key: 'created_date',
        dataIndex: 'ts',
        width: width.other,
        className: 'text-center',
        render: (timeStamp) => timestampToDateString(timeStamp),
      },
      {
        title: t1('created_by'),
        key: 'created_by',
        width: width.user,
        render: (item) => lodashGet(item, 'u.name'),
      },
      {
        title: t1('action'),
        key: 'action',
        width: width.action,
        render: (item) => (
          <React.Fragment>
            <LinkWithIcon icon="edit" to={editLink(item)} />{' '}
            <DeleteBtn
              formid={formid}
              ntype={'training_plan'}
              itemId={item.id}
            />
          </React.Fragment>
        ),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={items}
        pagination={false}
        rowKey="id"
        childrenColumnName={null}
        bordered={true}
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

export default withFeatureFlags()(Results);
