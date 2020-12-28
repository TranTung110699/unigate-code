import lodashPickBy from 'lodash.pickby';
import lodashGet from 'lodash.get';
import { set } from 'common/utils/object';

export const getSelectedCreditSyllabusIids = (value) => () => {
  return Object.keys(
    lodashPickBy(value, (item) => {
      return lodashGet(item, 'selected');
    }),
  ).map((orgIid) => Number.parseInt(orgIid, 10));
};

export const getNumberOfSelectedCreditSyllabuss = (value) => () => {
  return (getSelectedCreditSyllabusIids(value)() || []).length;
};

export const isCreditSyllabusSelected = (value) => (creditSyllabusIid) => {
  return lodashGet(value, [creditSyllabusIid, 'selected']);
};

export const setIsCreditSyllabusSelected = (value, onChange) => (
  creditSyllabusIid,
  selected,
) => {
  onChange(set(value, [creditSyllabusIid, 'selected'], selected));
};
