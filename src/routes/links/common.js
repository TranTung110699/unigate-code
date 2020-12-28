/**
 * Created by Peter Hoang Nguyen on 5/3/2017.
 */
import get from 'lodash.get';
import {
  buyPackageUrl,
  catalogue,
  dashboardUrl,
  profileUrl,
} from '../root-url';
import { constants, hashType } from 'configs/constants';
import { stringify } from 'query-string';

export const DefinedUrlParams = {
  COURSE_VIEW_TYPE: 'type_viewer', // view course type: 'learn', 'review', 'preview'..
  SYLLABUS_IID: 'siid',
  PATH_IID: 'piid',
  COURSE_IID: 'ciid',
  NAV_ROOT_NODE_IID: 'item_iid',
  SESION_IID: 'session_iid',
  SKILL_IID: 'skill_iid',
  EXAM_MODE: 'exam_mode',
  USER_IID: 'uiid',
  NTYPE: 'ntype',
  HRMS_TYPE: 'hrms_type',
  SUB_TYPE: 'sub_type',
  LEARN_ELEMENT_IID: 'eiid', // element id
  LEARN_ELEMENT_PATH: 'trackingNavs', // element id
  LEARN_SUB_ELEMENT_IID: ':seIid', // element id
  EXAM_IID: 'examIid',
  EXAM_ORDER: 'examOrder',
  PAPER_ID: 'paperId',
  EXAM_TYPE: 'examType',
  depth: 'depth',
  SLUG: 'slug',
  STEP: 'step',
  SEARCH_KEY: 'search_key',
  CATEGORY_SLUG: 'category_slug',
  IID: 'iid',
  CONTEST_CODE: 'contest_code',
  ACTION: 'action',
  TIMESTAMP: 'timestamp',
  TAKE_ID: 'take_id',
};

export const getSubLearnElementUrl = (
  rootPath = '/',
  learnObject,
  trackingNavs,
  subElmId,
) => {
  if (!learnObject || !trackingNavs || !subElmId) {
    return '';
  }
  const slug = learnObject.slug || 'syllabus';

  return `${rootPath}/${
    learnObject.iid
  }/${trackingNavs}/${subElmId}/${slug}.html`;
};

/**
 * Mostly (if not only) used by /admin
 * @param routeId
 * @param params
 * @returns {string}
 */
