/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import { constants, schoolTypes, courseLearningTypes } from 'configs/constants';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { required, validationWithCondition } from 'common/validators';
import { hasAcademicCategories, hasOrganization } from 'common/conf';
import SearchFormDetailFreestyleEnterprise from './SearchFormLayoutFreeStyleEnterprise';
import SearchFormDetailFreestyle from './SearchFormLayoutFreestyle';
import lodashGet from 'lodash.get';
import apiUrls from '../../endpoints';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';

const schema = (forRecap = false, forAdvanceSearch = false, props) => (
  formid,
  values,
  step,
  xpath,
  domainInfo,
) => {
  let statusOptions = constants.StatusOptions();
  let defaultStatuses = ['queued', 'approved'];

  if (Array.isArray(values.exclude_statuses)) {
    statusOptions = statusOptions.filter(
      (opt) => !values.exclude_statuses.includes(lodashGet(opt, 'value')),
    );
    defaultStatuses = defaultStatuses.filter(
      (opt) => !values.exclude_statuses.includes(lodashGet(opt, 'value')),
    );
  }

  let element = {
    status: {
      type: 'multiCheckbox',
      options: statusOptions,
      inline: true,
      defaultValue: defaultStatuses,
      floatingLabelText: t1('status'),
      floatingLabelFixed: false,
    },
    learning_type: {
      type: 'multiCheckbox',
      floatingLabelText: t1('learning_type'),
      errorText: t1('loading_learning_type....'),
      floatingLabelFixed: true,
      options: 'async',
      paramsasync: {
        __url__: apiUrls.get_learning_types,
      },
      defaultValue: [courseLearningTypes.ONLINE, courseLearningTypes.ILT],
      fullWidth: true,
    },
    organizations: organizations({
      formid,
      label: `${t1('organizations')} (*)`,
      defaultValue: props.orgIids,
      fullWidth: true,
      validate: [
        validationWithCondition(required(), values.requireOrganization),
      ],
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf, {
      defaultValue: props.includeSubOrg,
    }),
    academic_categories: academicCategories(formid, {
      label: `${t1('academic_categories')}`,
    }),
    public: {
      type: 'checkbox',
      floatingLabelText: t1('is_public_course'),
      label: t1('is_public_course'),
      inline: true,
      defaultValue: 0,
    },
  };

  if (forAdvanceSearch) {
    if (forRecap) {
      return addPropsToEverySchemaElements(element, {
        elementDisplayMode: elementDisplayModes.RECAP,
      });
    }
  } else {
    element = {
      name: {
        type: 'text',
        floatingLabelText: t1('name'),
        // defaultValue: 'name',
        floatingLabelFixed: false,
        errorText: '',
        fullWidth: true,
      },
      ...element,
    };
  }

  return element;
};

const ui = (forAdvanceSearch = false) => (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  props,
  mode,
  domainInfo,
) => {
  let fields = [];
  if (!forAdvanceSearch) {
    fields.push('name');
  }
  fields.push('public');

  if (!values.isSIS) {
    if (hasOrganization(domainInfo))
      fields.push('organizations', 'include_sub_organizations');

    if (!(values && values.type && values.type === 'syllabus_exam')) {
      if (
        hasAcademicCategories(domainInfo) &&
        !lodashGet(window, 'hideOnFormSearch.academic_categories')
      )
        fields.push('academic_categories');
    }
  }

  const supportedLearningMethods = lodashGet(
    domainInfo,
    'school.supported_learning_methods',
  );

  if (
    supportedLearningMethods &&
    supportedLearningMethods.length > 1 &&
    !lodashGet(window, 'hideOnFormSearch.learning_type')
  ) {
    fields.push('learning_type');
  }

  fields.push('status');

  return [
    {
      id: 'id', // you still have to have this id even for freestyle
      fields,
    },
  ];
};

const layout = (step, values, xpath, props, domainInfo) => {
  if (lodashGet(domainInfo, 'school.type') === schoolTypes.SIS) {
    return {
      component: SearchFormDetailFreestyle,
      freestyle: 1,
    };
  }

  return {
    component: SearchFormDetailFreestyleEnterprise,
    freestyle: 1,
  };
};

const getSchema = (forRecap = false, forAdvance = false, props = {}) => ({
  schema: schema(forRecap, forAdvance, props),
  ui: ui(forAdvance),
  layout: forAdvance
    ? forRecap
      ? {
          freestyle: 1,
          component: MinimalSearchRecapFreeStyleLayout,
        }
      : commonFormLayouts.DEFAULT
    : layout,
});

export const searchFormSchema = (props = {}) => getSchema(false, true, props);
export const searchRecapFormSchema = (props = {}) =>
  getSchema(true, true, props);

export default getSchema();
