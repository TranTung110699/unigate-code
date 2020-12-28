import Loadable from 'react-loadable';
import Loading from 'components/common/loading';
import { DefinedUrlParams } from 'routes/links/common';

const LearningOnePage = Loadable({
  loader: () => import('components/learn/learn-one-page/index'),
  loading: Loading,
});

const LearningIndex = Loadable({
  loader: () => import('components/learn'),
  loading: Loading,
});

export const courseOverViewForUser = {
  componentId: 'CourseOverviewForUser',
  path: `/learn/:${DefinedUrlParams.COURSE_VIEW_TYPE}/:${
    DefinedUrlParams.COURSE_IID
  }(\\d+)-:${DefinedUrlParams.SYLLABUS_IID}(\\d+)/:${
    DefinedUrlParams.USER_IID
  }(\\d+)/:slug.html`,
  component: LearningIndex,
  exact: true,
};

export const learnElement = {
  componentId: 'LearnElement',
  path: `/learn/:${DefinedUrlParams.COURSE_VIEW_TYPE}/:${
    DefinedUrlParams.PATH_IID
  }(\\d+)/:${DefinedUrlParams.COURSE_IID}(\\d+)-:${
    DefinedUrlParams.SYLLABUS_IID
  }(\\d+)/:${DefinedUrlParams.LEARN_ELEMENT_PATH}/:slug.html`,
  component: LearningIndex,
  exact: true,
  layout: 'learn',
};

export const learnElementWithSubChild = {
  componentId: 'LearnElementWithSubChild',
  path: `/learn/:${DefinedUrlParams.COURSE_VIEW_TYPE}/:${
    DefinedUrlParams.PATH_IID
  }(\\d+)/:${DefinedUrlParams.COURSE_IID}(\\d+)-:${
    DefinedUrlParams.SYLLABUS_IID
  }(\\d+)/:${DefinedUrlParams.LEARN_SUB_ELEMENT_IID}/:${
    DefinedUrlParams.LEARN_ELEMENT_PATH
  }/:slug.html`,
  component: LearningIndex,
  exact: true,
  layout: 'learn',
};

// http://localhost:3000/p-learn/384194-384194/2341-43.html
export const syllabusPreview = {
  componentId: 'PreviewSyllabus',
  path: `/learn/:${DefinedUrlParams.COURSE_VIEW_TYPE}(p-learn)/:${
    DefinedUrlParams.COURSE_IID
  }(\\d+)-:${DefinedUrlParams.SYLLABUS_IID}(\\d+)/:slug.html`,
  component: LearningIndex,
  exact: true,
  layout: 'learn',
};

export const courseOverview = {
  componentId: 'CourseOverview',
  path: `/learn/:${DefinedUrlParams.COURSE_VIEW_TYPE}/:${
    DefinedUrlParams.COURSE_IID
  }(\\d+)-:${DefinedUrlParams.SYLLABUS_IID}(\\d+)/:slug.html`,
  component: LearningIndex,
  exact: true,
  // layout: 'learn',
};

export const courseLearn = {
  componentId: 'CourseLearn',
  path: `/learn/:${DefinedUrlParams.COURSE_VIEW_TYPE}/:${
    DefinedUrlParams.COURSE_IID
  }(\\d+)-:${DefinedUrlParams.SYLLABUS_IID}(\\d+)/:${
    DefinedUrlParams.LEARN_ELEMENT_PATH
  }/:slug.html`,
  component: LearningIndex,
  exact: true,
  layout: 'learn',
};

// Ví dụ, khi muốn học một phần của course (một sco), thì route này sẽ show ra màn hình học với nav bar chỉ bao gồm các learning items từ sco đó trở xuống thay vì show toàn bộ syllabus
export const courseLearnWithDifferentNavRootNode = {
  componentId: 'CourseItemLearn',
  path: `/learn/:${DefinedUrlParams.COURSE_VIEW_TYPE}/:${
    DefinedUrlParams.COURSE_IID
  }(\\d+)-:${DefinedUrlParams.SYLLABUS_IID}(\\d+)-:${
    DefinedUrlParams.NAV_ROOT_NODE_IID
  }(\\d+)/:${DefinedUrlParams.LEARN_ELEMENT_PATH}/:slug.html`,
  component: LearningIndex,
  exact: true,
  layout: 'learn',
};

export const courseOverviewByPath = {
  componentId: 'CourseOverviewByPath',
  path: `/learn/:${DefinedUrlParams.COURSE_VIEW_TYPE}/:${
    DefinedUrlParams.PATH_IID
  }(\\d+)/:${DefinedUrlParams.COURSE_IID}(\\d+)-:${
    DefinedUrlParams.SYLLABUS_IID
  }(\\d+)/:slug.html`,
  component: LearningIndex,
  exact: true,
  layout: 'learn',
};

/**
 * stuff related to the learn a course screen
 *
 * @returns {*[]}
 */
export default () => [
  syllabusPreview,
  learnElement,
  courseLearn,
  courseLearnWithDifferentNavRootNode,
  learnElementWithSubChild,

  courseOverviewByPath,
  courseOverViewForUser,
  courseOverview,
  {
    componentId: 'LearningSco',
    path: '/learn/sco/:iid(\\d+)',
    component: LearningOnePage,
    exact: true,
  },
  {
    componentId: 'LearningScoEdit',
    path: '/learn/sco/:edit(\\w+)/:iid(\\d+)',
    component: LearningOnePage,
    exact: true,
  },
];
