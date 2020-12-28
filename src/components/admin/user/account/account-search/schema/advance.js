import React from 'react';
import store from 'store/index';
import get from 'lodash.get';
import { t1 } from 'translate/index';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

import { equivalentPositions } from 'components/admin/equivalent-job-position/schema/elements/index';
import { evnEquivalentPositions } from 'components/admin/top-equivalent-position/schema/elements';
import { positions } from 'components/admin/job-position/schema/elements';
import {
  categoryRelationTypes,
  levelSocialFunctionGroups,
  UiLibs,
  userMajorStatus,
} from 'configs/constants';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import GroupSearch from 'components/admin/user/schema/elements/group-search';
import GroupSelection from 'components/admin/user/schema/elements/group-selection';
import groupApiUrls from 'components/admin/group/endpoints';
import skill from 'components/admin/group/schema/elements/filterset/filter/skill/skill';
import {
  text,
  textOp,
} from 'components/admin/group/schema/elements/filterset/filter/query/text';
import sex from 'components/admin/group/schema/elements/filterset/filter/sex/sex';
import age from 'components/admin/group/schema/elements/filterset/filter/age/age';
import experience from 'components/admin/group/schema/elements/filterset/filter/experience/experience';
import code from 'components/admin/group/schema/elements/filterset/filter/schema/code';
import codes from 'components/admin/group/schema/elements/filterset/filter/schema/codes';
import name from 'components/admin/group/schema/elements/filterset/filter/schema/name';
import lname from 'components/admin/group/schema/elements/filterset/filter/schema/lname';
import external from 'components/admin/group/schema/elements/filterset/filter/schema/external';
import deliveryDate from 'components/admin/group/schema/elements/filterset/filter/schema/deliveryDate';
import dateOfIssue from 'components/admin/group/schema/elements/filterset/filter/schema/dateOfIssue';
import creditSyllabuses from 'components/admin/group/schema/elements/filterset/filter/schema/creditSyllabuses';
import iid from 'components/admin/group/schema/elements/filterset/filter/schema/iid';
import mail from 'components/admin/group/schema/elements/filterset/filter/schema/mail';
import statuses from 'components/admin/group/schema/elements/filterset/filter/schema/statuses';
import subject from 'components/admin/group/schema/elements/filterset/filter/schema/subject';
import graduatingSeniorStatuses from 'components/admin/group/schema/elements/filterset/filter/schema/graduatingSeniorStatuses';
import getMemberBelongedOthersGroup from 'components/admin/group/schema/elements/filterset/filter/schema/getMemberBelongedOthersGroup';
import contractBox from 'components/admin/group/schema/elements/filterset/filter/schema/contractBox';
import totalCreditBox from 'components/admin/group/schema/elements/filterset/filter/schema/totalCreditBox';
import averageScoreBox from 'components/admin/group/schema/elements/filterset/filter/schema/averageScoreBox';
import availableFilters from 'components/admin/group/schema/elements/filterset/filter/schema/availableFilters';
import getAvailableFilters, {
  editGroupFiltersFormId,
} from 'components/admin/group/schema/elements/filterset/utils';
import { gradeElement, groupElement } from 'common/utils/form';
import DatePicker from 'schema-form/elements/date-picker';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';
import { required, validationWithCondition } from 'common/validators';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';

const displayFieldsMajorBox = [
  'faculty',
  'major',
  'training_mode',
  'training_level',
  'ico',
  'status',
];

const getDefaultEnableFiltersKey = (isStaff, groupType) => {
  let defaultEnableFiltersKey = isStaff
    ? 'domainInfo.conf.default_enabled_staff_filters'
    : 'domainInfo.conf.default_enabled_target_group_filters';

  if (groupType === categoryRelationTypes.FINISHING_SENIOR) {
    defaultEnableFiltersKey =
      'domainInfo.conf.default_enabled_finishing_senior_filters';
  } else if (groupType === categoryRelationTypes.GRADUATING_SENIOR) {
    defaultEnableFiltersKey =
      'domainInfo.conf.default_enabled_graduating_senior_filters';
  }

  return defaultEnableFiltersKey;
};

const getAllowedEnableFiltersKey = (isStaff, groupType) => {
  let allowedEnableFiltersKey = isStaff
    ? 'domainInfo.conf.allowed_staff_filters'
    : 'domainInfo.conf.allowed_target_group_filters';

  if (groupType === categoryRelationTypes.FINISHING_SENIOR) {
    allowedEnableFiltersKey =
      'domainInfo.conf.allowed_finishing_senior_filters';
  } else if (groupType === categoryRelationTypes.GRADUATING_SENIOR) {
    allowedEnableFiltersKey =
      'domainInfo.conf.allowed_graduating_senior_filters';
  }

  return allowedEnableFiltersKey;
};

