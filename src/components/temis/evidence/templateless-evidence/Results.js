import React from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import lodashGet from 'lodash.get';

import Table from 'antd/lib/table';
import Edit from './edit';
import ViewContent from 'components/temis/evidence/common/manage-content/ViewContent';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import apiUrls from 'components/temis/endpoints';
import {
  populateRowSpanInfoToRenderListOfItemAsTable,
  unwind,
} from 'common/utils/Array';

const Results = ({ items, searchFormId }) => {
  let rows = unwind(items, 'attach_to_assessments', 'attach_to_assessment');
  rows = populateRowSpanInfoToRenderListOfItemAsTable(rows, [
    'id',
    'attach_to_assessment',
  ]);

  const columns = [
    {
      title: t1('code'),
      key: 'code',
      render: (row) => {
        return {
          children: lodashGet(row, 'non_unique_code'),
          props: {
            rowSpan: lodashGet(row, ['rowSpans', 'id']),
          },
        };
      },
    },
    {
      title: t1('name'),
      key: 'name',
      render: (row) => {
        return {
          children: lodashGet(row, 'name'),
          props: {
            rowSpan: lodashGet(row, ['rowSpans', 'id']),
          },
        };
      },
    },
    {
      title: t1('description'),
      key: 'description',
      render: (row) => {
        return {
          children: lodashGet(row, 'description'),
          props: {
            rowSpan: lodashGet(row, ['rowSpans', 'id']),
          },
        };
      },
    },
    {
      title: t1('apply_to'),
      key: 'attach_to_assessment',
      children: [
        {
          title: 'Tiêu chuẩn',
          key: 'Tiêu chuẩn',
          render: (row) => {
            return lodashGet(row, 'attach_to_assessment.tieu_chuan.name');
          },
        },
        {
          title: 'Tiêu chí',
          key: 'Tiêu chí',
          render: (row) => {
            return lodashGet(row, 'attach_to_assessment.tieu_chi.name');
          },
        },
      ],
    },
    {
      title: t1('content'),
      width: '10%',
      key: 'content',
      render: (row) => {
        return {
          children: <ViewContent content={lodashGet(row, 'content')} />,
          props: {
            rowSpan: lodashGet(row, ['rowSpans', 'id']),
          },
        };
      },
    },
    {
      title: t1('actions'),
      width: '10%',
      key: 'actions',
      render: (row) => {
        return {
          children: (
            <div>
              <Edit
                key={lodashGet(row, 'id')}
                evidence={row}
                searchFormId={searchFormId}
              />
              <span style={{ paddingLeft: 10 }}> </span>
              <DeleteItem
                title={t1('delete')}
                formid={searchFormId}
                alternativeApi={apiUrls.delete_assessment_evidence}
                itemId={lodashGet(row, 'id')}
                iconButton
              />
            </div>
          ),
          props: {
            rowSpan: lodashGet(row, ['rowSpans', 'id']),
          },
        };
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={rows}
      pagination={false}
      childrenColumnName={null}
      className={'white-background'}
      bordered
      size="middle"
    />
  );
};

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default Results;
