import { getUrl } from 'routes/links/common';
import t1 from 'translate';
import Store from 'store/index';

/**
 * Created by DVN on 8/22/2017.
 */
const bankConfigs = [
  'question',
  'path',
  'program',
  'plan',
  'syllabus',
  'credit',
  'course',
  'sco',
  'video',
  'vocabset',
  'vocab',
  'exercise',
  'skill',
];

export function filterBankListEnable() {
  const { domainInfo } = Store.getState();
  if (!domainInfo) return [];

  const { school } = domainInfo;
  if (!school) return [];

  const { modules } = school;
  if (!modules) return [];

  const res = [];
  bankConfigs.forEach((bank) => {
    if (modules.includes(bank)) {
      res.push(bank);
    }
  });
  return res;
}

export default function() {
  const items = [];
  const bankList = filterBankListEnable();
  bankList.forEach((type) => {
    items.push({
      id: type,
      href: getUrl('bank', { type }),
      label: t1(type),
    });
  });
  return items;
}
