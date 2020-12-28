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
import routes from 'routes';
import { Link } from 'react-router-dom';
import Icon from 'components/common/Icon';
import './Results.scss';

class Results extends Component {
  cssClass = 'assignment-for-marking-results';

  width = {
    no: '10%',
    className: '30%',
    assignmentsForMarking: '40%',
    actions: '20%',
  };

  getValidAssignments = (item) =>
    (item &&
      Array.isArray(item.assignments) &&
      item.assignments.filter(Boolean)) ||
    [];

  render() {
    const { className, items } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;
    return (
      <div className={componentClassName}>
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn width={this.width.no}>
                {t1('no')}
              </TableHeaderColumn>
              <TableHeaderColumn width={this.width.className}>
                {t1('class_name')}
              </TableHeaderColumn>
              <TableHeaderColumn width={this.width.assignmentsForMarking}>
                {t1('assignments_available_for_marking')}
              </TableHeaderColumn>
              <TableHeaderColumn width={this.width.actions}>
                {t1('actions')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {items &&
              items.filter(Boolean).map((item, index) => {
                const validAssignments = this.getValidAssignments(item);
                return (
                  <TableRow key={item.id} selectable={false}>
                    <TableRowColumn width={this.width.no}>
                      {index + 1}
                    </TableRowColumn>
                    <TableRowColumn width={this.width.className}>
                      {item.course.name}
                    </TableRowColumn>
                    <TableRowColumn width={this.width.assignmentsForMarking}>
                      <ul style={{ paddingLeft: 0 }}>
                        {validAssignments.map((ass) => (
                          <li>{ass.name}</li>
                        ))}
                      </ul>
                    </TableRowColumn>
                    <TableRowColumn width={this.width.actions}>
                      <Link
                        to={routes.url(
                          'node_edit',
                          Object.assign(item.course, { step: 'assignments' }),
                        )}
                      >
                        <Icon icon="edit" />
                        {t1('marking')}
                      </Link>
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

export default Results;
