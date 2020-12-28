import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntdTable from 'antd/lib/table';
import get from 'lodash.get';
import { t1 } from 'translate';

class Results extends Component {
  render() {
    const { items, page } = this.props;
    const position =
      (parseInt(get(page, 'page', 0)) - 1) *
      parseInt(get(page, 'items_per_page', 0));
    const columns = [
      {
        title: t1('stt'),
        key: 'id',
        render: (text, row, index) => ({
          children: index + 1 + position,
          props: {
            className: 'text-center',
          },
        }),
      },
      {
        title: t1('training_mode'),
        key: 'training_mode',
        dataIndex: 'training_mode',
        render: (text) => t1(text),
      },
      {
        title: t1('ico'),
        key: 'ico',
        dataIndex: 'ico.name',
      },
      {
        title: t1('major'),
        key: 'major',
        dataIndex: 'major.name',
      },
      {
        title: t1('school_year'),
        key: 'school_year',
        dataIndex: 'school_year.name',
      },
      {
        title: t1('semester'),
        key: 'semester',
        dataIndex: 'semester.name',
      },
      {
        title: t1('subject'),
        key: 'subject',
        dataIndex: 'subject.name',
      },
      {
        title: t1('number_of_students'),
        key: 'number_of_students',
        dataIndex: 'number_of_students',
      },
      {
        title: t1('number_of_students_ban_exam'),
        key: 'number_of_students_ban_exam',
        dataIndex: 'number_of_students_ban_exam',
      },
      {
        title: t1('number_of_students_taking_exam'),
        key: 'number_of_students_taking_exam',
        dataIndex: 'number_of_students_taking_exam',
      },
      {
        title: t1('number_of_students_passed'),
        key: 'number_of_students_passed',
        dataIndex: 'number_of_students_passed',
      },
      {
        title: t1('number_of_students_failed'),
        key: 'number_of_students_failed',
        dataIndex: 'number_of_students_failed',
      },
      {
        title: t1('max_score'),
        key: 'max_score',
        dataIndex: 'max_score',
        render: (text) => text || '0',
      },
      {
        title: t1('min_score'),
        key: 'min_score',
        dataIndex: 'min_score',
        render: (text) => text || '0',
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
