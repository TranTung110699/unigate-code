export const bankDialogTabDisplayTypes = {
  SEARCH_ONLY: 'search_only',
  NEW_ONLY: 'new_only',
  BOTH: '',
};

export const getAllowAddPmdRubric = (node, depth = 2) => {
  if (!node) return false;

  if (node.type !== 'rubric') return false;

  if (node.sub_type === 'academic_score') {
    return true;
  }
  //TODO check ums
  return depth === 2;
};

/**
 * @see function setBankEdit
 * @param search
 * @return {*}
 */
export const getDisplayTypeFromUrl = (search) => {
  if (!search || search.indexOf('?/bank/') === -1) {
    return bankDialogTabDisplayTypes.BOTH;
  }

  // /bank/$editingItemiid/$ntype/$type;

  const tmp = search.replace('?/bank/', '').split('/');

  let ret;
  if (tmp.length > 3) {
    ret = tmp[3];
  } else if (tmp.length == 3) {
    // ?/bank/123/video/search_only
    ret = tmp[2];
  }

  if (
    ret == bankDialogTabDisplayTypes.NEW_ONLY ||
    ret == bankDialogTabDisplayTypes.SEARCH_ONLY
  )
    return ret;
  else return bankDialogTabDisplayTypes.BOTH;
};
