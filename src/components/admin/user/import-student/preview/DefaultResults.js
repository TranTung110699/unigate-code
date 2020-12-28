import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import sagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';

class Results extends Component {
  render() {
    const { items } = this.props;

    const sttLabel = t1('stt');
    const codeLabel = t1('code');
    const mailLabel = t1('mail');
    const nameLabel = t1('name');
    const addressLabel = t1('address');
    const phoneLabel = t1('phone');
    const levelLabel = t1('level');
    const subMailLabel = t1('sub_mail');
    const statusLabel = t1('status');

    return (
      <div className="button-center col-md-12">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>{sttLabel}</TableHeaderColumn>
              <TableHeaderColumn>{codeLabel}</TableHeaderColumn>
              <TableHeaderColumn>{mailLabel}</TableHeaderColumn>
              <TableHeaderColumn>{nameLabel}</TableHeaderColumn>
              <TableHeaderColumn>{addressLabel}</TableHeaderColumn>
              <TableHeaderColumn>{phoneLabel}</TableHeaderColumn>
              <TableHeaderColumn>{levelLabel}</TableHeaderColumn>
              <TableHeaderColumn>{subMailLabel}</TableHeaderColumn>
              <TableHeaderColumn>{statusLabel}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>{item.stt}</TableRowColumn>
                  <TableRowColumn>{item.code}</TableRowColumn>
                  <TableRowColumn>{item.mail}</TableRowColumn>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>{item.address}</TableRowColumn>
                  <TableRowColumn>{item.phone}</TableRowColumn>
                  <TableRowColumn>{item.user_level}</TableRowColumn>
                  <TableRowColumn>{item.sub_mail}</TableRowColumn>
                  <TableRowColumn>{t1(item.status)}</TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default connect()(Results);