const getUserMajorStatusesToFilter = (type, searchingToAdd = false) => {
  if (!searchingToAdd) {
    return [];
  }
  switch (type) {
    case categoryRelationTypes.ADMISSION: {
      return [
        userMajorStatus.APPLIED,
        userMajorStatus.QUALIFIED,
        userMajorStatus.STUDYING,
      ];
    }
    case categoryRelationTypes.STUDENT_RECOGNITION: {
      return [userMajorStatus.QUALIFIED, userMajorStatus.STUDYING];
    }
    case categoryRelationTypes.EXPULSION_GROUP: {
      return [
        userMajorStatus.STUDYING,
        userMajorStatus.ON_LEAVE,
        userMajorStatus.SUSPENSION,
        userMajorStatus.EXPULSION,
      ];
    }
    default: {
      return [];
    }
  }
};

export function getDefaultByAllowedFilters(
  defaultEnabledFilters = [],
  allowedEnableFilters = [],
) {
  let index;
  const newDefaultEnabledFilters = [];

  if (Array.isArray(defaultEnabledFilters)) {
    for (let i = 0; i < defaultEnabledFilters.length; i++) {
      index = allowedEnableFilters.indexOf(defaultEnabledFilters[i]);
      if (index > -1) {
        newDefaultEnabledFilters.push(defaultEnabledFilters[i]);
      }
    }
  }

  return newDefaultEnabledFilters;
}
const getElementsSchema = (forRecap = false, props) => (
  formid,
  values,
  localStep,
  xpath,
  domainInfo,
) => {
  const defaultEnableFiltersKey = getDefaultEnableFiltersKey(
    values && values.is_staff,
    values && values.type,
  );
  const allowedEnableFiltersKey = getAllowedEnableFiltersKey(
    values && values.is_staff,
    values && values.type,
  );
  let defaultEnabledFilters = get(store.getState(), defaultEnableFiltersKey);
  let allowedEnabledFilters = get(store.getState(), allowedEnableFiltersKey);

  const options = {};
  const schoolType = get(store.getState(), 'domainInfo.school.type');
  let group = null;
  if (schoolType === 'sis') {
    group = props.group;

    const hasFoundMajorBox = defaultEnabledFilters.find(
      (element) => element === 'major_box',
    );
    if (!hasFoundMajorBox) {
      defaultEnabledFilters.push('major_box');
    }

    if (formid === 'group_member_search_members') {
      options.notValidate = true;
    } else if (group) {
      if (
        group.type !== categoryRelationTypes.SCHOLARSHIP_CATEGORY &&
        group.level !== levelSocialFunctionGroups.SEMESTER &&
        ![
          categoryRelationTypes.FINISHING_SENIOR,
          categoryRelationTypes.GRADUATING_SENIOR,
        ].includes(group.type)
      ) {
        options.notValidate = true;
      }
    } else {
      options.notValidate = true;
    }
  }

  options.displayFields = displayFieldsMajorBox;

  options.userMajorStatus = getUserMajorStatusesToFilter(
    group && group.type,
    props.searchingToAdd,
  );

  if (
    [
      categoryRelationTypes.ADMISSION,
      categoryRelationTypes.FINISHING_SENIOR,
      categoryRelationTypes.GRADUATING_SENIOR,
    ].includes(group && group.type)
  ) {
    options.notValidate = false;
    options.forSearch = false;
  }

  const majorBox = {
    type: 'section',
    schema: getMajorBoxSchema(options),
  };

  const userOrganizations = get(
    values,
    xpath ? `${xpath}.user_organizations` : 'user_organizations',
  );

  if (values && values.add_member_to_group_form) {
    const removedFiltersFromAddMemberForm = [
      'sign_number',
      'decision_number',
      'delivery_date',
      'date_of_issue',
      'graduating_senior_status',
    ];
    defaultEnabledFilters =
      defaultEnabledFilters &&
      defaultEnabledFilters.filter(
        (availableFilter) =>
          removedFiltersFromAddMemberForm.indexOf(availableFilter) === -1,
      );
  } else {
    const removedFiltersFromSearchMemberForm = [
      'finishing_senior_groups',
      'get_member_belonged_others_group',
    ];
    defaultEnabledFilters =
      defaultEnabledFilters &&
      defaultEnabledFilters.filter(
        (availableFilter) =>
          removedFiltersFromSearchMemberForm.indexOf(availableFilter) === -1,
      );
  }

  defaultEnabledFilters = getDefaultByAllowedFilters(
    defaultEnabledFilters,
    allowedEnabledFilters,
  );

  let elementsSchema = {
    availableFilters: availableFilters(
      defaultEnabledFilters,
      formid === editGroupFiltersFormId,
      values && values.is_staff,
      group && group.type,
      values && values.add_member_to_group_form,
      'display-none',
    ),
    positions: positions(formid, {}, userOrganizations, {
      notRequiredOrganization: 1,
    }),
    equivalent_positions: equivalentPositions(formid, userOrganizations),
    evn_equivalent_positions: evnEquivalentPositions(formid, userOrganizations),
    user_organizations: organizations({
      formid,
      label: `${t1('content_organizations')}`,
      defaultValue: props.orgIids,
      fullWidth: true,
      validate: [
        validationWithCondition(required(), values.requireOrganization),
      ],
      organizationRootIids: values.organizationRootIids,
      includeRootOrganizations: values.includeRootOrganizations,
      getOnlyOrganizationWhereUserHasPermission:
        values.getOnlyOrganizationWhereUserHasPermission,
      defaultOrganizations:
        Array.isArray(props.orgIids) && props.orgIids.length > 0
          ? props.orgIids
          : undefined,
      includeSubOrganizations: 0,
      includeSubOrganizationsLabel: t1('include_users_in_sub_organizations'),
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf, {
      defaultValue: props.includeSubOrg,
    }),
    skill,
    // text: text(),
    textOp: textOp(),
    sex: sex(),
    age: age(),
    experience: experience(),
    code: code(),
    codes: codes(),
    lname: lname(),
    external: external(),
    name: name(),
    iid: iid(),
    mail: mail(),
    major_box: majorBox,
    contract_box: contractBox,
    get_member_belonged_others_group: getMemberBelongedOthersGroup(),
    statuses: statuses(),
    credit_syllabuses: creditSyllabuses(formid),
    finishing_senior_groups: {
      type: InputAutoComplete,
      nameElement: 'finishing_senior_groups',
      name: 'finishing_senior_groups',
      componentElementSearch: GroupSearch,
      componentElementEditor: GroupSelection,
      baseUrl: groupApiUrls.group_search,
      params: {
        type: [categoryRelationTypes.FINISHING_SENIOR],
      },
      dataSourceConfig: {
        text: 'key',
        value: 'data',
        transformData: 'name',
      },
      fullWidth: true,
      floatingLabelText: t1('finishing_senior_groups'),
      hintText: t1('finishing_senior_groups'),
    },
    total_credit_box: totalCreditBox,
    average_score_box: averageScoreBox,
    sign_number: text(t1('sign_number')),
    decision_number: text(t1('decision_number')),
    delivery_date: deliveryDate(),
    date_of_issue: dateOfIssue(),
    graduating_senior_status: graduatingSeniorStatuses(),
    subject,
    school__grade: gradeElement(domainInfo, true, t1('grade')), // for search
    school__group: groupElement(values, 'school__grade'),
    number_of_warnings: {
      type: 'number',
      min: 0,
      step: 1,
      floatingLabelText: t1('number_of_warnings'),
      classWrapper: 'col-md-6 m-t-10',
      fullWidth: true,
    },
    time_to_start: {
      type: DatePicker,
      uiLib: UiLibs.ANT,
      classWrapper: 'col-md-6',
      floatingLabelText: t1('date_user_join_learning'),
      fullWidth: true,
      getEndDate: true,
      maxDate: new Date(),
      autoOk: true,
    },
  };
  if (forRecap) {
    return addPropsToEverySchemaElements(elementsSchema, {
      elementDisplayMode: elementDisplayModes.RECAP,
    });
  }
  return elementsSchema;
};

const ui = (step, values, themeConfig, xpath, formid) => {
  const availFilters = getAvailableFilters(values, xpath);
  const allowedEnableFiltersKey = getAllowedEnableFiltersKey(
    values && values.is_staff,
    values && values.type,
  );
  //Hack display all field
  let allowedEnabledFilters = (
    get(store.getState(), allowedEnableFiltersKey) || []
  ).filter((f) => f !== 'text');
  allowedEnabledFilters.splice(
    allowedEnabledFilters.indexOf('user_organizations') + 1,
    0,
    'include_sub_organizations',
  );
  let fields = availFilters ? ['textOp', ...allowedEnabledFilters] : ['textOp'];
  // let fields;

  let fieldsDefault = [];
  if (
    get(values, 'type') === categoryRelationTypes.EXPULSION_GROUP ||
    get(values, 'group_type') === categoryRelationTypes.EXPULSION_GROUP
  ) {
    fieldsDefault = ['number_of_warnings', 'time_to_start'];
  }

  return [
    // TODO: should we switch if it's ums or enterprise here
    // or get the list from configurations, of which fields are searchable by each school
    {
      id: 'filters', // you still have to have this id even for freestyle
      fields,
    },
    {
      id: 'others',
      fields: ['availableFilters'],
    },
  ];
};

const getSchema = (forRecap = false, props = {}) => ({
  schema: getElementsSchema(forRecap, props),
  ui,
  layout: forRecap
    ? {
        freestyle: 1,
        component: MinimalSearchRecapFreeStyleLayout,
      }
    : commonFormLayouts.DEFAULT,
});

export const searchFormSchema = (props = {}) => getSchema(false, props);
export const searchRecapFormSchema = (props = {}) => getSchema(true, props);

export default getSchema();
