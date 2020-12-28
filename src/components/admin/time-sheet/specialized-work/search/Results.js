import React from 'react';
import { t1 } from 'translate';
import AntdTable from 'antd/lib/table';
import {
  timestampToDateString,
  timestampToDateTimeString,
} from 'common/utils/Date';
import lodashGet from 'lodash.get';
import StatusToggle from 'components/admin/time-sheet/common/StatusToggle';
import ButtonEdit from 'components/admin/time-sheet/specialized-work/edit/ButtonEdit';
import ButtonDelete from 'components/admin/time-sheet/specialized-work/delete/ButtonDelete';

const SpecializedWorkTimeSheetSearchResults = ({ data, searchFormId }) => (
  <AntdTable
    columns={[
      { title: t1('stt'), dataIndex: 'stt', key: 'stt' },
      { title: t1('name'), dataIndex: 'user.name', key: 'user.name' },
      {
        title: t1('contract_code'),
        dataIndex: '__expand.current_contract_info.code',
        key: '__expand.current_contract_info.code',
      },
      {
        title: t1('contract_type'),
        dataIndex: '__expand.current_contract_info.is_full_time_teacher',
        key: '__expand.current_contract_info.is_full_time_teacher',
        render: (isFullTimeTeacher) => {
          return isFullTimeTeacher ? t1('full_time') : t1('part_time');
        },
      },
      {
        title: t1('contract_date'),
        children: [
          {
            title: t1('start_date'),
            dataIndex: '__expand.current_contract_info.start_date',
            key: '__expand.current_contract_info.start_date',
            render: (startDate) => timestampToDateString(startDate),
          },
          {
            title: t1('end_date'),
            dataIndex: '__expand.current_contract_info.end_date',
            key: '__expand.current_contract_info.end_date',
            render: (endDate) => timestampToDateString(endDate),
          },
        ],
      },
      {
        title: t1('specialized_work_details'),
        children: [
          {
            title: t1('time'),
            dataIndex: 'time',
            key: 'time',
            render: (time) => timestampToDateTimeString(time),
          },
          {
            title: t1('duration_in_hours'),
            dataIndex: 'duration',
            key: 'duration',
          },
          {
            title: t1('convert_to_teaching_hours'),
            dataIndex: 'convert_to_teaching_hours',
            key: 'convert_to_teaching_hours',
            render: (text, record) => {
              const duration = lodashGet(record, 'duration');
              const conversionRate = lodashGet(
                record,
                '__expand.current_contract_info.specialize_to_teaching_hours_conversion_rate',
              );

              const convertToTeachingHours = duration * conversionRate;

              return isNaN(convertToTeachingHours)
                ? t1('n/a')
                : convertToTeachingHours.toFixed(3);
            },
          },
          {
            title: t1('work'),
            dataIndex: 'name',
            key: 'name',
          },
        ],
      },
      {
        title: t1('approved'),
        dataIndex: 'status',
        key: 'status',
        render: (status, record) => (
          <StatusToggle node={record} searchFormId={searchFormId} />
        ),
      },
      {
        title: t1('action'),
        dataIndex: 'action',
        key: 'action',
        render: (status, record) => (
          <React.Fragment>
            <ButtonEdit node={record} searchFormId={searchFormId} />
            <ButtonDelete
              className="m-l-10 m-r-10"
              node={record}
              searchFormId={searchFormId}
            />
          </React.Fragment>
        ),
      },
    ]}
    dataSource={data}
    pagination={false}
    bordered
  />
);

export default SpecializedWorkTimeSheetSearchResults;
