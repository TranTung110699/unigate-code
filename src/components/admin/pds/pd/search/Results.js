import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';
import Tooltip from 'antd/lib/tooltip';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import actions from 'actions/node/creators';
import UpdateForm from '../new/Form';

class Results extends Component {
  updateItem(item) {
    const { dispatch } = this.props;
    const step = item.sub_type === 0 ? 'province' : 'district';

    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('edit_province/district')}
        node={item}
        step={step}
        formid="edit_province_district"
        alternativeApi="/pds/api/update-province"
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_province/district'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items, formid, ntype } = this.props;

    const editLabel = t1('edit_province/district');

    const columns = [
      {
        title: <Tooltip title={t1('iid')}>{t1('iid')}</Tooltip>,
        key: 'iid',
        dataIndex: 'iid',
      },
      {
        title: <Tooltip title={t1('zone')}>{t1('zone')}</Tooltip>,
        key: 'zone',
        dataIndex: 'mustache_zone',
      },
      {
        title: <Tooltip title={t1('name')}>{t1('name')}</Tooltip>,
        key: 'name',
        dataIndex: 'name',
        render: (name, item) => (
          <React.Fragment>
            <div>{name}</div>
            <div>{item.mustache_parent}</div>
          </React.Fragment>
        ),
      },
      {
        title: <Tooltip title={t1('sub_type')}>{t1('sub_type')}</Tooltip>,
        key: 'sub_type',
        dataIndex: 'sub_type_name',
      },
      {
        title: <Tooltip title={t1('action')}>{t1('action')}</Tooltip>,
        key: 'action',
        render: (item) => (
          <React.Fragment>
            <IconButton
              title={editLabel}
              iconClassName="mi mi-edit"
              onClick={() => this.updateItem(item)}
            />
            <DeleteItem
              alternativeApi="/pds/api/delete-province"
              formid={formid}
              ntype={ntype}
              itemId={item.id}
            />
          </React.Fragment>
        ),
      },
    ];

    return (
      <div className="table-result">
        <Table
          columns={columns}
          dataSource={items}
          pagination={false}
          rowKey="id"
          childrenColumnName={null}
          className="white-background"
        />
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      iid: PropTypes.number,
      name: PropTypes.string,
      mustache_zone: PropTypes.string,
      mustache_parent: PropTypes.string,
      sub_type_name: PropTypes.string,
    }),
  ),
  ntype: PropTypes.string,
};

Results.defaultProps = {
  items: [{}],
  ntype: 'category',
};

export default connect()(Results);
