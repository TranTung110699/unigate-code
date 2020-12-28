import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import DisplayHtml from 'components/common/html';
import { timestampToDateString } from 'common/utils/Date';
import { getUrl } from 'routes/links/common';
import { Link } from 'react-router-dom';
import AntTable from 'antd/lib/table';
import get from 'lodash.get';

class Results extends Component {
  render() {
    const { items } = this.props;

    const columns = [
      {
        title: t1('user_information'),
        className: 'text-center',
        children: [
          {
            title: t1('user'),
            key: 'user',
            dataIndex: 'u',
            render: (user) => (
              <>
                {user && user.name} <br />
                {user && user.code && `(${user && user.code})`}
              </>
            ),
          },
          {
            title: t1('mail'),
            key: 'user',
            dataIndex: 'u',
            render: ({ mail }) => mail,
          },
          {
            title: t1('organization_information'),
            className: 'text-center',
            children: [
              {
                title: t1('name'),
                key: 'user',
                dataIndex: 'u',
                render: (user) =>
                  get(user, '__expand.user_organizations.0.name'),
              },
              {
                title: t1('province'),
                key: 'user',
                dataIndex: 'u',
                render: (user) =>
                  get(
                    user,
                    '__expand.user_organizations.0.__expand.org_province_id.name',
                  ),
              },
              {
                title: t1('district'),
                key: 'user',
                dataIndex: 'u',
                render: (user) =>
                  get(
                    user,
                    '__expand.user_organizations.0.__expand.org_district_id.name',
                  ),
              },
            ],
          },
        ],
      },
      {
        title: t1('answer'),
        key: 'answer',
        dataIndex: 'answer',
        render: (answer) => <DisplayHtml content={answer ? answer : ''} />,
      },
      {
        title: t1('course'),
        key: 'course',
        render: (item) => (
          <Link to={getUrl(`course/${item.item_iid}`)}>{item.course_name}</Link>
        ),
      },
      {
        title: t1('time'),
        key: 'time',
        dataIndex: 'ts',
        render: (ts) => timestampToDateString(ts, { showTime: true }),
      },
    ];

    return (
      <div className="table-result">
        <AntTable
          dataSource={Array.isArray(items) ? items : []}
          columns={columns}
          pagination={false}
          childrenColumnName={null}
          rowKey="id"
          className="white-background"
          bordered
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
