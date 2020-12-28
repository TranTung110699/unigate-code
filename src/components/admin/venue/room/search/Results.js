import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import { constants } from 'configs/constants';
import PropTypes from 'prop-types';
import schema from 'components/admin/venue/room/schema/form';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import actions from 'actions/node/creators';
import UpdateVenue from 'components/admin/venue/room/new/Form';
import AntdTable from 'antd/lib/table';
import Actions from './Actions';

class Results extends Component {
  render() {
    const { items, formid } = this.props;
    const columns = [
      {
        title: t1('floor_number'),
        dataIndex: 'floor_number',
      },
      {
        title: t1('name'),
        dataIndex: 'name',
      },
      {
        title: t1('room_seat'),
        dataIndex: 'room_seat',
      },
      {
        title: `${t1('room_size')} (m2)`,
        dataIndex: 'room_size',
      },
      {
        title: t1('room_type'),
        dataIndex: 'room_type',
      },
      {
        title: t1('notes'),
        dataIndex: 'content',
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
