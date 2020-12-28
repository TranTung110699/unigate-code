import { t1 } from 'translate/index';

const url = '/target-group/api/get-enabled-filters';

const availableFilters = (
  defaultEnabledFilters,
  multiple,
  isStaff = null,
  groupType,
  addMemberToGroupForm,
  classWrapper,
) => ({
  type: 'select',
  multiple: true,
  hintText: t1('more_filters'),
  floatingLabelText: t1('more_filters'),
  options: 'async',
  paramsasync: {
    __url__: multiple ? `${url}?is_multiple_filtersets=1` : url,
    value: {
      is_staff: isStaff,
      group_type: groupType,
      add_member_to_group_form: addMemberToGroupForm,
    },
  },
  // defaultValue: ['text'],
  defaultValue: defaultEnabledFilters,
  fullWidth: true,
  renderedLabel: t1('add_filters'),
  // ['text', 'positions', 'skill', 'user_organizations', 'sex', 'age'],
  classWrapper,
});

export default availableFilters;
