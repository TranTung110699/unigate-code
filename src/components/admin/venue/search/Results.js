import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUrl } from 'routes/links/common';
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
import UpdateForm from '../new/Form';

class Results extends Component {
  iStyle = { fontSize: '21px' };

  updateItem(item) {
    const { dispatch } = this.props;
    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('edit_venue')}
        node={item}
        step=""
        formid="edit_venue"
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_venue'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items, formid, ntype } = this.props;

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn width="7%" title={t1('iid')}>
                {t1('iid')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('name')}>
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('is_virtual')}>
                {t1('is_virtual')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('province')}>
                {t1('province')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('district')}>
                {t1('district')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('address')}>
                {t1('address')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('action')} width={150}>
                {t1('action')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn width="7%">{item.iid}</TableRowColumn>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>
                    {item.is_virtual ? t1('is_virtual') : t1('is_physical')}
                  </TableRowColumn>
                  <TableRowColumn>{item.province_name}</TableRowColumn>
                  <TableRowColumn>{item.district_name}</TableRowColumn>
                  <TableRowColumn>{item.address}</TableRowColumn>
                  <TableRowColumn width={162}>
                    <Link to={getUrl(`venue/${item.iid}`)}>
                      <i style={this.iStyle} className="mi mi-edit" />
                    </Link>
                    <DeleteItem
                      formid={formid}
                      ntype={ntype}
                      itemId={item.id}
                      params={{ _sand_purge: 1 }}
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
