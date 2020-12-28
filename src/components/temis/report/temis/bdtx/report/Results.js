import React from 'react';
import AntdTable from 'antd/lib/table';
import lodashGet from 'lodash.get';
import AntInput from 'antd/lib/input';
import Tooltip from 'antd/lib/tooltip';

const Results = ({ items }) => {
  const columns = React.useMemo(
    () => [
      {
        key: 'module_name',
        title: 'Tên Mô đun',
        render: (row) => {
          return (
            <Tooltip title={lodashGet(row, 'text')}>
              {lodashGet(row, 'short_text') || lodashGet(row, 'text')}
            </Tooltip>
          );
        },
      },
      {
        key: 'total',
        title: 'Tổng số ý kiến (Người)',
        render: (row) => {
          return lodashGet(row, 'count.total') || 0;
        },
      },
      ...(() => {
        const fields = {
          FEMALE: 'female',
          DTTS: 'dtts',
        };

        const fieldToTitle = (field) => {
          return { [fields.FEMALE]: 'Nữ', [fields.DTTS]: 'DTTS' }[field];
        };
        return Object.values(fields).map((field) => {
          return {
            key: field,
            title: fieldToTitle(field),
            children: [
              {
                key: `${field}_number`,
                title: 'Số lượng (Người)',
                render: (row) => {
                  return lodashGet(row, ['count', field, 'number']) || 0;
                },
              },
              {
                key: `${field}_percent`,
                title: 'Tỷ lệ (%)',
                render: (row) => {
                  return `${lodashGet(row, ['count', field, 'percent']) || 0}%`;
                },
              },
            ],
          };
        });
      })(),
    ],
    [],
  );

  return (
    <div>
      <AntdTable
        columns={columns}
        dataSource={items}
        childrenColumnName={'answers'}
        pagination={false}
        size="middle"
        defaultExpandAllRows
      />
      <div
        style={{
          fontSize: 15,
          marginTop: 50,
        }}
      >
        Nội dung khác
      </div>
      <AntInput.TextArea rows={4} disabled />
    </div>
  );
};

export default Results;
