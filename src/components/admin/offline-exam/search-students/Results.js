import React, { Component } from 'react';
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

const label = {
  forms_of_training: t1('forms_of_training'),
  semester: t1('semester'),
  subject: t1('subject'),
  student: t1('student'),
  components: t1('components'),
  action: t1('action'),
  course: t1('course'),
  score_status: t1('score|status'),
  status_of_fee: t1('status_of_fee'),
};

class Results extends Component {
  formatDataDrawTableRender = () => {
    const { items } = this.props;
    if (!items && !Array.isArray(items)) {
      return [];
    }

    let rowIndex = 0;
    const rows = [];
    items.forEach((formsOfTraining) => {
      const formsOfTrainingIndex = rowIndex;
      let rowSpanFormsOfTraining = 0;
      const semesters = (formsOfTraining && formsOfTraining.semesters) || [];
      rows[formsOfTrainingIndex] = {
        majorObject: formsOfTraining.majorObject,
        icoObject: formsOfTraining.icoObject,
        training_mode: formsOfTraining.training_mode,
        training_level: formsOfTraining.training_level,
      };

      semesters.forEach((semesterInfo) => {
        const semesterIndex = rowIndex;
        let rowSpanSemester = 0;
        rows[semesterIndex] = rows[semesterIndex] || {};
        rows[semesterIndex].semesterObject =
          semesterInfo && semesterInfo.semesterObject;
        const subjects = (semesterInfo && semesterInfo.subjects) || [];
        subjects.forEach((subjectInfo) => {
          const subjectIndex = rowIndex;
          rows[subjectIndex] = rows[subjectIndex] || {};
          let rowSpanSubject = 0;
          rows[subjectIndex].creditSyllabusObject =
            subjectInfo && subjectInfo.creditSyllabusObject;
          const users = (subjectInfo && subjectInfo.users) || [];
          users.forEach((userInfo) => {
            const userIndex = rowIndex;
            let rowSpanUser = 0;
            rows[userIndex] = rows[userIndex] || {};
            rows[userIndex].user = userInfo && userInfo.user;
            const components = (userInfo && userInfo.components) || [];
            components.forEach((component) => {
              rows[rowIndex] = rows[rowIndex] || {};
              rows[rowIndex].course = component && component.course;
              rows[rowIndex].progress = component && component.progress;
              rows[rowIndex].fee = component && component.fee;
              rowIndex += 1;
              rowSpanUser += 1;
              rowSpanSubject += 1;
              rowSpanSemester += 1;
              rowSpanFormsOfTraining += 1;
            });
            rows[userIndex].rowSpanUser = rowSpanUser;
          });
          rows[subjectIndex].rowSpanSubject = rowSpanSubject;
        });
        rows[semesterIndex].rowSpanSemester = rowSpanSemester;
      });
      rows[
        formsOfTrainingIndex
      ].rowSpanFormsOfTraining = rowSpanFormsOfTraining;
    });

    return rows;
  };

  render() {
    const rows = this.formatDataDrawTableRender();

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn rowSpan="2">
                {label.forms_of_training}
              </TableHeaderColumn>
              <TableHeaderColumn rowSpan="2">
                {label.semester}
              </TableHeaderColumn>
              <TableHeaderColumn rowSpan="2">{label.subject}</TableHeaderColumn>
              <TableHeaderColumn rowSpan="2">{label.student}</TableHeaderColumn>
              <TableHeaderColumn colSpan="3" className="text-center">
                {label.components}
              </TableHeaderColumn>
              <TableHeaderColumn rowSpan="2">{label.action}</TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>{label.course}</TableHeaderColumn>
              <TableHeaderColumn>{label.score_status}</TableHeaderColumn>
              <TableHeaderColumn>{label.status_of_fee}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover>
            {rows &&
              rows.length > 0 &&
              rows.map((row) => (
                <TableRow
                  key={`${row.user && row.user.iid}-${row.course &&
                    row.course.iid}`}
                >
                  {row &&
                    row.rowSpanFormsOfTraining && (
                      <TableRowColumn rowSpan={row.rowSpanFormsOfTraining}>
                        <ul>
                          {row.majorObject &&
                            row.majorObject.name && (
                              <li>
                                {t1('major')}: {row.majorObject.name}
                              </li>
                            )}
                          {row.training_mode && (
                            <li>
                              {t1('training_mode')}; {t1(row.training_mode)}
                            </li>
                          )}
                          {row.training_level && (
                            <li>
                              {t1('training_levek')}: {t1(row.training_level)}
                            </li>
                          )}
                          {row.icoObject &&
                            row.icoObject.name && (
                              <li>
                                {t1('ico')}: {row.icoObject.name}
                              </li>
                            )}
                        </ul>
                      </TableRowColumn>
                    )}
                  {row &&
                    row.rowSpanSemester && (
                      <TableRowColumn rowSpan={row.rowSpanSemester}>
                        {row.semesterObject && row.semesterObject.name}
                      </TableRowColumn>
                    )}
                  {row &&
                    row.rowSpanSubject && (
                      <TableRowColumn rowSpan={row.rowSpanSubject}>
                        {row.creditSyllabusObject &&
                          row.creditSyllabusObject.name}
                      </TableRowColumn>
                    )}
                  {row &&
                    row.rowSpanUser && (
                      <TableRowColumn rowSpan={row.rowSpanUser}>
                        {row.user &&
                          row.user.iid && (
                            <ul>
                              {row.user.name && (
                                <li>
                                  {t1('name')}: {row.user.name}
                                  <span className="text-muted">
                                    {row.user.code || row.user.iid}
                                  </span>
                                </li>
                              )}
                              {row.user.mail && (
                                <li>
                                  {t1('mail')}: {row.user.mail}
                                </li>
                              )}
                            </ul>
                          )}
                      </TableRowColumn>
                    )}
                  <TableRowColumn>
                    {row.course && row.course.iid && row.course.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    {row.progress && (
                      <ul>
                        {row.progress &&
                          typeof row.progress.progress !== 'undefined' && (
                            <li>
                              {t1('score')}: {row.progress.progress}
                            </li>
                          )}
                        {row.progress &&
                          typeof row.progress.passed !== 'undefined' && (
                            <li>
                              {t1('status')}:{' '}
                              {row.progress.passed
                                ? t1('passed')
                                : t1('failed')}
                            </li>
                          )}
                      </ul>
                    )}
                  </TableRowColumn>
                  <TableRowColumn>
                    {row.fee &&
                      row.fee.amount && (
                        <ul>
                          <li>
                            {t1('amount')}:{' '}
                            {`${row.fee.amount} ${row.fee.fee_template &&
                              row.fee.fee_template.currency}`}
                          </li>
                          {row.fee.status && (
                            <li>
                              {t1('status')}: {t1(row.fee.status)}
                            </li>
                          )}
                        </ul>
                      )}
                  </TableRowColumn>
                  <TableRowColumn />
                </TableRow>
              ))}
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

export default Results;
