import routes from 'routes';
import { aspects } from 'components/admin/skill/configs';
import { ntype as allNtypes } from 'configs/constants';
import {
  isSurvey,
  isEnrolmentPlanProgram,
  isProgram,
} from 'components/admin/node/utils';

// special case for path & admin
export const itemPathForAdmin = (
  item,
  baseUrl,
  fieldEdit,
  node,
  itemAncestors,
) => {
  // attaching skills to items
  if (fieldEdit === 'skills') return `/admin/skill/${item.iid}`;

  // special cases
  // editing skill's aspect
  // revert mr.Steve's code
  if (node.ntype === 'skill') {
    if (node.type === 'rubric') return '#';
    if (aspects.indexOf(fieldEdit) !== -1)
      return `/admin/${item.ntype}/${item.iid}`;
  }

  if (item.ntype === 'path') return `/admin/path/${item.iid}`;
  else if (item.ntype === 'course') return `/admin/course/${item.iid}`;
  else if (
    item.ntype === 'syllabus' &&
    item.type === 'credit' &&
    node.ntype === 'path'
  )
    // else if (item.ntype === 'syllabus' && node.ntype === 'path') /* program */
    return `/admin/credit/${item.iid}`;

  if (
    itemAncestors &&
    itemAncestors.some((ancestor) => ancestor && ancestor.ntype === 'goal')
  ) {
    if (item.ntype === 'zm') {
      return '';
    }
    return routes.url('edit_item', { item });
  }

  return routes.url('edit_item', {
    base: baseUrl.replace('skills', ''),
    item,
  });
};

export const shouldRenderItem = (item, metadataFilters) =>
  item.ntype === 'path' || item.ntype === 'sco' || metadataFilters[item.ntype];

// returns array like ['exercise', 'question']...
const getAvailableNtypesInArray = ({ node, fieldEdit }) => {
  let available;
  if (node.ntype === 'path') {
    available = ['course', 'syllabus']; // path is always available
    if (isEnrolmentPlanProgram(node) || isProgram(node)) {
      available = available.concat(['path']);
    }
  } else if (node.ntype === 'skill') {
    if (fieldEdit === 'learning_items') {
      // TODO: interect with available content types
      available = [
        'path',
        'course',
        'syllabus',
        'sco',
        'video',
        'exercise',
        'question',
        'vocabset',
        'vocab',
      ];
    } else if (fieldEdit === 'pratice_items' || fieldEdit === 'refresh_items') {
      available = [
        'path',
        'course',
        'syllabus',
        'sco',
        'exercise',
        'question',
        'vocabset',
        'vocab',
      ];
    } else if (fieldEdit === 'entry_items') {
      available = [
        'path',
        'course',
        'syllabus',
        'sco',
        'exercise',
        'question',
        'vocabset',
        'vocab',
      ];
    } else if (fieldEdit === 'output_items') {
      available = [
        'path',
        'course',
        'syllabus',
        'sco',
        'exercise',
        'question',
        'vocabset',
        'vocab',
      ];
    } else if (fieldEdit === 'apply_items') {
      available = ['exercise'];
    } else {
      available = ['skill'];
    }
  } else if (node.ntype === 'exercise') {
    available = ['question', 'vocabset'];
  } else if (node.ntype === 'goal') {
    available = ['zm', 'skill'];
  } else if (fieldEdit === 'skills') {
    available = ['skill'];
  } else {
    available = ['video', 'exercise', 'question', 'vocabset', 'vocab'];
  }
  return available;
};

// get default node types to show as filters
export const getDefaultNtypeFilters = (props) => {
  const { modules } = props;

  const available = getAvailableNtypesInArray(props);
  // available = ['skill'];
  // intersect with availableNtypeFilters
  const retArr = available.filter((ntype) => modules.includes(ntype));

  const ret = {};
  retArr.forEach((n) => {
    ret[n] = true;
  });

  return ret;
};

export const getNtypeFiltersToRender = (props) => {
  const { modules, availableNtypeFilters } = props;

  const available = getAvailableNtypesInArray(props);
  // available = ['skill'];
  // intersect with availableNtypeFilters
  const retArr = available.filter((ntype) => {
    if (!modules.includes(ntype)) {
      return false;
    }
    return !(
      !availableNtypeFilters ||
      !availableNtypeFilters.length ||
      !availableNtypeFilters.includes(ntype)
    );
  });

  const ret = {};
  retArr.forEach((n) => {
    ret[n] = true;
  });

  return ret;
};

const isEditingSyllabusRubric = (node) =>
  node && node.ntype === 'skill' && node.type === 'rubric';

export const getActionFilters = (node, action) => {
  // const { node, action } = this.props;

  if (isEditingSyllabusRubric(node) || allNtypes.PROGRAM === node.type) {
    return ['weight'];
  } else if (
    [allNtypes.GOAL, allNtypes.PATH, allNtypes.PROGRAM].includes(node.ntype) ||
    isSurvey(node)
  ) {
    return [];
  }

  if (isSurvey(node)) {
    return [];
  }

  const result = ['duration', 'weight', 'comment'];
  if (
    node.ntype !== allNtypes.QUESTION &&
    node.ntype !== allNtypes.EXERCISE &&
    node.ntype !== allNtypes.VOCAB &&
    !['skills'].includes(action)
  ) {
    result.push('sequential');
  }

  return result;
};

export const getDefaultNtypeFiltersAndActionFilters = (props) => {
  const { node, action, metadataFilters, viewSettingConfig } = props;
  const ret = getDefaultNtypeFilters(props);
  // ret = concatActionsFilters(ret, props);
  const actionFilters = getActionFilters(node, action);
  // TODO: define what's defaulted to show
  let unchecked;
  if (isEditingSyllabusRubric(node)) {
    unchecked = ['duration', 'content', 'sequential'];
  } else {
    unchecked = ['comment', 'duration', 'content', 'weight', 'sequential'];
    unchecked = unchecked.filter(
      (setting) => !viewSettingConfig.includes(setting),
    );
  }
  // if a key already exists in this.metadataFilters, we keep it
  actionFilters.forEach((n) => {
    ret[n] =
      (metadataFilters && metadataFilters[n]) || unchecked.indexOf(n) === -1;
  });
  return ret;
};

export const getMaximumAllowedDepth = (node) => {
  if (node && node.ntype === allNtypes.GOAL) {
    return 2;
  }
  return -1;
};
