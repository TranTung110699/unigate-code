import { DefinedUrlParams, getCatalogueUrl } from 'routes/links/common';
import Loadable from 'react-loadable';
import Loading from 'components/common/loading';

const PreviewPaper = Loadable({
  loader: () => import('components/contest/preview-paper'),
  loading: Loading,
});

// TODO: fix this
const ExamTesting = Loadable({
  loader: () => import('components/contest/pre-exam'),
  loading: Loading,
});
const ExamResult = Loadable({
  loader: () => import('components/contest/exam-result'),
  loading: Loading,
});
const PreviewTake = Loadable({
  loader: () => import('components/contest/preview-take'),
  loading: Loading,
});

export default () => [
  {
    componentId: 'ExamInfo',
    path: '/exam/info',
    component: ExamTesting,
    exact: true,
  },
  {
    componentId: 'ExamInfoDetail',
    path: `/exam/take/:${DefinedUrlParams.CONTEST_CODE}`,
    component: ExamTesting,
    exact: true,
  },
  {
    componentId: 'ExamResult',
    path: `/exam/result/:${DefinedUrlParams.CONTEST_CODE}/:${
      DefinedUrlParams.COURSE_IID
    }/:${DefinedUrlParams.EXAM_IID}/:${DefinedUrlParams.EXAM_ORDER}/:${
      DefinedUrlParams.USER_IID
    }?`,
    component: ExamResult,
    exact: true,
  },
  {
    componentId: 'PreviewPaper',
    path: `/exam/preview-paper/:${DefinedUrlParams.SYLLABUS_IID}(\\d+)/:${
      DefinedUrlParams.PAPER_ID
    }`,
    component: PreviewPaper,
    exact: true,
  },
  {
    componentId: 'PreviewTake',
    path: `/exam/preview-take/:${DefinedUrlParams.TAKE_ID}`,
    component: PreviewTake,
    exact: true,
  },
];
