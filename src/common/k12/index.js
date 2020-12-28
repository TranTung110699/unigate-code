import lodashGet from 'lodash.get';

export const isK12 = (state) => {
  return lodashGet(state, 'domainInfo.conf.k12');
};

export const getCurrentSemester = (state) =>
  lodashGet(state, 'domainInfo.conf.k12_current_semester');
