import React from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import lodashGet from 'lodash.get';

import Table from 'antd/lib/table';
import ViewContent from 'components/temis/evidence/common/manage-content/ViewContent';
import New from './new';
import Edit from './edit';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import apiUrls from 'components/temis/endpoints';
import './Results.scss';

import {
  populateRowSpanInfoToRenderListOfItemAsTable,
  unwind,
} from 'common/utils/Array';

const getTemplateFromRow = (row) => {
  return lodashGet(row, 'template');
};

const Results = ({ items, searchFormId }) => {
  let rows = unwind(
    items,
    'attach_to_owner_assessments',
    'attach_to_owner_assessment',
  );
  rows = populateRowSpanInfoToRenderListOfItemAsTable(rows, [
    'template.id',
    'attach_to_owner_assessment',
  ]);

  const columns = [
    {
      title: t1('code'),
      key: 'code',
      render: (row) => {
        return {
          children: lodashGet(getTemplateFromRow(row), 'non_unique_code'),
          props: {
            rowSpan: lodashGet(row, ['rowSpans', 'template.id']),
          },
        };
      },
    },
    {
      title: t1('name'),
      key: 'name',
      render: (row) => {
        return {
          children: lodashGet(getTemplateFromRow(row), 'name'),
          props: {
            rowSpan: lodashGet(row, ['rowSpans', 'template.id']),
          },
        };
      },
    },
    {
      title: t1('description'),
      key: 'description',
      render: (row) => {
        return {
          children: lodashGet(getTemplateFromRow(row), 'description'),
          props: {
            rowSpan: lodashGet(row, ['rowSpans', 'template.id']),
          },
        };
      },
    },
    {
      title: t1('apply_to'),
      key: 'attach_to_owner_assessment',
      children: [
        {
          title: 'Tiêu chuẩn',
          key: 'Tiêu chuẩn',
          render: (row) => {
            return lodashGet(row, 'attach_to_owner_assessment.tieu_chuan.name');
          },
        },
        {
          title: 'Tiêu chí',
          key: 'Tiêu chí',
          render: (row) => {
            return lodashGet(row, 'attach_to_owner_assessment.tieu_chi.name');
          },
        },
      ],
    },
    {
      title: t1('sample_content'),
      key: 'sample_content',
      width: '10%',
      render: (row) => {
        return {
          children: (
            <ViewContent
              content={lodashGet(getTemplateFromRow(row), 'sample_content')}
            />
          ),
          props: {
            rowSpan: lodashGet(row, ['rowSpans', 'template.id']),
          },
        };
      },
    },
    {
      title: t1('my_evidence'),
      width: '10%',
      key: 'my_evidence',
      render: (row) => {
        return {
          children: (() => {
            const evidences = lodashGet(row, 'evidences') || [];

            if (evidences.length === 0) {
              return (
                <New
                  template={getTemplateFromRow(row)}
                  searchFormId={searchFormId}
                />
              );
            }

            return evidences.map((e) => {
              return (
                <div>
                  <Edit
                    key={lodashGet(e, 'id')}
                    evidence={e}
                    searchFormId={searchFormId}
                  />
                  <span style={{ paddingLeft: 10 }}> </span>
                  <DeleteItem
                    title={t1('delete')}
                    formid={searchFormId}
                    alternativeApi={apiUrls.delete_assessment_evidence}
                    itemId={lodashGet(e, 'id')}
                    iconButton
                  />
                </div>
              );
            });
          })(),
          props: {
            rowSpan: lodashGet(row, ['rowSpans', 'template.id']),
          },
        };
      },
    },
  ];

  return (
    <Table
      rowClassName={(row) => {
        const evidences = lodashGet(row, 'evidences') || [];
        if (evidences.length !== 0) {
          return 'temis-evidence-from-template-table-row-has-evidence';
        }
        return undefined;
      }}
      columns={columns}
      dataSource={rows}
      pagination={false}
      bordered
      childrenColumnName={null}
      className={'white-background'}
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
