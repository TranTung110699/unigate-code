import { t1 } from 'translate';

export const formatSiteTitle = (ntype, label) => {
  let prefix = '';

  if (!ntype) {
    return label;
  }

  if (ntype === 'credit' || ntype === 'subject') {
    prefix = t1('subject');
  } else if (ntype) prefix = t1(ntype.replace('-', '_'));

  return `${prefix}: ${label}`;
};
