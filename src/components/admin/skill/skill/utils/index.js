import { createSelector } from 'reselect';
import { confSelector } from 'common/selectors';
import { createSelectorWithExtraParams } from 'utils/selector';
import get from 'lodash.get';

const allScoreScalesSelector = createSelector(
  confSelector,
  (conf) => conf.all_score_scales,
);

export const skillScaleOptionsSelector = createSelector(
  allScoreScalesSelector,
  (allScoreScale) => {
    if (!allScoreScale) {
      return [];
    }
    return Object.keys(allScoreScale)
      .map((key) => {
        const scoreScale = allScoreScale[key];
        if (!scoreScale) {
          return null;
        }
        return {
          value: key,
          primaryText: scoreScale.name,
        };
      })
      .filter((option) => option);
  },
);

export const getSkillScaleInfoSelector = createSelectorWithExtraParams(
  allScoreScalesSelector,
  1,
  (allScoreScale) => (scale) => {
    if (!allScoreScale) {
      return null;
    }
    return allScoreScale[scale];
  },
);

export const getCoverPercentOfScaleParts = (fullScale, partIndex) => {
  const part = fullScale && fullScale.parts && fullScale.parts[partIndex];
  return (
    (part &&
      Array.isArray(part.from_100) &&
      part.from_100[1] - part.from_100[0]) ||
    0
  );
};

export const getValueWhenSelectAScalePart = (fullScale, partIndex) => {
  const part = fullScale && fullScale.parts && fullScale.parts[partIndex];
  return part && Array.isArray(part.from_100) && part.from_100[1];
};

export const isValueInScalePartRange = (value, fullPart, partIndex) =>
  fullPart &&
  Array.isArray(fullPart.from_100) &&
  (partIndex === 0
    ? value >= fullPart.from_100[0]
    : value > fullPart.from_100[0]) &&
  value <= fullPart.from_100[1];

export const getValueWhenInputAScalePart = (fullScale, inputValue) => {
  if (inputValue === '') {
    return undefined;
  }
  let partIndex =
    fullScale &&
    fullScale.parts &&
    fullScale.parts.findIndex(
      (part) => part && part.input_value === inputValue,
    );
  partIndex = partIndex !== -1 ? partIndex : 0;
  const part = fullScale && fullScale.parts && fullScale.parts[partIndex];
  return part && Array.isArray(part.from_100) && part.from_100[1];
};

export const getValueWhenInput = (
  fullScale,
  inputValue,
  scalePartIdAsValue,
) => {
  if (inputValue === '') {
    return undefined;
  }

  const min = get(fullScale, 'scoring_input_range.min', 0);
  const max = get(fullScale, 'scoring_input_range.max', 100);

  let adjustedInputValue = inputValue;

  if ([4, 10, 100].includes(max) && adjustedInputValue > max) {
    adjustedInputValue = adjustedInputValue / 10;
  }
  if (adjustedInputValue > max) {
    adjustedInputValue = max;
  }
  if (adjustedInputValue < min) {
    adjustedInputValue = min;
  }
  if (scalePartIdAsValue) {
    return adjustedInputValue;
  }
  return (adjustedInputValue - min) * (100 / (max - min));
};

export const getScalePartInputValueFromValue = (fullScale, value) => {
  if (value === undefined) {
    return '';
  }
  let partIndex =
    fullScale &&
    fullScale.parts &&
    fullScale.parts.findIndex((part, index) =>
      isValueInScalePartRange(value, part, index),
    );
  partIndex = partIndex !== -1 ? partIndex : 0;
  const part = fullScale && fullScale.parts && fullScale.parts[partIndex];
  return part && part.input_value;
};

export const getInputValueFromValue = (
  fullScale,
  value,
  scalePartIdAsValue,
) => {
  if (value === undefined) {
    return '';
  }
  const min = get(fullScale, 'scoring_input_range.min', 0);
  const max = get(fullScale, 'scoring_input_range.max', 100);
  if (scalePartIdAsValue) {
    return value;
  }
  return min + value / (100 / (max - min));
};

export const fromValueToScalePartGivenParts = (value, scaleParts) =>
  Array.isArray(scaleParts) &&
  scaleParts.find((part, index) => isValueInScalePartRange(value, part, index));

export const fromValueToScalePart = (value, fullScale) =>
  fullScale && fromValueToScalePartGivenParts(value, fullScale.parts);

export const pointSpectrumConfigSelector = createSelector(
  confSelector,
  (conf) => conf && conf.point_spectrum,
);

export const getScaledChildrenOfNode = (node, scale) =>
  node && scale === node.scale && node.scaled_children;

export const getScaledChildOfNode = (node, scale, scalePartIndex) => {
  const scaleChildren = getScaledChildrenOfNode(node, scale);
  return Array.isArray(scaleChildren) && scaleChildren[scalePartIndex];
};

export const defaultScoreScaleForMarkingSelector = createSelector(
  allScoreScalesSelector,
  (allScoreScales) => {
    if (!allScoreScales) {
      return null;
    }
    let result = Object.keys(allScoreScales).find((scale) => {
      const scaleInfo = allScoreScales[scale];
      if (scaleInfo && scaleInfo.default) {
        return true;
      }
      return false;
    });
    if (!result) {
      result = Object.keys(allScoreScales).sort()[0];
    }
    return result;
  },
);
