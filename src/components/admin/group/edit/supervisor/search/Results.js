import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { relationTypes } from 'configs/constants';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import apiUrls from '../../../endpoints';
import Table from 'antd/lib/table';
import PreviewUserInDialog from 'components/admin/user/account/common/PreviewInDialog';

/**
 * supervisor result
 * @param {object} items
 * @param {object} node
 * @param {string} searchFormId
 * @returns {JSX.Element}
 * @constructor
 */
function Results({ items, node, searchFormId }) {
  const columns = [
    {
      title: t1('iid'),
      key: 'iid',
      render: ({ supervisor = {} }) => supervisor.iid,
    },
    {
      title: t1('name'),
      key: 'name',
      render: ({ supervisor = {} }) => (
        <PreviewUserInDialog user={supervisor} field="name" showAvatar />
      ),
    },
    {
      title: t1('contact'),
      key: 'contact',
      render: ({ supervisor = {} }) => (
        <div>
          {`${supervisor.phone || ''} \n`}
          {supervisor.mail || ''}
        </div>
      ),
    },
    {
      title: t1('action'),
      key: 'action',
      render: ({ supervisor = {} }) => (
        <DeleteItem
          item={supervisor}
          alternativeApi={apiUrls.remove_supervisor}
          formid={searchFormId}
          params={{
            supervisor_iids: [supervisor.iid],
            group_iid: node.iid,
          }}
        />
      ),
    },
  ];

  return (
    <div className="table-result">
      <Table
        rowKey="iid"
        columns={columns}
        dataSource={items}
        pagination={false}
        childrenColumnName={null}
        bordered
        className="white-background"
      />
    </div>
  );
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  searchFormId: PropTypes.string,
};

Results.defaultProps = {
  items: [],
  searchFormId: '',
};

export default connect()(Results);
