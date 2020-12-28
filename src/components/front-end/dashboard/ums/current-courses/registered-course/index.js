import React from 'react';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import SessionsOfCourse from 'components/timetable/views';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { t1 } from 'translate';

class Layout extends React.Component {
  componentWillMount() {
    const { course_iid, registeredCourseDetail } = this.props;

    if (course_iid && !registeredCourseDetail) {
      this.fetchRegisteredCourseDetail(this.props);
    }
  }

  fetchRegisteredCourseDetail = (props) => {
    const { course_iid, dispatch, userInfo, keyState } = props;

    const params = {
      course_iid,
      user_iid: userInfo.iid,
    };

    const url = apiUrls.get_registered_course_detail;
    dispatch(sagaActions.getDataRequest({ url, keyState }, params));
  };

  render() {
    const {
      registeredCourseDetail,
      course_iid,
      teacherMode,
      hiddenCalendar,
    } = this.props;

    const leftClass = teacherMode ? 'col-sm-2' : 'col-sm-3';
    const rightClass = teacherMode ? 'col-sm-10' : 'col-sm-9';

    return (
      <div className="registered-course-detail-wrapper">
        {registeredCourseDetail && (
          <div className="row">
            <div className="col-sm-12">
              <h3>{registeredCourseDetail.name}</h3>
            </div>
            {!teacherMode && <div className={leftClass}>{t1('teacher')}</div>}
            {!teacherMode && (
              <div className={rightClass}>
                {registeredCourseDetail.staff &&
                  registeredCourseDetail.staff.length > 0 &&
                  registeredCourseDetail.staff.map((staff) => (
                    <div>
                      <span>{staff.name}</span>
                    </div>
                  ))}
              </div>
            )}
            {registeredCourseDetail.rooms &&
              registeredCourseDetail.rooms.length > 0 && (
                <div>
                  <div className={leftClass}>{t1('classroom')}</div>
                  <div className={rightClass}>
                    {registeredCourseDetail.rooms.map((room) => (
                      <div>
                        <span>{room.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {!teacherMode && (
              <div className={leftClass}>{t1('your_attendance')}</div>
            )}
            {!teacherMode && (
              <div className={rightClass}>
                <span>
                  {t1('attended')}:{' '}
                  {registeredCourseDetail.attendance.totalAttended}
                </span>
                ,{' '}
                <span>
                  {t1('absent')}:{' '}
                  {registeredCourseDetail.attendance.totalAbsent}
                </span>
                <br />
                <span>
                  {t1('total')}:{' '}
                  {registeredCourseDetail.attendance.totalSession}
                </span>
              </div>
            )}
            {!teacherMode &&
              registeredCourseDetail.assignments &&
              registeredCourseDetail.assignments.length > 0 && (
                <div>
                  <div className={leftClass}>{t1('assignments')}</div>
                  <div className={rightClass}>
                    {registeredCourseDetail.assignments.map((assignment) => (
                      <div>
                        <span>
                          {t1('assignment')}:{' '}
                          {assignment.sco && assignment.sco.name}
                        </span>
                        ,{' '}
                        <span>
                          {t1('project')}:{' '}
                          {assignment.exercise && assignment.exercise.name}
                        </span>
                        <br />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {!teacherMode &&
              registeredCourseDetail.fees &&
              registeredCourseDetail.fees.length && (
                <div>
                  <div className={leftClass}>{t1('fees')}</div>
                  <div className={rightClass}>
                    <Table>
                      <TableHeader
                        displaySelectAll={false}
                        enableSelectAll={false}
                        adjustForCheckbox={false}
                      >
                        <TableRow>
                          <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
                          <TableHeaderColumn>{t1('price')}</TableHeaderColumn>
                          <TableHeaderColumn>{t1('status')}</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody
                        displayRowCheckbox={false}
                        showRowHover={false}
                        stripedRows={false}
                      >
                        {registeredCourseDetail.fees.map((fee, index) => (
                          <TableRow key={(fee && fee.id) || index}>
                            <TableRowColumn>{fee && fee.name}</TableRowColumn>
                            <TableRowColumn>
                              {`${(fee && fee.amount) || 0} ${fee &&
                                fee.fee_template &&
                                fee.fee_template.currency}`}
                            </TableRowColumn>
                            <TableRowColumn>
                              {t1(fee && fee.status)}
                            </TableRowColumn>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
          </div>
        )}
        {!hiddenCalendar && (
          <div className="row">
            <div className="col-sm-12">{t1('calendar')}</div>
            <div className="col-sm-12">
              <SessionsOfCourse courseIid={course_iid} this_user_only />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const keyState = `registered-course-detail-${props.course_iid}`;
  const userInfo = props.userInfo || state.user.info || {};

  return {
    userInfo,
    keyState,
    registeredCourseDetail: state.dataApiResults[keyState],
  };
};

export default connect(mapStateToProps)(Layout);
