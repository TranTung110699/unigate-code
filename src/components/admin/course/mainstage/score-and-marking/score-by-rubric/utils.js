import lodashGet from 'lodash.get';

export const getCourseRubricIid = (course) => lodashGet(course, 'rubric_iid');

export const canTeacherManuallyMarkRubricAsPassed = (rubric) =>
  lodashGet(rubric, 'allow_passing_by_teacher');
//
// export const canTeacherManuallyMarkCourseAsPassed = (course, rootRubric) => {
//   return canTeacherManuallyMarkRubricAsPassed(rootRubric))
// }
