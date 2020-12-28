import { required } from 'common/validators';
import { convertBooleanValueToInt, slugifier } from 'common/normalizers';
import {
  enrolmentPlanTypeOptions,
  enrolmentPlanTypes,
} from 'configs/constants/enrolmentPlan';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import { organizations } from 'components/admin/organization/schema/elements';
import { t1 } from 'translate';
import {
  enrolmentPlanHasLocation,
  getEnrolmentPlanDefaultSettingsGivenDomainInfo,
  hasAcademicCategories,
  hasOrganization,
  hasTrainingPlan,
} from 'common/conf';
import settings from './settings';
import lodashGet from 'lodash.get';
import DatePicker from 'schema-form/elements/date-picker';
import DateTimePicker from 'schema-form/elements/date-time-picker';
import Attachments from 'schema-form/elements/attachments';
import RTE from 'schema-form/elements/richtext';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import taphuanSmartEnrolmentPlanDataSchema from './taphuan-smart-enrolment-plan-data';
import { rootRubricElement } from 'components/admin/rubric/schema/elements';

const epDisplayTemplates = [
  {
    value: 'normal',
    primaryText: t1('normal'),
    label: t1('normal'),
  },
  {
    value: 'mindmap',
    primaryText: t1('mind_map'),
    label: t1('mind_map'),
  },
];

