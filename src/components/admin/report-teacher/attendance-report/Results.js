import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate';
import { timestampToDateString } from 'common/utils/Date';

class Results extends Component {
  render() {
    const { items } = this.props;
    const columns = [
      {
        title: t1('stt'),
        key: 'id',
        render: (text, row, index) => ({
          children: index + 1,
          props: {
            className: 'text-center',
          },
        }),
      },
      {
        title: t1('code'),
        key: 'code',
        dataIndex: 'user.code',
      },
      {
        title: t1('last_name'),
        key: 'last_name',
        dataIndex: 'user.last_name',
      },
      {
        title: t1('first_name'),
        key: 'first_name',
        dataIndex: 'user.first_name',
      },
      {
        title: t1('birthday'),
        key: 'birthday',
        dataIndex: 'user.birthday',
        render: (birthday) => timestampToDateString(birthday),
      },
      {
        title: t1('phone'),
        key: 'phone',
        dataIndex: 'user.phone',
      },
      {
        title: t1('subject'),
        key: 'subject',
        dataIndex: 'subject.name',
      },
      {
        title: t1('course'),
        key: 'course',
        dataIndex: 'course.name',
      },
      {
        title: t1('semester'),
        key: 'semester',
        dataIndex: 'semester.name',
      },
      {
        title: t1('school_year'),
        key: 'school_year',
        dataIndex: 'school_year.name',
      },
      {
        title: t1('training_mode'),
        key: 'training_mode',
        dataIndex: 'course.training_mode',
        render: (text) => t1(text),
      },
      {
        title: t1('major'),
        key: 'major',
        dataIndex: 'major.name',
      },
      {
        title: t1('ico'),
        key: 'ico',
        dataIndex: 'ico.name',
      },
      {
        title: t1('number_of_absences'),
        key: 'number_of_absences',
        dataIndex: 'number_of_absences',
        render: (text) => text || '0',
      },
      {
        title: t1('note'),
        key: 'note',
        dataIndex: 'note',
      },
    ];
    return (
      <AntdTable
        columns={columns}
        dataSource={items}
        pagination={false}
        bordered
        size="middle"
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

export default Results;