export const getUrl = (routeId, params = {}, dialog = false) => {
  let url;

  switch (routeId) {
    // case 'course_preview': {
    //   const { iid } = params;
    //   url = `http://vlms.dev/c/${iid}/overview/am-i.html?editing_syllabus=1`;
    //   break;
    // }
    // case 'school/users': {
    //   return '/admin/school/:usermode(account:user)';
    // }
    case '/': {
      return routeId;
    }
    case 'node_update': {
      const { ntype, id, step, action } = params;
      url = `/${ntype}/${action || 'update'}?id=${id}&_sand_step=${step}`;
      return url;
    }
    case 'node_update_user': {
      const { id, step } = params;
      url = '/user/update?';
      if (id) {
        url += `id=${id}&`;
      }
      if (step) {
        url += `_sand_step=${step}`;
      }
      return url;
    }
    case 'node_delete': {
      const { ntype, id, action } = params;
      url = `/${ntype}/${action || 'delete'}/id=${id}`;
      break;
    }
    case 'node_edit': {
      const {
        iid,
        step,
        subAction,
        ntype,
        type,
        stepNodes,
        queryStringParams,
      } = params;

      let localNodeType = ntype;
      if (ntype === 'path' && type === 'program') localNodeType = 'program';
      else if (ntype === 'path' && type === 'classgroup')
        localNodeType = 'classgroup';
      else if (ntype === 'path' && type === 'subjectgroup') {
        localNodeType = 'financial/subjects-ingroup';
      } else if (ntype === 'syllabus' && type === 'credit')
        localNodeType = 'credit';
      else if (ntype === 'skill' && type === 'rubric') localNodeType = 'rubric';
      else if (ntype === 'category' && type === 'organization')
        localNodeType = 'organization';
      else if (ntype === 'category' && type === 'major')
        localNodeType = 'major';
      else if (ntype === 'category' && type === 'academic')
        localNodeType = 'academic-category';
      else if (ntype === 'category' && type === 'job_position')
        localNodeType = 'job-position';
      else if (ntype === 'category' && type === 'fee')
        localNodeType = 'financial/fee-category';
      else if (type === 'invoice') localNodeType = 'financial/invoice';
      else if (ntype === 'training_plan') localNodeType = 'training-plan';
      else if (ntype === 'enrolment_plan') localNodeType = 'enrolment-plan';
      else if (ntype === 'top_equivalent_position') {
        localNodeType = 'top-equivalent-position';
        // const { CDANHTDUONG_EVN_ID } = params;
        // url = `/${localNodeType}/${CDANHTDUONG_EVN_ID}`;
      }

      // if (ntype !== 'top_equivalent_position') {
      url = `/${localNodeType}/${iid}`;
      // }

      if (stepNodes) {
        stepNodes.forEach((stepNode) => {
          url += `/${stepNode.ntype}/${stepNode.iid}`;
        });
      }

      if (step) {
        url += `/${step}`;
      }

      if (subAction) {
        url += `/${subAction}`;
      }

      if (queryStringParams) {
        url += `?${stringify(queryStringParams)}`;
      }
      break;
    }
    case 'node_new': {
      url = `/${params}/new`;
      break;
    }
    case 'edit_item': {
      const { base = '', item, ntype, mode, type } = params;

      let localNodeType = ntype;
      if (!localNodeType) {
        localNodeType = item.ntype;
      }
      if (ntype === 'path' && item.type === 'program') {
        localNodeType = 'program';
      } else if (ntype === 'path' && item.type === 'classgroup') {
        localNodeType = 'classgroup';
      } else if (item.ntype === 'syllabus' && item.type === 'credit') {
        localNodeType = 'credit';
      } else if (item.ntype === 'skill' && item.type === 'rubric') {
        localNodeType = 'rubric';
      } else if (ntype === 'credit') {
        localNodeType = 'credit';
      }

      url = `${base}/${localNodeType}/${item.iid}`;

      if (item.isExam && type === 'edit') {
        url += '/edit';
      }

      if (mode) {
        url += `/${mode}`;
      }

      if (base) {
        return url;
      }
      break;
    }
    case 'conf': {
      url = '/conf';
      if (params && params.menu) {
        url += `/${params.menu}`;
      }
      if (params && params.type) {
        url += `/${params.type}`;
      }
      break;
    }
    case 'plan': {
      url = '/plan';
      if (params && params.action) {
        url += `/${params.action}`;
      } else {
        url += '/overview';
      }
      break;
    }
    case 'path': {
      url = '/path';
      if (params && params.action) {
        url += `/${params.action}`;
      }
      break;
    }
    case 'bank': {
      url = '/bank';
      if (params && params.type) {
        url += `/${params.type}`;
      }
      break;
    }
    case 'organization': {
      url = '/organization';
      if (params) {
        if (params.action) {
          url += `/${params.action}`;
        }
      }
      break;
    }
    case 'admin_view_student': {
      const { action, iid } = params;
      url = `/student/${params.iid}/${action || 'view'}`;
      break;
    }
    case 'admin_view_student_learning_progress': {
      url = `/student/${params.iid}/learning-progress`;
      break;
    }
    case 'admin_view_student_upcoming_contest': {
      url = `/student/${params.iid}/upcoming-contests`;
      break;
    }
    case 'admin_view_student_taken_contests': {
      url = `/student/${params.iid}/taken-contests`;
      break;
    }
    case 'admin_view_student_goal': {
      url = `/student/${params.user_iid}/user-goal/${params.user_goal_iid}`;
      break;
    }
    case 'admin_view_teacher': {
      url = `/teacher/${params.iid}/info`;
      break;
    }
    case 'admin_view_parent': {
      url = `/parent/${params.iid}/info`;
      break;
    }
    case 'admin_view_account': {
      url = `/user/${params.iid}/edit`;
      break;
    }
    case 'contest': {
      url = '/contest';
      break;
    }
    case 'report': {
      if (params && params.type === 'exam-result') {
        url = '/:action(report)/exam-result';
      }
      break;
    }
    case 'timetable_link': {
      url = `/course/${get(params, 'iid')}/timetable`;
      break;
    }
    case 'overview_timetable_course': {
      url = `/course/${get(params, 'iid')}/schedule`;
      break;
    }
    default: {
      const mapping = {
        search_provinces_or_districts: '/schools-in-vietnam/pd',
        search_schools: '/schools-in-vietnam/school',
        report_excels: '/report/report-excels',
        report_charts: '/report/report-charts',
      };
      if (mapping[routeId]) {
        url = mapping[routeId];
      } else {
        url = `/${routeId}`;
      }
    }
  }
  // const admin = '/admin';
  const rootUrl = params.rootUrl || '/admin';

  if (dialog) {
    if (dialog === 1 || dialog === true) return `${hashType}${rootUrl}${url}`;
    else if (dialog === 'small')
      // dialog is a string specifying the size
      return `${hashType}/small${rootUrl}${url}`;
  }

  return `${rootUrl}${url}`;
};

