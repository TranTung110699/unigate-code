import get from 'lodash.get';

/**
 * all the options in the multicheckbox/select are stored in e.g state.formSchemaConfigs.user_search.organizations
 * in an array like this [
 *  { value: 12, primaryText: '12' }
 *  { value: 15, primaryText: '15' }
 * ]
 * we need to return [12, 15...]
 * @param state
 * @param formid
 * @param field
 * @return {*}
 */
export const getAllPossibleValuesInAMultiCheckbox = (state, formid, field) => {
  const x = get(state, `formSchemaConfigs.${formid}.${field}`);
  // now extract the values
  if (x && x.length) return x.map((i) => i.value);

  return null;
};
