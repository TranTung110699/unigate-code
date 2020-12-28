import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import { required } from 'common/validators';
import MemberEditor from './member-editor';
import FormSearchMembers from './member-search/Layout';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const getGroupMemberAddElementSearchHiddenFields = (values) => ({
  target: 'user',
  item_iid: values.context && values.context.iid,
  item_ntype: values.context && values.context.ntype,
  groups_to_exclude: values.groups_to_exclude,
});

export const getGroupMemberAddElement = (values, extraProps) => ({
  type: InputAutoComplete,
  nameElement: 'members',
  componentElementSearch: FormSearchMembers,
  componentElementEditor: MemberEditor,
  optionsProperties: {
    classNameWrapper: 'targets-wrapper',
    classNameEditorWrapper: 'targets-wrapper-editor',
    style: {
      'overflow-y': 'scroll',
      'overflow-x': 'hidden',
      maxHeight: 300,
      paddingRight: 10,
    },
  },
  baseUrl: apiUrls.user_group_report,
  elementSearchProps: {
    hiddenFields: getGroupMemberAddElementSearchHiddenFields(values),
  },
  params: getGroupMemberAddElementSearchHiddenFields(values),
  dataSourceConfig: {
    text: 'key',
    value: 'data',
    valueKeys: ['name', 'iid', 'id'],
    transformData: true,
  },
  floatingLabelText: t1('find_group_or_organization_or_specific_user'),
  fullWidth: true,
  ...extraProps,
});

const schema = (formid, values) => ({
  members: getGroupMemberAddElement(values, {
    validate: [required(t1('select_users_to_add_to_group'))],
  }),
});

const ui = {
  new: [
    {
      fields: ['members'],
    },
  ],
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
