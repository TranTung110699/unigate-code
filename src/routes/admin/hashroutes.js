import academicCategory from './academic-category';
import editAcademicCategory from './academic-category/edit';
import editCourse from '../node-edit-container/course';
import editContest from '../node-edit-container/contest';
import editUser from '../node-edit-container/user';
import editSession from '../node-edit-container/session';
import editSyllabusAndSyllabusItems from '../node-edit-container/syllabus';
import schoolStudent from './school-student';
import {
  courseLearn,
  courseOverview,
  courseOverviewByPath,
  courseOverViewForUser,
  learnElement,
  learnElementWithSubChild,
  syllabusPreview,
} from '../student/learn';
// import editRoom from './room';

export default (dialogSize = 'big') => {
  let ret = [
    academicCategory,
    editCourse,
    editUser,
    schoolStudent,
    courseOverviewByPath,
    courseOverViewForUser,
    courseOverview,
    courseLearn,
    syllabusPreview,
    learnElement,
    learnElementWithSubChild,
    editSyllabusAndSyllabusItems,
    editSession,
    editContest,
  ].concat(editAcademicCategory);

  if (dialogSize === 'small') {
    // pre-fix with small dialog
    // something like this /small/admin/user/view
    ret.forEach((val) => {
      val.path = `/${dialogSize}${val.path}`;
      return val;
    });
  }

  return ret;
};
