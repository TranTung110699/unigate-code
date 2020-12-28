import urlActions from './url-actions';

export const epReportLink = (node, report) =>
  `/admin/enrolment-plan/${node.iid}/${urlActions.REPORTS}/${report}`;

export const epCourseStudentArrangmentStatus = (node) =>
  `/admin/enrolment-plan/${node.iid}/${
    urlActions.COURSE_STUDENT_ARRANGEMENT_STATUS
  }`;

export const nodeLink = (node, action) =>
  `/admin/enrolment-plan/${node.iid}/${action}`;
