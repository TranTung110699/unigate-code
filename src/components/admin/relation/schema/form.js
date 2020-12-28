/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import { required, usersMappedRoles } from 'common/validators';
import UserEditor from './user-editor';
import StaffEditor from './staff-editor';
import UserSearch from './user-search/Layout';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  // console.log('formid, values, step ->>>>>>:', formid, values, step);
  return {
    o: {
      type: InputAutoComplete,
      nameElement: 'o',
      componentElementSearch: UserSearch,
      componentElementEditor: StaffEditor,
      baseUrl: apiUrls.user_search,
      elementSearchProps: {
        hiddenFields: values && values.elementSearchProps,
      },
      elementEditorProps: {
        roleAppliedTargetIid: values.roleAppliedTargetIid,
        type: values.ntype || '',
      },
      params: values && values.elementSearchProps,
      dataSourceConfig: {
        text: 'name',
        value: 'data',
        valueKeys: ['name', 'iid', 'id', 'avatar'],
        transformData: true,
      },
      floatingLabelText: t1('find_user'),
      fullWidth: true,
      validate: [
        required(t1('staff_is_required')),
        usersMappedRoles(t1('you_must_choose_roles_for_every_staff')),
      ],
    },
    supervisor_iids: {
      type: InputAutoComplete,
      nameElement: 'supervisor_iids',
      componentElementSearch: UserSearch,
      baseUrl: '/user/api/search',
      params: {
        include_sub_organizations: 1,
        ntype: 'user',
        _sand_step: 'students',
        is_staff: true,
        user_organizations: props.orgIids,
      },
      dataSourceConfig: {
        text: 'name',
        value: 'iid',
        valueKeys: ['iid'],
        transformData: true,
      },
      floatingLabelText: t1('find_user'),
      fullWidth: true,
      validate: [required(t1('supervisor_is_required'))],
      fieldSearch: 'text',
    },
    oid: {
      type: InputAutoComplete,
      nameElement: 'oid',
      componentElementSearch: UserSearch,
      componentElementEditor: UserEditor,
      baseUrl: apiUrls.user_search,
      elementSearchProps: {
        hiddenFields: {
          _sand_step: 'users',
          category_iid: values.sid,
        },
      },
      params: {
        _sand_step: 'users',
        category_iid: values.sid,
      },
      dataSourceConfig: {
        text: 'name',
        value: 'data',
        valueKeys: ['name', 'iid', 'id', 'avatar'],
        transformData: true,
      },
      floatingLabelText: t1('find_user'),
      fullWidth: true,
    },
  };
};

const ui = (step, values, themeConfig, xpath, formid, props) => {
  const defaultNewStaff = [
    {
      id: 'default',
      fields: ['o'],
    },
  ];

  if (formid === 'new_user_group_supervisor') {
    return [
      {
        id: 'default',
        fields: ['supervisor_iids'],
      },
    ];
  }

  const config = {
    new_academic_staff: defaultNewStaff,
    new_resource_staff: defaultNewStaff,
    new_organization_staff: defaultNewStaff,
    new_user_group_staff: defaultNewStaff,
    new_organization_students: [
      {
        id: 'default',
        fields: ['oid'],
      },
    ],
  };

  return config[step];
};

const layout = {
  new: '',
};

const finalProcessBeforeSubmit = (fullData, node, schema, mode, step) => {
  // return new data
  if (mode === 'new' && ['organization_students'].includes(step)) {
    if (fullData && Array.isArray(fullData.oid)) {
      return {
        ...fullData,
        oid: fullData.oid.map((user) => user.iid),
      };
    }
  }

  if (
    Array.isArray(fullData.supervisor_iids) &&
    fullData.supervisor_iids.length
  ) {
    return {
      ...fullData,
      supervisor_iids: fullData.supervisor_iids.map((u) => u.iid),
    };
  }

  return fullData;
};

export default { schema, ui, layout, finalProcessBeforeSubmit };
