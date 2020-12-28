/*
 all the possible actions in url
 /admin/syllabus/12/edit
 /admin/syllabus/12/skills
 /admin/syllabus/12/papers
 /admin/syllabus/12/staff
 /admin/syllabus/12/translate
 /admin/syllabus/12/courses
*/
import actions from 'actions/node/creators';
import { bankDialogTabDisplayTypes } from 'components/admin/node/bank/utils';

export const urlActions = [
  'edit',
  'skills',
  'staff',
  'papers',
  'courses',
  'translate',
  'avatar',
  'legacy',
  'sequential',
  'score-passing',
  'children',
  'roles',
  'advanced-settings',
  'questions-of-video',
  'add-item',
];

// export default actions;

export const getEditBaseUrl = (pathname) => {
  let ret = pathname;
  urlActions.forEach((action) => {
    if (ret.endsWith(`/${action}`)) {
      ret = ret.replace(`/${action}`, '');
    }
  });

  return ret;
};

/**
 * if we're in url like
 *  /admin/syllabus/123/children?/bank/123/video/text
 *  then 'search' is '/bank/123/video/text' part
 *
 *
 *  search could be
 *  /bank/123/video/text/search_only
 *  /bank/123/video/search_only
 *  /bank/123/video/text/new_only
 *
 * @see addLink in metadata/AddItem
 * @param search the search portion
 */
export const setBankEdit = (search, dispatch) => {
  if (!search || search.indexOf('?/bank/') === -1) {
    return;
  }

  // /bank/$editingItemiid/$ntype/$type;

  const tmp = search.replace('?/bank/', '').split('/');

  if (tmp.length >= 2) {
    const editingItemIid = tmp[0];
    const ntype = tmp[1];
    let type = tmp.length > 2 ? tmp[2] : '';
    if (
      type == bankDialogTabDisplayTypes.SEARCH_ONLY ||
      type == bankDialogTabDisplayTypes.NEW_ONLY
    ) {
      type = '';
    }
    // const displayMode = tmp.length > 3 ? tmp[3] : '';
    dispatch(actions.setBankNtype(ntype, type, editingItemIid));
  }
};

export const generateBaseUrlFromItemAncestors = (itemAncestors) => {
  let ret = '/admin';
  itemAncestors.forEach((item) => {
    ret = ret + `/${item.ntype}/${item.iid}`;
  });
  return ret;
};
