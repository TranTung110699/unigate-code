import React, { Fragment } from 'react';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import AntdTable from 'antd/lib/table';
import get from 'lodash.get';
import { eventTypeToText } from 'configs/constants';
import EventTime from 'components/admin/event/common/EventTime';
import EventLocation from 'components/admin/event/common/EventLocation';

const Results = ({ items }) => {
  const columns = [
    {
      title: t1('iid'),
      key: 'iid',
      dataIndex: 'iid',
    },
    {
      title: t1('name'),
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: t1('type'),
      key: 'type',
      render: (row) => eventTypeToText(get(row, 'type')),
    },
    {
      title: t1('event_time'),
      render: (row) => <EventTime event={row} />,
    },
    {
      title: t1('location'),
      width: 170,
      render: (row) => <EventLocation event={row} />,
    },
    {
      title: t1('action'),
      key: 'action',
      render: (text, row) => (
        <Fragment>
          <Link
            to={routes.url('node_edit', {
              ...row,
              step: 'information',
            })}
          >
            <Icon icon={'edit'} title={t1('edit')} />
          </Link>
          <DeleteItem
            title={t1('delete')}
            textConfirm={t1('are_you_sure_you_want_to_do_this')}
            formid={'event_search'}
            ntype={'event'}
            itemId={get(row, 'id')}
            iconButton
          />
        </Fragment>
      ),
    },
  ];
  return (
    <div style={{ background: 'white' }}>
      <AntdTable
        columns={columns}
        dataSource={items}
        pagination={false}
        bordered
        size="middle"
      />
    </div>
  );
};

export default Results;
