import { t1 } from 'translate';
import { taphuanSubTypes } from 'configs/constants';

export const getCategoryStructureLevelNameFromConfig = (
  node = {}, // [organization|major]
  conf,
  level = 0,
  label = null,
) => {
  const { type, sub_type } = node;
  let confValue = 0; // the config value from server. Integer = number of levels in the school
  switch (type) {
    case 'organization': {
      confValue = conf && conf.organization_structure_levels;
      break;
    }
    case 'major': {
      confValue = conf && conf.major_structure_levels;
      break;
    }
    default:
  }

  if (!confValue || level > parseInt(confValue))
    // too many levels down, more than the allowed configured depth value
    return '';

  if (label) {
    return label;
  }

  if (window.isTaphuan && Object.values(taphuanSubTypes).includes(sub_type)) {
    return 'Tổ bộ môn';
  }

  switch (type) {
    case 'organization': {
      return t1(`organization_level_${level}`);
    }
    case 'major': {
      return t1(`major_level_${level}`);
    }
    default:
      return '';
  }
};
