/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import PropTypes from 'prop-types';

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
    const columnHeight = { height: '100px' };
    const style = {
      overflow: 'auto',
      textOverflow: 'none',
      padding: 0,
      whiteSpace: 'none',
      ...columnHeight,
    };
    const whiteSpace = { whiteSpace: 'pre', overflow: 'none', ...columnHeight };

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width={'16%'} style={columnHeight}>
                {t1('datetime')}
              </TableHeaderColumn>
              <TableHeaderColumn width={'12%'} style={columnHeight}>
                {t1('user_code')}
              </TableHeaderColumn>
              <TableHeaderColumn width={'12%'} style={columnHeight}>
                {t1('user_name')}
              </TableHeaderColumn>
              <TableHeaderColumn width={'12%'} style={whiteSpace}>
                {t1('user_roles')}
              </TableHeaderColumn>
              <TableHeaderColumn width={'12%'} style={columnHeight}>
                {t1('modules')}
              </TableHeaderColumn>
              <TableHeaderColumn width={'12%'} style={columnHeight}>
                {t1('action')}
              </TableHeaderColumn>
              <TableHeaderColumn width={'22%'} style={columnHeight}>
                {t1('detail')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false}>
            {items &&
              items.map((item) => {
                const ts = item.ts;
                const code = item.u && item.u.code;
                const name = item.u && item.u.name;
                const roleNames = item.roleNames;

                let rolesString = '';
                if (roleNames) {
                  rolesString = roleNames.join('\n');
                }

                const module = item.query && item.query.module;
                const action = item.query && item.query.action;
                const detail = item.query && JSON.stringify(item.query);

                return (
                  <TableRow>
                    <TableRowColumn
                      title={ts}
                      width={'16%'}
                      style={columnHeight}
                    >
                      {ts}
                    </TableRowColumn>
                    <TableRowColumn
                      title={code}
                      width={'12%'}
                      style={columnHeight}
                    >
                      {code}
                    </TableRowColumn>
                    <TableRowColumn
                      title={name}
                      width={'12%'}
                      style={columnHeight}
                    >
                      {name}
                    </TableRowColumn>
                    <TableRowColumn
                      title={rolesString}
                      width={'12%'}
                      style={whiteSpace}
                    >
                      {rolesString}
                    </TableRowColumn>
                    <TableRowColumn
                      title={module}
                      width={'12%'}
                      style={columnHeight}
                    >
                      {module}
                    </TableRowColumn>
                    <TableRowColumn
                      title={action}
                      width={'12%'}
                      style={columnHeight}
                    >
                      {action}
                    </TableRowColumn>
                    <TableRowColumn width={'22%'} style={style} title={detail}>
                      {detail}
                    </TableRowColumn>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default connect()(Results);