const schema = (formid, values, step, xpath, props, domainInfo) => {
  const defaultSettings = getEnrolmentPlanDefaultSettingsGivenDomainInfo(
    domainInfo,
  );

  return {
    enrolment_plan_template_iid: {
      type: 'select',
      floatingLabelText: t1('choose_a_template'),
      options: 'async',
      paramsasync: {
        key: `enrolment_plan_template`,
        __url__: epApiUrls.get_enrolment_plan_template_options,
        transformData: (data) => {
          return (data || []).map((d) => ({
            value: lodashGet(d, 'iid'),
            label: lodashGet(d, 'name'),
          }));
        },
      },
      fullWidth: true,
      validate: [required()],
    },
    type: {
      type: 'radio',
      label: t1('user_group_type'),
      hintText: t1('user_group_type'),
      floatingLabelText: t1('user_group_type'),
      options: enrolmentPlanTypeOptions(),
      defaultValue: enrolmentPlanTypes.MANUAL,
      validate: [required()],
      readOnly: !step.includes('new'),
    },
    code: {
      type: 'text',
      hintText: t1('enrolment_plan_code'),
      floatingLabelText: t1('enrolment_plan_code'),
      validate: [required(t1('code_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      normalize: slugifier,
    },
    name: {
      type: 'text',
      hintText: t1('enrolment_plan_name'),
      floatingLabelText: t1('enrolment_plan_name'),
      validate: [required(t1('name_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    start_date: {
      type: DatePicker,
      floatingLabelText: t1('start_date'),
      fullWidth: true,
      minDate: Math.max(
        values.training_plan_start_date || -Infinity,
        values.stop_inviting_date || -Infinity,
      ),
      maxDate: Math.min(
        values.end_date || values.training_plan_end_date || Infinity,
        values.stop_inviting_date || Infinity,
      ),
      getStartDate: true,
    },
    end_date: {
      type: DatePicker,
      floatingLabelText: t1('end_date'),
      fullWidth: true,
      minDate: Math.max(
        values.start_date || values.training_plan_start_date || -Infinity,
        values.stop_inviting_date || -Infinity,
      ),
      maxDate: Math.min(
        values.training_plan_end_date || Infinity,
        values.stop_inviting_date || Infinity,
      ),
      getEndDate: true,
    },
    stop_inviting_date: {
      type: DateTimePicker,
      floatingLabelText: t1('stop_inviting_date'),
      fullWidth: true,
      minDate: values.start_date,
      maxDate: values.end_date,
    },
    description: {
      type: RTE,
      floatingLabelText: t1('description'),
      fullWidth: true,
    },
    display_template: {
      type: 'radio',
      fullWidth: true,
      inline: true,
      floatingLabelText: t1('display_template'),
      options: epDisplayTemplates,
      defaultValue: 'normal',
    },
    attachments: {
      type: Attachments,
      allowDownload: true,
      label: t1('enrolment_plan_attachments'),
    },
    organizations: organizations({
      formid,
      defaultValue: props.orgIids,
      label: t1('enrolment_plan_organizers', 1),
      validate: [required()],
    }),
    accessible_in_sub_organizations: {
      type: 'checkbox',
      label: t1('accessible_in_sub_organizations'),
    },
    location: {
      type: 'text',
      hintText: t1('training_location'),
      floatingLabelText: t1('training_location'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    settings: {
      type: 'section',
      schema: settings,
      defaultValue: defaultSettings,
    },
    rubric_iid: rootRubricElement('enrolment_plan'),
    pass_score: {
      type: 'number',
      step: 1,
      min: 0,
      max: 100,
      defaultValue: 75,
      floatingLabelText: t1('passing_score_out_of_100'),
      floatingLabelFixed: true,
      fullWidth: true,
    },
    academic_categories: academicCategories(formid, {
      label: t1('academic_categories'),
    }),
    training_plan_iid: {
      type: 'select',
      floatingLabelText: t1('choose_training_plan'),
      floatingLabelFixed: true,
      options: [
        {
          value: '',
          primaryText: t1(
            'this_enrolment_plan_do_not_belong_to_any_training_plan',
          ),
        },
      ].concat(
        (values.trainingPlansForOptions || []).map((traningPlan) => ({
          value: lodashGet(traningPlan, 'iid'),
          primaryText: lodashGet(traningPlan, 'name'),
        })),
      ),
      fullWidth: true,
    },
    update_course_deadline: {
      type: 'checkbox',
      label: t1('update_all_courses_deadlines_as_well'),
      defaultValue: 1,
      normalize: convertBooleanValueToInt,
    },
    taphuan_smart_enrolment_plan_data: {
      type: 'section',
      schema: taphuanSmartEnrolmentPlanDataSchema(
        values.organizations,
        values.enrolment_plan_template_iid,
      ),
    },
  };
};

const shouldDisplayStopInvitingDateField = (step, values) =>
  values.type === enrolmentPlanTypes.SMART_GROUP;

const ui = (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  props,
  mode,
  domainInfo,
) => {
  const hasAcademicCategoriesField = hasAcademicCategories(domainInfo);
  const hasOrganizationField = hasOrganization(domainInfo);
  const hasTrainingPlanField = hasTrainingPlan(domainInfo);
  const hasLocation = enrolmentPlanHasLocation(domainInfo);

  const classificationGroup = {
    id: 'classification',
    title: t1('enrolment_plan_organizers'),
    fields: [
      // ...(hasAcademicCategoriesField ? ['academic_categories'] : []),
      ...(hasOrganizationField
        ? ['organizations', 'accessible_in_sub_organizations']
        : []),
    ],
  };

  const dateAndLocationGroup = {
    id: 'date',
    title: t1('enrolment_plan_date_and_location'),
    fields: [
      ...(hasLocation ? ['location'] : []),
      'start_date',
      'end_date',
      ...(shouldDisplayStopInvitingDateField(step, values)
        ? ['stop_inviting_date']
        : []),
    ],
  };

  const advancedInfoGroup = {
    id: 'info',
    title: t1('advanced_enrolment_plan_information'),
    fields: [
      'description',
      ...(window.enableMindmap ? ['display_template'] : []),
      // 'attachments',
    ],
  };

  const settingsGroup = {
    id: 'settings',
    title: t1('settings'),
    fields: ['settings', 'rubric_iid' /* 'pass_score' */],
  };

  const config = {
    new: [
      {
        id: 'default',
        title: t1('basic_information'),
        fields: [
          'name',
          ...(hasTrainingPlanField ? ['training_plan_iid'] : []),
          'code',
          'type',
        ],
      },
      classificationGroup,
      dateAndLocationGroup,
      advancedInfoGroup,
      settingsGroup,
    ],
    edit_deadline: [
      {
        id: 'default',
        fields: ['start_date', 'end_date', 'update_course_deadline'],
      },
    ],
    edit_info: [
      {
        id: 'default',
        title: t1('basic_information'),
        fields: ['name', 'code', 'type', 'rubric_iid'],
      },
      classificationGroup,
      dateAndLocationGroup,
      advancedInfoGroup,
      settingsGroup,
    ],
    edit_info_when_ep_approved: [
      {
        id: 'default',
        title: t1('basic_information'),
        fields: [
          'name',
          'code',
          'rubric_iid',
          // 'type'
        ],
      },
      classificationGroup,
      dateAndLocationGroup,
      advancedInfoGroup,
    ],
    edit_view_read_only_info: [
      {
        id: 'default',
        // title: t1('basic_information'),
        fields: ['type', 'settings', 'pass_score'],
      },
    ],
    new_from_template: [
      {
        id: 'default',
        fields: [
          'enrolment_plan_template_iid',
          'organizations',
          'start_date',
          'end_date',
        ],
      },
    ],
    new_taphuan_smart_enrolment_plan: [
      {
        id: 'default',
        title: t1('enrolment_plan_info'),
        fields: ['enrolment_plan_template_iid', 'start_date', 'end_date'],
      },
      {
        id: 'members',
        title: t1('select_enrolment_plan_members'),
        fields: ['taphuan_smart_enrolment_plan_data'],
      },
    ],
  };
  return config[step];
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