export const hashUrl = (url, dialog = true) => {
  let theUrl = url;
  if (dialog === 'small')
    // dialog is a string specifying the size
    theUrl = `/small${url}`;

  return `${window.location.pathname}${hashType}${theUrl}`;
};

export const getFrontendUrl = (routeId, params) => {
  let url;

  switch (routeId) {
    case 'learn':
    case 'teach': {
      if (params.slug) {
        return `/${routeId}/news/${params.slug}.html`;
      }
      url = `/${routeId}`;
      if (params) {
        if (params.menu) {
          url += `/${params.menu}`;
        }
        if (params.query) {
          url += `?query=${params.query}`;
        }
      }
      return url;
    }
    case 'request': {
      url = '/request';
      if (params && params.type) {
        url += `/${params.type}`;
      }
      return url;
    }
    case 'blog': {
      url = '/blog';
      if (params && params.categorySlug) {
        url += `/${params.categorySlug}`;
      }
      if (params && params.slug) {
        url += `/${params.slug}.html`;
      }
      if (params && params.query) {
        url += `?query=${params.query}`;
      }
      return url;
    }
    case 'tests': {
      url = '/tests';
      if (params) {
        if (params.type) {
          url += `/${params.type}`;
          if (params.iid) {
            url += `/${params.iid}`;
          }
        }
        if (params.query) {
          url += `?${params.query}`;
        }
      }
      return url;
    }
    case 'pay': {
      return '/pay';
    }
    case 'request_v2': {
      return '/request_v2';
    }
    case 'faq': {
      return '/faq';
    }
    default: {
      const mapping = {
        course_list: '/course-list',
      };
      if (mapping[routeId]) {
        url = mapping[routeId];
      } else {
        url = `/${routeId}`;
      }
    }
  }

  return `/learn${url}`;
};

export const getCatalogueUrl = (routeId, params, forRoute) => {
  switch (routeId) {
    case 'home-category':
      return `/home/:${DefinedUrlParams.CATEGORY_SLUG}/:${
        DefinedUrlParams.IID
      }`;

    case 'category-courses': {
      if (forRoute)
        return `/${params.page}/category-courses/:${DefinedUrlParams.IID}`;
      return `/${params.page}/category-courses/${params.categoryIid}`;
    }

    case 'category-blog': {
      if (forRoute)
        return `/${params.page}/category-blog/:${DefinedUrlParams.IID}`;
      return `/${params.page}/category-blog/${params.categoryIid}`;
    }

    case 'category-slug': {
      if (forRoute) return `/${catalogue}/:${DefinedUrlParams.CATEGORY_SLUG}`;
      return `/${catalogue}/${params.category_slug}`;
    }

    case 'home':
      return `/${catalogue}`;

    default:
      return `/${catalogue}/${routeId}`;
  }
};

