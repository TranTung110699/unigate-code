import React from 'react';
import { t1 } from 'translate';
import AntdTable from 'antd/lib/table';
import { timestampToDateString } from 'common/utils/Date';
import lodashGet from 'lodash.get';

const SpecializedWorkTimeSheetSearchResults = ({ items }) => (
  <AntdTable
    columns={[
      { title: t1('stt'), dataIndex: 'stt', key: 'stt' },
      { title: t1('name'), dataIndex: 'user.name', key: 'user.name' },
      {
        title: t1('contract_code'),
        dataIndex: 'current_contract_info.code',
        key: 'current_contract_info.code',
      },
      {
        title: t1('contract_type'),
        dataIndex: 'current_contract_info.is_full_time_teacher',
        key: 'current_contract_info.is_full_time_teacher',
        render: (isFullTimeTeacher, record) => {
          if (!lodashGet(record, 'current_contract_info')) {
            return '';
          }
          return isFullTimeTeacher ? t1('full_time') : t1('part_time');
        },
      },
      {
        title: t1('contract_date'),
        children: [
          {
            title: t1('start_date'),
            dataIndex: 'current_contract_info.start_date',
            key: 'current_contract_info.start_date',
            render: (startDate) => timestampToDateString(startDate),
          },
          {
            title: t1('end_date'),
            dataIndex: 'current_contract_info.end_date',
            key: 'current_contract_info.end_date',
            render: (endDate) => timestampToDateString(endDate),
          },
        ],
      },
      {
        title: t1('teaching_hours'),
        children: [
          {
            title: t1('teaching'),
            dataIndex: 'teaching_hours.teaching',
            key: 'teaching_hours.teaching',
          },
          {
            title: t1('converted_from_specialized_hours'),
            dataIndex: 'teaching_hours.converted_from_specialized_hours',
            key: 'teaching_hours.converted_from_specialized_hours',
          },
          {
            title: t1('total'),
            dataIndex: 'teaching_hours.total',
            key: 'teaching_hours.total',
          },
        ],
      },
    ]}
    dataSource={items}
    pagination={false}
    bordered
  />
);

export default SpecializedWorkTimeSheetSearchResults;
