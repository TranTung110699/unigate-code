import { confSelector } from 'common/selectors';
import { createSelectorWithExtraParams } from 'utils/selector';
import { t1 } from 'translate';
import { getCategoryStructureLevelNameFromConfig } from './index';

export const getCategoryStructureLevelNameSelector = createSelectorWithExtraParams(
  confSelector,
  2,
  (conf) => (type, level) => {
    let label = null;
    if (type === 'major' && level === 0) {
      label = t1('major');
    } else if (type === 'major' && level === 1) {
      label = t1('specialization');
    }

    return getCategoryStructureLevelNameFromConfig(
      { type },
      conf,
      level,
      label,
    );
  },
);

export const getAllLevelsFromASpecificLevelSelector = createSelectorWithExtraParams(
  getCategoryStructureLevelNameSelector,
  2,
  (getCategoryStructureLevelName) => (type, fromLevel) => {
    let results = [];
    const offset = typeof fromLevel !== 'undefined' ? fromLevel : -1;
    let depth = 0;

    while (true) {
      const levelName = getCategoryStructureLevelName(type, depth + offset + 1);
      if (!levelName) {
        break;
      }
      results = results.concat([
        {
          depth,
          name: levelName,
        },
      ]);
      depth += 1;
    }

    return results;
  },
);

export const getDepthOptionsForCategoryStructureLevelSearchSelector = createSelectorWithExtraParams(
  getAllLevelsFromASpecificLevelSelector,
  2,
  (getAllLevelsFromASpecificLevel) => (type, parentLevel) => {
    const allLevelFromThisLevel = getAllLevelsFromASpecificLevel(
      type,
      parentLevel,
    );
    const maxLevel = allLevelFromThisLevel[allLevelFromThisLevel.length - 1];
    const maxDepth = (maxLevel && maxLevel.depth) || 0;

    let depthOptions = allLevelFromThisLevel.map(({ depth, name }) => ({
      value: String(depth),
      label: t1(name),
    }));

    if (depthOptions.length <= 1) {
      depthOptions = [];
    }

    return {
      depthOptions,
      maxDepth,
    };
  },
);