/**
 * stuff like /dashboard/rejected-courses , /dashboard/completed-courses
 * @param routeId
 * @param params
 * @param Boolean forRoute: true if we're generating the url for routing,
 * like /dashboard/:action(hello)
 * if false, we're generating the actual url, like /dashboard/hello
 */
export const getDashboardUrl = (routeId, params, forRoute) => {
  if (routeId === 'home') return dashboardUrl;

  const dashboardActions = [
    'progress-reports',
    'overview-courses',
    'in-progress-courses',
    'compulsory-courses',
    'public-courses',
    'assigned-courses',
    'rejected-courses',
    'completed-courses',
    'failed-courses',
    'my-paths',
    'my-enrolment-plans',
    'my-skills',
    'upcoming-contests',
    'taken-contests',
    'update-info',
    'update-avatar',
    'change-password',
    'timetable',
    'register-courses',
    'transcripts',
    'notifications',
    'overview-dashboard',
    'locations',
    'assignments',
    'group-assignments',
    'personal-assignments',
    'overview-timetable',
    'courses',
  ];

  if (routeId === 'my-skills' && params && params.skillIid && params.action) {
    return `${dashboardUrl}/${routeId}/${params.skillIid}/${params.action}`;
  }

  if (routeId === 'my-enrolment-plans') {
    if (forRoute) {
      return `${dashboardUrl}/my-enrolment-plans/:iid?`;
    }
    return `${dashboardUrl}/my-enrolment-plans${
      params && params.iid ? `/${params.iid}` : ''
    }`;
  }

  if (routeId.includes('buy-course')) {
    return `${dashboardUrl}/${routeId}`;
  }

  if (dashboardActions.includes(routeId)) {
    if (forRoute) {
      return `${dashboardUrl}/:action(${routeId})`;
    }
    return `${dashboardUrl}/${routeId}`;
  }

  return '';
};

export const getProfileUrl = (routeId, params, forRoute) => {
  const profileActions = ['update-info', 'update-avatar', 'change-password'];
  if (profileActions.includes(routeId)) {
    if (forRoute) {
      return `${profileUrl}/:action(${routeId})`;
    }
    return `${profileUrl}/${routeId}`;
  }
  return `${profileUrl}/update-info`;
};

export const getMobileUrl = (routeId) => {
  const url = `/${routeId}`;
  return `/mobile${url}`;
};

export function getRootUrl(props) {
  const regex = /^\/([^/]*)/g;
  const m = regex.exec(props && props.location && props.location.pathname);
  return m && m.length > 1 ? m[m.length - 1] : '';
}

/**
 * This should be corresponding to the all the routes in the routes config
 * @param ntype
 */
const getTypeAndNtype = (ntype) => {
  let type;
  let realNtype = ntype;
  if (ntype === 'program') {
    realNtype = 'path';
    type = 'program';
  }
  if (ntype === 'classgroup') {
    realNtype = 'path';
    type = 'classgroup';
  }
  if (ntype === 'subjects-ingroup') {
    realNtype = 'path';
    type = 'subjectgroup';
  }
  if (ntype === 'credit') {
    realNtype = 'syllabus';
    type = 'credit';
  }
  if (ntype === 'rubric') {
    realNtype = 'skill';
    type = 'rubric';
  }
  if (ntype === 'academic-category') {
    realNtype = 'category';
    type = 'academic';
  }
  if (ntype === 'organization') {
    realNtype = 'category';
    type = 'organization';
  }
  // if (ntype === 'job-position') {
  //   realNtype = 'category';
  //   type = 'job-position';
  // }
  if (ntype === 'fee-category') {
    realNtype = 'category';
    type = 'fee';
  }
  if (ntype === 'major') {
    realNtype = 'category';
    type = 'major';
  }
  if (ntype === 'user-goal') {
    realNtype = 'userGoal';
  }
  if (ntype === 'training-plan') {
    realNtype = 'training_plan';
  }
  if (ntype === 'enrolment-plan') {
    realNtype = 'enrolment_plan';
  }

  if (ntype === 'teacher' || ntype === 'student' || ntype === 'parent')
    realNtype = 'user';

  return { ntype: realNtype, type };
};

