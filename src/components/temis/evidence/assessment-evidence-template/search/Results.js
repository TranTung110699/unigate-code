import React from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';

import Table from 'antd/lib/table';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import lodashGet from 'lodash.get';
import apiUrls from 'components/temis/endpoints';
import Edit from 'components/temis/evidence/assessment-evidence-template/edit';

const Results = ({ items, searchFormId }) => {
  const columns = [
    {
      title: t1('code'),
      key: 'non_unique_code',
      dataIndex: 'non_unique_code',
    },
    {
      title: t1('name'),
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: t1('description'),
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: t1('actions'),
      width: '10%',
      key: 'actions',
      render: (row) => {
        return (
          <>
            <Edit
              key={lodashGet(row, 'id')}
              evidenceTemplate={row}
              searchFormId={searchFormId}
            />
            <span style={{ paddingLeft: 10 }} />
            <DeleteItem
              title={t1('delete')}
              formid={searchFormId}
              alternativeApi={apiUrls.delete_assessment_evidence_template}
              itemId={lodashGet(row, 'id')}
              iconButton
            />
          </>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={items}
      pagination={false}
      rowKey="id"
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
