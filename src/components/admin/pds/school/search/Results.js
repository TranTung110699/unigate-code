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
    const step = 'schoolviet';

    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('edit_school')}
        node={item}
        step={step}
        formid="edit_school"
        alternativeApi="/pds/api/update-school"
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_school'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items, formid, ntype } = this.props;

    const editLabel = t1('edit_school');

    const columns = [
      {
        title: <Tooltip title={t1('iid')}>{t1('iid')}</Tooltip>,
        key: 'iid',
        dataIndex: 'iid',
      },
      {
        title: <Tooltip title={t1('name')}>{t1('name')}</Tooltip>,
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: <Tooltip title={t1('province')}>{t1('province')}</Tooltip>,
        key: 'province',
        dataIndex: 'mustache_province',
      },
      {
        title: <Tooltip title={t1('district')}>{t1('district')}</Tooltip>,
        key: 'district',
        dataIndex: 'mustache_district',
      },
      {
        title: <Tooltip title={t1('levels')}>{t1('levels')}</Tooltip>,
        key: 'levels',
        dataIndex: 'mustache_levels',
        render: (mustacheLevels) =>
          mustacheLevels &&
          mustacheLevels.map((level) => <div key={level}>{level}</div>),
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
              alternativeApi="/pds/api/delete-school"
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
      mustache_province: PropTypes.string,
      mustache_district: PropTypes.string,
    }),
  ),
  ntype: PropTypes.string,
};

Results.defaultProps = {
  items: [{}],
  ntype: 'category',
};

export default connect()(Results);
