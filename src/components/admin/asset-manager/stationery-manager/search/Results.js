import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import apiUrls from 'api-endpoints';
import assetApiUrls from 'components/admin/asset-manager/endpoints';

import { t1 } from 'translate';
import actions from 'actions/node/creators';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import './stylesheet.scss';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import UpdateForm from './change-stationery/ImportForm';
import { timestampToDateString } from 'common/utils/Date';

class Results extends Component {
  updateItem(item) {
    const { dispatch, step } = this.props;
    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('edit_stationery')}
        node={item}
        step=""
        formid="edit_stationery"
        alternativeApi={assetApiUrls.update_stationery_items}
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_stationery'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items, formid, ntype } = this.props;
    const width = {
      date: '33%',
      description: '33%',
      action: '34%',
    };

    return (
      <div className="stationery-table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn width={width.date}>
                {t1('date')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.description}>
                {t1('description')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.action}>
                {t1('action')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn width={width.date}>
                    {item.date && timestampToDateString(item.date)}
                  </TableRowColumn>
                  <TableRowColumn width={width.description}>
                    {t1(item.description)}
                  </TableRowColumn>
                  <TableRowColumn width={width.action}>
                    <IconButton
                      title={t1('edit_stationery')}
                      iconClassName="mi mi-edit"
                      onClick={() => this.updateItem(item)}
                    />
                    <DeleteItem
                      formid={formid}
                      params={{
                        stationeryIid: item.iid,
                      }}
                      alternativeApi={assetApiUrls.stationery_item_delete}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
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
