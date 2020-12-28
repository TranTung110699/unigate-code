import {
  extractCurrentIndexFromXpath,
  extractLastFieldNameFromXpath,
} from 'common/utils/form';

const getAvailableFilters = (values, xpath) => {
  const addableIndex = xpath ? extractCurrentIndexFromXpath(xpath) : undefined;

  let availableFilters;
  if (typeof addableIndex === 'undefined')
    availableFilters = values && values.availableFilters;
  else {
    // xpath is something like 'filtersets[0]', we need to return 'filtersets'
    const filtersetsKey = extractLastFieldNameFromXpath(xpath);
    const filtersets = values[filtersetsKey];
    availableFilters =
      filtersets &&
      filtersets[addableIndex] &&
      filtersets[addableIndex].availableFilters;
  }
  return availableFilters;
};

export default getAvailableFilters;

export const editGroupFiltersFormId = 'edit_group_filters';
export const filtersForSingleUser = [
  'text',
  'codes',
  'code',
  'iid',
  'mail',
  'lname',
  'finishing_senior_groups',
  'school__grade',
  'school__group',
];
export const filtersForTargetGroup = [
  'user_organizations',
  'positions',
  'equivalent_positions',
  'evn_equivalent_positions',
  'sex',
  'age',
  'skill',
  'major_box',
  'contract_box',
  'credit_syllabuses',
  'statuses',
  'total_credit_box',
  'average_score_box',
  'sign_number',
  'decision_number',
  'date_of_issue',
  'delivery_date',
  'graduating_senior_status',
  'get_member_belonged_others_group',
  'experience',
  'passed_all_subject',
  'external',
];
