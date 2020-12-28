/**
 * Created by quandv on 13/06/17.
 */
import { adminRootUrl } from 'routes/root-url';
import { layouts, learningItemTypeViewers } from 'configs/constants';
import Store from 'store';
import { getThemeConfig } from 'utils/selectors';
import { getFrontendUrl } from './common';

export function getSyllabusIid(syllabus) {
  if (syllabus instanceof Object) {
    return syllabus.iid;
  }
  return syllabus;
}

export const getSubMenuLink = (nodeType, node = {}, action = '') => {
  switch (nodeType) {
    case 'fee-category':
      return `${adminRootUrl}/financial/fee-category/${node.iid}/${action}`;
    case 'subjects-ingroup':
      return `${adminRootUrl}/financial/subjects-ingroup/${node.iid}/${action}`;
    default:
      return `${adminRootUrl}/${nodeType}/${node.iid}/${action}`;
  }
};
const trialExam = (course) => `/exam/trial/${course.iid}/${course.slug}.html`;

const learnCourse = (
  node = {},
  navId,
  preview = false,
  sessionPrefix = '',
  learnMode = null, // REVIEW|OVERVIEW|LEARN
  navRootNodeIid,
) => {
  if (!node || Object.keys(node).length == 0) return 'error';

  // if (!preview && isExamShift(node)) {
  //   return startExam(node);
  // }

  let prefix = preview ? '/p-learn' : '/learn';
  if (sessionPrefix.indexOf('session') !== -1) {
    prefix = `/${sessionPrefix}`; // for case typeViewer = session-{sessionIid}
  } else if (
    [
      learningItemTypeViewers.REVIEW_LEARN,
      learningItemTypeViewers.REVIEW_OVERVIEW,
    ].indexOf(learnMode) !== -1
  ) {
    prefix = `/${learningItemTypeViewers.REVIEW_LEARN}`;
  }
  const syllabusIid =
    node.syllabus || node.credit_syllabus || node.siid || node.iid;
  // console.log({node});

  let url = `${prefix}/${node.iid}-${syllabusIid}`;
  if (navRootNodeIid) {
    url += `-${navRootNodeIid}`;
  }

  if (node.ntype === 'syllabus') {
    url = `${prefix}/${node.iid}-${node.iid}`;
  }

  if (!navId && node.ntype === 'course') {
    navId = `${syllabusIid}-${syllabusIid}-1`;
  }

  const slug = node.slug || 'learn';
  return navId
    ? `/learn${url}/${navId}/${slug}.html`
    : `/learn${url}/${slug}.html`;
};

export const overViewCourse = (course, preview = false, learnMode = null) => {
  // if (!preview && isExamShift(course)) {
  //   return startExam(course);
  // }

  let prefix = preview ? 'p-overview' : 'overview';
  prefix = learnMode ? learnMode : prefix;
  const syllabusIid =
    getSyllabusIid(course.syllabus || course.credit_syllabus) || course.siid;
  return `/learn/${prefix}/${course.iid}-${syllabusIid}/${course.slug}.html`;
};

export default {
  courseListByPath: (pathIid) => {
    const themeConfig = getThemeConfig(Store.getState());
    if (themeConfig.layout === layouts.ETEC) {
      return getFrontendUrl('tests', { type: 'path', iid: pathIid });
    }
    return `/learn/course-list/${pathIid}`;
  },
  overViewCourse,
  learnCourse,
  // startExam,
  trialExam,
  startSurvey: (survey_iid, item = {}) => {
    return `/survey/${survey_iid}-${item.iid}`;
  },
  overviewCourseByPath: (pathIid, course, learnMode = null) => {
    if (!pathIid) {
      return overViewCourse(course, false, learnMode);
    }

    // if (isExamShift(course)) {
    //   return startExam(course);
    // }

    return `/learn/overview/${pathIid}/${course.iid}-${getSyllabusIid(
      course.syllabus || course.credit_syllabus,
    )}/${course.slug}.html`;
  },
  adminOverviewCourseOfUser: (viewUserIid, course) => {
    return `/learn/overview/${course.iid}-${getSyllabusIid(
      course.syllabus || course.credit_syllabus,
    )}/${viewUserIid}/${course.slug}.html`;
  },
  LearnCourseByPath: (course, navId, moreParams = {}) => {
    course = course || {};

    const isPreview = moreParams.isPreview;
    const pathIid = moreParams.pathIid;
    const sessionPrefix = moreParams.sessionPrefix;
    const learnMode = moreParams.learnMode;
    const navRootNodeIid = moreParams.navRootNodeIid;
    if (isPreview || !pathIid) {
      return learnCourse(
        course,
        navId,
        isPreview,
        sessionPrefix,
        learnMode,
        navRootNodeIid,
      );
    }

    // if (isExamShift(course)) {
    //   return startExam(course);
    // }

    return `/learn/${pathIid}/${course.iid}-${getSyllabusIid(
      course.syllabus || course.credit_syllabus,
    )}/${navId}/${course.slug}.html`;
  },
  previewTake: (takeId) => {
    if (!takeId) {
      return '';
    }

    return `/exam/preview-take/${takeId}`;
  },
  previewPaper: (syllabusIid, paperId) => {
    if (!syllabusIid || !paperId) {
      return '';
    }

    return `/exam/preview-paper/${syllabusIid}/${paperId}`;
  },
  searchCourses: (searchKey) => {
    if (!searchKey) {
      return '/';
    }

    return `/learn/course/search/${searchKey}`;
  },
  viewCardPackage: (iid) => {
    if (!iid) {
      return '/';
    }

    return `/admin/card/package-detail/${iid}`;
  },
  viewChildrenOfParentProgress: (userIid, action) => {
    action = action || 'in-progress-courses';
    if (!userIid) {
      return '/';
    }

    return `/dashboard/child/${userIid}/${action}`;
  },
};
