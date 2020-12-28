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
  countRowOfEachCourse = (items) => {
    if (!Array.isArray(items)) {
      return {};
    }

    return items
      .filter((item) => item && item.course && item.course.iid)
      .reduce((result, item) => {
        const courseIid = item.course.iid;
        if (result[courseIid]) {
          return {
            ...result,
            [courseIid]: result[courseIid] + 1,
          };
        }
        return {
          ...result,
          [courseIid]: 1,
        };
      }, {});
  };

  modifyItems = (items) => {
    if (!Array.isArray(items)) {
      return items;
    }
    const countRowsCourse = this.countRowOfEachCourse(items);
    return items
      .filter((item) => item && item.course && item.course.iid)
      .map((item, index, arr) => {
        const previous = arr[index - 1];
        if (!previous || previous.course.iid !== item.course.iid) {
          return {
            ...item,
            isStartRowOfCourse: true,
            rowCount: countRowsCourse[item.course.iid],
          };
        }
        return {
          ...item,
          isStartRowOfCourse: false,
        };
      });
  };

  render() {
    const { items } = this.props;
    const modifiedItems = this.modifyItems(items);
    const colWidths = {
      course: '10%',
      credit_syllabus: '10%',
      teachers: '10%',
    };

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn width={colWidths.course}>
                {t1('course')}
              </TableHeaderColumn>
              <TableHeaderColumn width={colWidths.credit_syllabus}>
                {t1('subject')}
              </TableHeaderColumn>
              <TableHeaderColumn width={colWidths.teachers}>
                {t1('teachers')}
              </TableHeaderColumn>
              <TableHeaderColumn width={colWidths.student}>
                {t1('student')}
              </TableHeaderColumn>
              <TableHeaderColumn width={colWidths.score}>
                {t1('score')}
              </TableHeaderColumn>
              <TableHeaderColumn width={colWidths.status}>
                {t1('status')}
              </TableHeaderColumn>
              <TableHeaderColumn width={colWidths.performance}>
                {t1('performance')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {Array.isArray(modifiedItems) &&
              modifiedItems.map((item) => {
                return (
                  <TableRow key={item.id}>
                    {item.isStartRowOfCourse && [
                      <TableRowColumn
                        width={colWidths.course}
                        key="name"
                        rowSpan={item.rowCount}
                      >
                        {item.course.name}
                      </TableRowColumn>,
                      <TableRowColumn
                        width={colWidths.credit_syllabus}
                        key="credit"
                        rowSpan={item.rowCount}
                      >
                        {item.course.credit_syllabus &&
                          item.course.credit_syllabus.name}
                      </TableRowColumn>,
                      <TableRowColumn
                        width={colWidths.teachers}
                        key="teachers"
                        rowSpan={item.rowCount}
                      >
                        {Array.isArray(item.course.session_teachers) &&
                          item.course.session_teachers.map((teacher) => (
                            <p key={teacher.iid}>{teacher.name}</p>
                          ))}
                      </TableRowColumn>,
                    ]}
                    <TableRowColumn width={colWidths.student}>
                      {item.user && item.user.name}
                    </TableRowColumn>
                    <TableRowColumn width={colWidths.score}>
                      {item.progress && item.progress.progress}
                    </TableRowColumn>
                    <TableRowColumn width={colWidths.status}>
                      {item.progress && item.progress.passed
                        ? t1('passed')
                        : t1('failed')}
                    </TableRowColumn>
                    <TableRowColumn width={colWidths.performance}>
                      {item.progress &&
                        item.progress.point_spectrum_info &&
                        t1(item.progress.point_spectrum_info.name)}
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

export default connect()(Results);
