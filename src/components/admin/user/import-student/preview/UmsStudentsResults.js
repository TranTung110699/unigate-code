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

class Results extends Component {
  render() {
    const { items } = this.props;

    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>{t1('stt')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('code/_admission_code')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('cmnd')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('email')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('full_name')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('sex')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('phone')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('birthday')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('training_mode')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('major')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('training_level')}</TableHeaderColumn>
            <TableHeaderColumn width="20%">{t1('status')}</TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody displayRowCheckbox={false} showRowHover stripedRows>
          {items &&
            items.map((item) => (
              <TableRow key={item.id}>
                <TableRowColumn>{item.stt}</TableRowColumn>
                <TableRowColumn>
                  {item.old_code ? item.old_code : item.admission_code}
                </TableRowColumn>
                <TableRowColumn>{item.identification_card}</TableRowColumn>
                <TableRowColumn>{item.mail}</TableRowColumn>
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn>{item.sex}</TableRowColumn>
                <TableRowColumn>{item.phone}</TableRowColumn>
                <TableRowColumn>{item.birthday}</TableRowColumn>
                <TableRowColumn>{item.training_mode}</TableRowColumn>
                <TableRowColumn>{item.major}</TableRowColumn>
                <TableRowColumn>{item.training_level}</TableRowColumn>
                <TableRowColumn
                  width="20%"
                  style={{
                    color:
                      item && item.err && item.err.length > 0 ? 'red' : 'black',
                  }}
                >
                  {t1(item.status)}
                  {item.err &&
                    item.err.map((error) => (
                      <div>
                        <span>{t1(error.field)}: </span>
                        <span>{t1(error.messages)}</span>
                      </div>
                    ))}
                </TableRowColumn>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  }
}

export default connect()(Results);
