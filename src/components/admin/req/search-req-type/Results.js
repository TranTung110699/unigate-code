import React, { Fragment } from 'react';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate';
import get from 'lodash.get';
import Icon from 'components/common/Icon';
import './styleheet.scss';
import routes from 'routes';
import ActionToggle from 'components/common/toggle/ActionToggle';
import schema from '../schema/request-type-schema-form';
import Attachment from '../common/Attachment';
import actions from 'actions/node/creators';
import NodeNew from 'components/admin/node/new';

const status = { on: 'approved', off: 'queued' };

class Results extends React.Component {
  getDefaultProcessor = (requestType) => {
    const processorTypes = [];
    if (get(requestType, 'processor.org_iids.length', 0) > 0) {
      processorTypes.push('org_iids');
    }
    if (get(requestType, 'processor.positions.length', 0) > 0) {
      processorTypes.push('positions');
    }
    if (get(requestType, 'processor.user_iids.length', 0) > 0) {
      processorTypes.push('user_iids');
    }
    return processorTypes;
  };

  handleEdit = (row) => {
    const { dispatch, formid } = this.props;
    const processorType = this.getDefaultProcessor(row);
    const processor = get(row, 'processor', {});
    const node = { ...row, processor: { ...processor, type: processorType } };

    const contentDialog = (
      <NodeNew
        ntype="request-type"
        schema={schema}
        formid={'edit-request-type'}
        mode={'edit'}
        node={node}
        closeModal
        searchFormId={formid}
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_request_type'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  getColumns = () => [
    {
      title: t1('name'),
      key: 'name',
      width: 70,
      dataIndex: 'name',
    },
    {
      title: t1('type'),
      key: 'type',
      width: 100,
      dataIndex: 'type',
    },
    {
      title: t1('processor'),
      key: 'processor',
      width: 150,
      render: (text, row) => {
        return (
          <div className="processor">
            <Processor
              items={get(row, 'processor.processor_organizations')}
              label={t1('organizations')}
            />
            <Processor
              items={get(row, 'processor.processor_positions')}
              label={t1('job_position')}
            />
            <Processor
              items={get(row, 'processor.processor_users')}
              label={t1('user_processor')}
            />
          </div>
        );
      },
    },
    {
      title: t1('template'),
      key: 'template',
      width: 250,
      render: (text, row) => (
        <Attachment attachments={get(row, 'attachments')} />
      ),
    },
    {
      title: t1('status'),
      key: 'status',
      width: 50,
      render: (text, row) => (
        <ActionToggle
          readOnlyLabelSet={status}
          hideLabel
          baseURL={routes.url('node_update', {
            ...row,
            step: 'status',
            ntype: 'request-type',
          })}
          dataSet={status}
          value={row.status || 'queued'}
          name="status"
        />
      ),
    },
    {
      title: t1('action'),
      key: 'action',
      width: 50,
      render: (text, row) => (
        <Fragment>
          <Icon
            icon="edit"
            style={{ cursor: 'pointer', padding: 10 }}
            onClick={() => {
              this.handleEdit(row);
            }}
          />
          <Icon
            icon="delete"
            type="platButton"
            style={{ cursor: 'pointer', padding: 10 }}
            onClick={() => {
              this.handleDelete(row);
            }}
          />
        </Fragment>
      ),
    },
  ];

  render() {
    const { items, index } = this.props;

    return (
      <div className="req-type-container">
        <AntdTable
          columns={this.getColumns()}
          dataSource={items}
          pagination={false}
          bordered
          size="middle"
        />
      </div>
    );
  }
}

const Processor = ({ items, label }) => {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return null;
  }
  return (
    <Fragment>
      <span className="title">{label}:</span>
      {items.map((item) =>
        item ? (
          <Fragment>
            <span>&emsp;- {item.name}</span>
            <br />
          </Fragment>
        ) : null,
      )}
    </Fragment>
  );
};

export default Results;