const parseAncestorsFromSimpleArray = (ancestorArray) => {
  const ret = {};

  if (ancestorArray.length >= 2) {
    const ntype = ancestorArray[0];
    const a = getTypeAndNtype(ntype);

    if (a.type) ret.type = a.type;
    ret.urlNtype = ntype; // url can be /training-program/123 but ntype is training_program
    ret.ntype = a.ntype;

    ret.iid = ancestorArray[1];

    // if iid is integer => make it integer
    if (ntype !== 'question') {
      ret.iid = parseInt(ret.iid);
    }

    if (ancestorArray[2]) ret.action = ancestorArray[2];
    if (ancestorArray.length > 3) ret.subAction = ancestorArray.splice(3);
    else ret.subAction = null;
  }

  return ret;
};

// some of the urls
// /admin/syllabus/123/children/sco/1/edit...
// /admin/syllabus/123/edit
// /admin/syllabus/123/children/sco/1/children/video/4323/edit/sequential
//
export const parseItemAncestorsFromUrlCommon = (url) => {
  /**
   * first break /admin/syllabus/123/children/sco/1/children/video/4323/edit/sequential into an array of 3 elements
   * ['syllabus', 123, 'children']
   * ['sco', 1, 'children']
   * ['video', 4323, 'edit', 'sequential']
   *
   * And then we'll map into array of objects
   */
  const ancestors = [];

  // const path = url.replace('/small/admin/', '/');

  const path = url
    .replace('/admin/financial/', '/')
    .replace('/small/admin/', '/')
    .replace('/admin/', '/');

  const tmp = path.split('/');

  // remove the first "" value
  tmp.shift();

  let itemAncestors = [];
  let action = '';
  let subAction = '';

  let nthItem = -1;

  if (tmp.length <= 1)
    return {
      itemAncestors,
      action,
      subAction,
    };

  if (!constants.allNtypesOnUrl.includes(tmp[0])) {
    console.error(tmp[0], 'is not a valid url ntype token');
    return {
      itemAncestors,
      action,
      subAction,
    };
  }

  tmp.forEach((token, idx) => {
    // we have to check for idx because sometimes we have a url like this
    // /admin/syllabus/123/survey
    // which edits survey of the syllabus but 'survey' is also a valid ntype
    if (constants.allNtypesOnUrl.includes(token) && idx !== tmp.length - 1) {
      nthItem += 1;
      ancestors.push([token]);
    } else {
      ancestors[nthItem].push(token);
    }
  });

  itemAncestors = ancestors.map((ancestor) =>
    parseAncestorsFromSimpleArray(ancestor),
  );

  const ancestorsLength = ancestors.length;

  itemAncestors.forEach((ancestor, idx) => {
    if (idx === 0) ancestors[idx].pIid = 0;
    else ancestors[idx].pIid = ancestors[idx - 1].iid;
    if (idx === ancestorsLength - 1) {
      subAction = ancestor.subAction;
      action = ancestor.action;
    }
  });

  return {
    itemAncestors,
    action,
    subAction,
  };
};

// const urls = [
//   '/admin/syllabus/123/children/sco/1/edit',
//   '/admin/syllabus/123/edit',
//   '/admin/syllabus/123/children/sco/1/children/video/4323/edit/sequential',
//   '/admin/survey/123/children/question/312312asdfadfasf/edit',
// ];
//
// urls.forEach((url) => {
//   const y = parseItemAncestorsFromUrlCommon(url);
//   console.log(y);
// });

export const getBuyPackageUrl = (routeId) => {
  if (!routeId) return buyPackageUrl;
  return `${buyPackageUrl}/${routeId}`;
};
