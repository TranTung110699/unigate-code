import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import Links from 'routes/links';
import ActionToggle from 'components/common/toggle/ActionToggle';
import { timestampToDateString } from 'common/utils/Date';

const width = {
  action: '170px',
};

class CoursesOfSyllabusResults extends Component {
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  render() {
    const { items, node } = this.props;
    return [
      <Table>
        <TableHeader
          displaySelectAll={false}
          enableSelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('start_date')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('end_date')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('approved')}</TableHeaderColumn>
            <TableHeaderColumn width={width.action} className="text-center">
              {t1('action')}
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody displayRowCheckbox={false} showRowHover stripedRows>
          {items &&
            items.map((course, index) => (
              <TableRow
                key={`course-id-key-${index}-${
                  course.id ? course.id : 'emptyCourseId'
                }`}
              >
                <TableRowColumn>{course.name}</TableRowColumn>
                <TableRowColumn>
                  {course.start_date &&
                    timestampToDateString(course.start_date)}
                </TableRowColumn>
                <TableRowColumn>
                  {course.end_date && timestampToDateString(course.end_date)}
                </TableRowColumn>
                <TableRowColumn>
                  <ActionToggle
                    hideLabel
                    baseURL={routes.url('node_update', {
                      ...course,
                      step: 'status',
                    })}
                    dataSet={this.actionToggleDataSet}
                    value={course.status || 'queued'}
                    name="status"
                  />
                </TableRowColumn>
                <TableRowColumn
                  width={width.action}
                  className="padding-left-45"
                >
                  <Link to={routes.url('node_edit', course)}>
                    <IconButton title={t1('edit')} iconClassName="mi mi-edit" />
                  </Link>
                  <Link to={Links.overViewCourse(course, true)}>
                    <IconButton
                      title={t1('preview')}
                      iconClassName="mi mi-remove-red-eye"
                    />
                  </Link>
                </TableRowColumn>
              </TableRow>
            ))}
        </TableBody>
      </Table>,
    ];
  }
}

export default CoursesOfSyllabusResults;
