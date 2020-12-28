import { createSelector } from 'reselect';
import layout, {
  getSchoolSelector as getSchool,
  getThemeConfig,
} from 'utils/selectors';

const createSelectorParams = (number) =>
  [...Array(number).keys()].map((index) => (...args) => args[index]);

export const layoutSelector = layout;

export const getThemeConfigSelector = getThemeConfig;

export const getSchoolSelector = getSchool;

export const createSelectorFromFunction = (numberOfParamsInFunc, func) => {
  if (typeof func !== 'function') {
    throw new Error(
      `createSelectorFromFunction require second argument to be a function, you give ${func}`,
    );
  }

  if (!Number.isInteger(numberOfParamsInFunc) || numberOfParamsInFunc <= 0) {
    throw new Error(
      `createSelectorFromFunction require first argument to be an integer > 0, you give ${numberOfParamsInFunc}`,
    );
  }

  return createSelector(createSelectorParams(numberOfParamsInFunc), func);
};

export const createSelectorWithExtraParams = (...params) => {
  if (params.length < 3) {
    throw new Error(
      `createSelectorWithExtraParams require at least 3 params, you give ${params}`,
    );
  }

  const selectorParams = params.slice(0, params.length - 2);

  const numberOfParamsInFunc = params[params.length - 2];
  if (!Number.isInteger(numberOfParamsInFunc) || numberOfParamsInFunc <= 0) {
    throw new Error(
      `createSelectorWithExtraParams (n-1)th argument must be an integer > 0, you give ${numberOfParamsInFunc}`,
    );
  }

  const func = params[params.length - 1];
  if (typeof func !== 'function') {
    throw new Error(
      `createSelectorWithExtraParams last argument must be a function, you give ${func}`,
    );
  }

  return createSelector(...selectorParams, (...childFunctionParams) =>
    createSelectorFromFunction(
      numberOfParamsInFunc,
      func(...childFunctionParams),
    ),
  );
};
