import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import DisplayHtml from 'components/common/html';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import ReactStars from 'react-stars';
import { timestampToDateString } from 'common/utils/Date';

const label = {
  no: t1('no'),
  subject: t1('subject'),
  course: t1('course'),
  session: t1('session'),
  datetime: t1('date'),
  student: t1('student'),
  teacher: t1('teacher'),
  rating: t1('rating'),
  note: t1('note'),
};

const width = {
  no: '5%',
  subject: '10%',
  course: '10%',
  session: '10%',
  datetime: '10%',
  student: '10%',
  teacher: '10%',
  rating: '10%',
  note: '25%',
};

class Results extends Component {
  render() {
    const { items, type, page } = this.props;
    const currentIndex = page ? page.items_per_page * (page.page - 1) + 1 : 1;
    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width={width.no}>{label.no}</TableHeaderColumn>
              <TableHeaderColumn width={width.subject}>
                {label.subject}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.course}>
                {label.course}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.session}>
                {label.session}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.datetime}>
                {label.datetime}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.student}>
                {label.student}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.teacher}>
                {label.teacher}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.rating}>
                {label.rating}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.note}>
                {label.note}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item, index) => {
                let student, teacher;
                console.log('type ', type);
                if (type === 'teacher') {
                  teacher = item.target;
                  student = item.u;
                } else {
                  teacher = item.u;
                  student = item.target;
                }
                const no = currentIndex + index;
                return (
                  <TableRow key={item.id}>
                    <TableRowColumn width={width.no}>{no}</TableRowColumn>
                    <TableRowColumn width={width.syllabus}>
                      {item.syllabus && item.syllabus.name}
                    </TableRowColumn>
                    <TableRowColumn width={width.course}>
                      {item.course && item.course.name}{' '}
                      {item.course && item.course.iid
                        ? `(${item.course.iid})`
                        : ''}
                    </TableRowColumn>
                    <TableRowColumn width={width.name}>
                      {item.session && item.session.name}
                    </TableRowColumn>
                    <TableRowColumn width={width.datetime}>
                      {item.ts && timestampToDateString(item.ts)}
                    </TableRowColumn>
                    <TableRowColumn width={width.student}>
                      {student && student.name}{' '}
                      {student &&
                        student.code &&
                        `(${student && student.code})`}
                    </TableRowColumn>
                    <TableRowColumn width={width.teacher}>
                      {teacher && teacher.name}{' '}
                      {teacher &&
                        teacher.code &&
                        `(${teacher && teacher.code})`}
                    </TableRowColumn>
                    <TableRowColumn width={width.rating}>
                      <ReactStars
                        count={5}
                        size={24}
                        value={(item.result && item.result.rating) || 0}
                        edit={false}
                        color2={'#ffd700'}
                      />
                    </TableRowColumn>
                    <TableRowColumn width={width.note}>
                      <DisplayHtml
                        content={item.result && item.result.content}
                      />
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
