import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import AntdTable from 'antd/lib/table';
import { constants } from 'configs/constants';
import PropTypes from 'prop-types';
import schema from 'components/admin/venue/room/schema/form';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import actions from 'actions/node/creators';
import UpdateVenue from 'components/admin/venue/room/new/Form';
import lodashGet from 'lodash.get';
import { canJoinToLearn, joinStatuses } from '../../../session/utils';
import Actions from './Actions';

class Results extends Component {
  render() {
    const { items, formid } = this.props;

    const columns = [
      {
        title: t1('name'),
        dataIndex: 'name',
      },
      {
        title: t1('room_seat'),
        dataIndex: 'room_seat',
        // render: (text, session, idx) => <span>{idx + 1}</span>,
      },
      {
        title: t1('server_ip'),
        key: 'server_ip',
        render: (text, room, idx) => (
          <span>{lodashGet(room, 'server_configs.bbb_room_url')}</span>
        ),
      },
      {
        title: t1('actions'),
        key: 'action',
        render: (text, item, idx) => {
          return <Actions room={item} formid={formid} />;
        },
      },
    ];

    return (
      <AntdTable
        columns={columns}
        dataSource={items}
        bordered
        pagination={false}
        size="middle"
      />
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

Results.defaultProps = {
  items: [],
};

export default connect()(Results);
