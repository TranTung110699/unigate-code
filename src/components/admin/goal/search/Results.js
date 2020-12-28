import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import routes from 'routes';
import ResultActions from './common/ResultActions';
import './stylesheet.scss';

class Results extends Component {
  cssClass = 'admin-goal-tree-results';

  width = {
    actions: '10%',
  };

  render() {
    const { items, formid } = this.props;
    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
              <TableHeaderColumn width={this.width.actions}>
                {t1('actions')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>
                    <Link
                      to={routes.url(
                        'node_edit',
                        Object.assign({}, item, { ntype: 'goal' }),
                      )}
                    >
                      {item.name}
                    </Link>
                  </TableRowColumn>
                  <TableRowColumn width={this.width.actions}>
                    <ResultActions item={item} formid={formid} />
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Results;
