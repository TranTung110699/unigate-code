import { t1, t2, t3 } from 'translate';
import {
  languages,
  schoolTypeOptions,
  supportedLearningMethods,
  themeColorPalettesAvailable,
  themeLayoutsAvailable,
} from 'configs/constants';
import { slugifier } from 'common/normalizers';
import { isEmail, isPhoneNumber, required } from 'common/validators';
import getFormSchemaConfigs from 'api-endpoints/form-schema-configs';
import { menuItems as configMenuItems } from 'components/admin/conf/menu-v2/sub-left-menu-configs';
import { requestTypeElement } from 'components/admin/req/schema/elements';
import RTE from 'schema-form/elements/richtext';

import { getMenuNavOptions } from 'utils/Util';
import adminMenu from 'layouts/admin_v2/menu-left/menu-schema/admin';

import seo from './seo';
import homepageBanner from './homepage-slider/banner';
import orgTypes from './org-types';
import approvalFlow from './approval-flow';
import hrmsConfigs from './hrms';
import remindFinishCourseSettings from './remind-finish-course-settings';
import schemaFormUrls from '../endpoints/schema-form-urls';
import InputFile from 'schema-form/elements/input-file';
import InputToken from 'schema-form/elements/input-token';

const hotlineValidators = [isPhoneNumber(t1('phone_number_is_invalid'))];

const getConfigMenuNavOptions = () => {
  if (!configMenuItems) return [];
  const options = [];

  const menuItems = configMenuItems({ domain: 'admin' });
  menuItems.forEach((item) => {
    if (!item) return;
    options.push({ value: item.id, label: `${item.title} - (${item.id})` });
  });

  return options;
};

const schema = (formid, values) => ({
  name: {
    type: 'text',
    hintText: t1('school_name'),
    floatingLabelText: t1('school_name'),
    defaultValue: '',
    fullWidth: true,
    classWrapper: 'col-md-6',
  },
  powered_by: {
    type: 'text',
    hintText: t1('powered_by'),
    floatingLabelText: t1('powered_by'),
    defaultValue: '',
    fullWidth: true,
    classWrapper: 'col-md-12',
  },
  copyright: {
    type: 'text',
    hintText: t1('copyright'),
    floatingLabelText: t1('copyright'),
    defaultValue: '',
    fullWidth: true,
    classWrapper: 'col-md-12',
  },
  eng_name: {
    type: 'text',
    hintText: t1('school_english_name'),
    floatingLabelText: t1('school_english_name'),
    defaultValue: '',
    fullWidth: true,
    classWrapper: 'col-md-6',
  },
  address: {
    type: 'text',
    hintText: t1('address'),
    floatingLabelText: t1('address'),
    defaultValue: '',
    fullWidth: true,
    classWrapper: 'col-md-6',
  },
  tax_identification_number: {
    type: 'text',
    hintText: t1('tax_identification_number'),
    floatingLabelText: t1('tax_identification_number'),
    defaultValue: '',
    fullWidth: true,
    classWrapper: 'col-md-6',
  },
  slug: {
    type: 'text',
    hintText: t1('school_unique_id'),
    floatingLabelText: t1('school_unique_id'),
    defaultValue: '',
    classWrapper: 'col-md-12',
    normalize: slugifier,
    // leftcol: 4,
    // rightcol: 2,
    // suffix: `.${window.APP_SAAS_DOMAIN}`,
    suffix: `<span class='text-muted'>${t1(
      'your_website_will_be_available_at',
    )}:</span> <b>${values.slug || ''}.${window.APP_SAAS_DOMAIN}</b>`,
  },
  domains: {
    type: InputToken,
    hintText: `${t3('ex')}: example.com`,
    floatingLabelText: t2('your_own_domain'),
    fullWidth: true,
    classWrapper: 'col-md-12',
  },
  type: {
    type: 'select',
    hintText: t1('school_type'),
    floatingLabelText: t1('school_type'),
    options: schoolTypeOptions(),
    defaultValue: 'enterprise',
    fullWidth: true,
    classWrapper: 'col-md-12',
  },
  logo: {
    type: InputFile,
    hintText: t1("school's_logo"),
    floatingLabelText: t1('logo'),
    defaultValue: '',
    fullWidth: true,
    classWrapper: 'col-md-12',
  },
  slogan: {
    fullWidth: true,
    type: 'text',
    hintText: t1('slogan'),
    floatingLabelText: t1('slogan'),
    defaultValue: '',
    classWrapper: 'col-md-12',
  },
  content: {
    type: RTE,
    hintText: t1('description'),
    floatingLabelText: t1('description'),
    multiLine: true,
    classWrapper: 'col-md-12',
  },
  short_description: {
    type: 'text',
    multiLine: true,
    hintText: t1('short_description'),
    floatingLabelText: t1('short_description'),
    classWrapper: 'col-md-12',
  },
  language: {
    type: 'select',
    floatingLabelText: t1('default_language'),
    options: values.usable_languages
      ? values.usable_languages.map((language) =>
          languages.find((item) => item.value === language),
        )
      : languages,
    validate: [required(t1('default_language_is required'))],
    classWrapper: 'col-md-12',
  },
  usable_languages: {
    type: 'multiCheckbox',
    floatingLabelText: t1('usable_languages'),
    options: 'async',
    paramsasync: {
      __url__: getFormSchemaConfigs('allowed_languages'),
    },
    container: 'inline',
    vertical: true,
    fullWidth: true,
    classWrapper: 'col-md-12',
  },
  allowed_languages: {
    type: 'multiCheckbox',
    floatingLabelText: t1('allowed_languages'),
    options: languages,
    container: 'inline',
    vertical: true,
    fullWidth: true,
    classWrapper: 'col-md-12',
  },
  theme__layout: {
    type: 'select',
    floatingLabelText: t1('theme_layout'),
    options: themeLayoutsAvailable(),
  },
  theme__font: {
    type: 'array',
    classWrapper: 'col-md-12',
    floatingLabelText: t1('font'),
    schema: {
      schema: () => ({
        language: {
          type: 'select',
          floatingLabelText: t1('language'),
          options: languages,
          defaultValue: 'en',
        },
        font: {
          type: 'select',
          floatingLabelText: t1('font'),
          options: 'async',
          paramsasync: {
            __url__: schemaFormUrls('theme__font'),
          },
          defaultValue: 'default',
        },
      }),
      ui: () => [
        {
          id: 'id',
          fields: ['language', 'font'],
        },
      ],
      // layout: () => {},
    },
  },
  theme__school: {
    classWrapper: 'col-md-12',
    type: 'select',
    floatingLabelText: t1("theme's_school"),
    options: 'async',
    paramsasync: {
      key: `theme_school-of-${values && values.theme__layout}`,
      value: {
        theme_layout: values && values.theme__layout,
      },
      __url__: schemaFormUrls('theme__school'),
    },
  },
  theme__logo: {
    classWrapper: 'col-md-12',
    type: InputFile,
    fileType: 'image',
    preview: 1,
    hintText: t1("school's_logo"),
    floatingLabelText: t1("school's_logo"),
    defaultValue: '',
    fullWidth: true,
  },
  theme__mobile_logo: {
    classWrapper: 'col-md-12',
    type: InputFile,
    fileType: 'image',
    preview: 1,
    hintText: t1("school's_mobile_logo"),
    floatingLabelText: t1("school's_mobile_logo"),
    defaultValue: '',
    fullWidth: true,
  },
  theme__black_logo: {
    classWrapper: 'col-md-12',
    type: InputFile,
    fileType: 'image',
    preview: 1,
    hintText: t1("school's_black_logo"),
    floatingLabelText: t1("school's_black_logo"),
    defaultValue: '',
    fullWidth: true,
  },
  theme__footer_logo: {
    classWrapper: 'col-md-12',
    type: InputFile,
    fileType: 'image',
    preview: 1,
    hintText: t1("school's_footer_logo"),
    floatingLabelText: t1("school's_footer_logo"),
    defaultValue: '',
    fullWidth: true,
  },
  theme__favicon: {
    classWrapper: 'col-md-12',
    type: InputFile,
    fileType: 'image',
    preview: 1,
    maxSize: '20px',
    hintText: t1("school's_favicon"),
    floatingLabelText: t1("school's_favicon"),
    defaultValue: '',
    fullWidth: true,
  },
  seo: {
    classWrapper: 'col-md-12',
    type: 'section',
    schema: seo,
  },
  theme__top_menus_available: {
    classWrapper: 'col-md-12',
    type: 'multiCheckbox',
    floatingLabelText: t1('top_menus_available'),
    errorText: t1('student_top_menus_available'),
    options: 'async',
    paramsasync: {
      __url__: schemaFormUrls('theme__top_menus_available'),
    },
    vertical: true,
    fullWidth: true,
  },
  student_dashboard_menus: {
    classWrapper: 'col-md-12',
    type: 'multiCheckbox',
    floatingLabelText: t1('student_dashboard_menus'),
    errorText: t1('student_dashboard_menu_items'),
    options: 'async',
    paramsasync: {
      __url__: schemaFormUrls('student_dashboard_menus'),
    },
    vertical: true,
    fullWidth: true,
  },
  teacher_dashboard_menus: {
    classWrapper: 'col-md-12',
    type: 'multiCheckbox',
    floatingLabelText: t1('teacher_dashboard_menus'),
    errorText: t1('teacher_dashboard_menu_items'),
    options: 'async',
    paramsasync: {
      __url__: schemaFormUrls('teacher_dashboard_menus'),
    },
    vertical: true,
    fullWidth: true,
  },
  hotline: {
    classWrapper: 'col-md-6',
    type: 'text',
    hintText: t1('hotline'),
    floatingLabelText: t1('hotline'),
    defaultValue: '',
    validate: hotlineValidators,
  },
  admin_menu_nav: {
    classWrapper: 'col-md-12',
    type: 'multiCheckbox',
    checkAll: true,
    iconStyle: { marginTop: 6 },
    floatingLabelText: t1('admin_menu_nav'),
    errorText: t1('loading_admin_menu_nav_list_from_server'),
    options: getMenuNavOptions(adminMenu()),
    //   paramsasync: {
    //   __url__: `/school/api/admin-menu-nav-options?id=${values.id}`,
    // },
    container: 'inline',
    vertical: true,
    fullWidth: true,
  },
  config_menu_nav: {
    classWrapper: 'col-md-12',
    type: 'multiCheckbox',
    checkAll: true,
    floatingLabelText: t1('config_menu_nav'),
    defaultValue: '0',
    // errorText: t1('loading_config_menu_nav_list_from_server'),
    options: getConfigMenuNavOptions(),
    container: 'inline',
    vertical: true,
    fullWidth: true,
  },
  admission_documents: {
    classWrapper: 'col-md-12',
    type: 'multiCheckbox',
    checkAll: true,
    floatingLabelText: t1('admission_documents'),
    defaultValue: '0',
    errorText: t1('loading_admission_documents_from_server'),
    options: 'async',
    container: 'inline',
    vertical: true,
    fullWidth: true,
  },
  modules: {
    classWrapper: 'col-md-12',
    type: 'multiCheckbox',
    checkAll: true,
    floatingLabelText: t1('modules'),
    defaultValue: 0,
    errorText: t1('loading_module_list_from_server'),
    options: 'async',
    paramsasync: {
      __url__: schemaFormUrls('modules'),
    },
    container: 'inline',
    vertical: true,
    fullWidth: true,
  },
  scos_enable: {
    classWrapper: 'col-md-12',
    type: 'multiCheckbox',
    checkAll: true,
    floatingLabelText: t1('scos_enable'),
    defaultValue: 0,
    errorText: t1('loading_scos_enable_list_from_server'),
    options: 'async',
    paramsasync: {
      __url__: schemaFormUrls('scos_enable'),
    },
    container: 'inline',
    vertical: true,
    fullWidth: true,
  },
  exercise_questions_enable: {
    classWrapper: 'col-md-12',
    type: 'multiCheckbox',
    checkAll: true,
    floatingLabelText: t1('questions_enable_in_exercise'),
    defaultValue: 0,
    errorText: t1('loading_questions_enable_list_from_server'),
    options: 'async',
    paramsasync: {
      // valueKey: 'iid',
      __url__: schemaFormUrls('exercise_questions_enable'),
    },
    container: 'inline',
    vertical: true,
    fullWidth: true,
  },
  exam_questions_enable: {
    classWrapper: 'col-md-12',
    type: 'multiCheckbox',
    checkAll: true,
    floatingLabelText: t1('questions_enable_in_exam'),
    defaultValue: 0,
    errorText: t1('loading_questions_enable_list_from_server'),
    options: 'async',
    paramsasync: {
      // valueKey: 'iid',
      __url__: schemaFormUrls('exam_questions_enable'),
    },
    container: 'inline',
    vertical: true,
    fullWidth: true,
  },
  survey_questions_enable: {
    classWrapper: 'col-md-12',
    type: 'multiCheckbox',
    checkAll: true,
    floatingLabelText: t1('questions_enable_in_survey'),
    defaultValue: 0,
    errorText: t1('loading_questions_enable_list_from_server'),
    options: 'async',
    paramsasync: {
      // valueKey: 'iid',
      __url__: schemaFormUrls('survey_questions_enable'),
    },
    container: 'inline',
    vertical: true,
    fullWidth: true,
  },
  asset_type_enable: {
    classWrapper: 'col-md-12',
    type: 'multiCheckbox',
    checkAll: true,
    floatingLabelText: t1('asset_type_enable'),
    defaultValue: 0,
    errorText: t1('loading_asset_type_list_from_server'),
    options: 'async',
    paramsasync: {
      // valueKey: 'iid',
      __url__: schemaFormUrls('asset_type_enable'),
    },
    container: 'inline',
    vertical: true,
    fullWidth: true,
  },
  exercises_enable: {
    classWrapper: 'col-md-12',
    type: 'multiCheckbox',
    checkAll: true,
    floatingLabelText: t1('exercises_enable'),
    defaultValue: 0,
    errorText: t1('loading_exercises_enable_list_from_server'),
    options: 'async',
    paramsasync: {
      // valueKey: 'iid',
      __url__: schemaFormUrls('exercises_enable'),
    },
    container: 'inline',
    vertical: true,
    fullWidth: true,
  },
  videos_enable: {
    classWrapper: 'col-md-12',
    type: 'multiCheckbox',
    checkAll: true,
    floatingLabelText: t1('videos_enable'),
    defaultValue: 0,
    errorText: t1('loading_videos_enable_list_from_server'),
    options: 'async',
    paramsasync: {
      // valueKey: 'iid',
      __url__: schemaFormUrls('videos_enable'),
    },
    container: 'inline',
    vertical: true,
    fullWidth: true,
  },
  layouts: {
    classWrapper: 'col-md-12',
    type: 'multiCheckbox',
    checkAll: true,
    floatingLabelText: t1('available_layouts'),
    errorText: t1('loading_available_layout_list_from_server'),
    options: 'async',
    paramsasync: {
      // valueKey: 'iid',
      __url__: schemaFormUrls('layouts'),
    },
    container: 'inline',
    vertical: true,
    fullWidth: true,
  },
  supported_learning_methods: {
    classWrapper: 'col-md-12',
    type: 'multiCheckbox',
    checkAll: true,
    floatingLabelText: t1('supported_learning_methods'),
    defaultValue: 0,
    options: supportedLearningMethods,
    container: 'inline',
    vertical: true,
    fullWidth: true,
  },
  supported_request_types: requestTypeElement({
    type: 'multiCheckbox',
    classWrapper: 'col-md-12',
    floatingLabelText: t1('supported_request_types'),
    paramsasync: {
      transformData: (data) => {
        if (!Array.isArray(data) || !data.length) {
          return [];
        }
        return data.map((val) => ({
          value: val,
          label: t1(val),
          primaryText: t1(val),
        }));
      },
    },
  }),
  supported_learning_items_in_skill: {
    classWrapper: 'col-md-12',
    type: 'multiCheckbox',
    checkAll: true,
    floatingLabelText: t1('supported_learning_items_in_skill'),
    defaultValue: 0,
    options: 'async',
    paramsasync: {
      __url__: schemaFormUrls('supported_learning_items_in_skill'),
    },
    container: 'inline',
    vertical: true,
    fullWidth: true,
  },
  theme__color_palette: {
    classWrapper: 'col-md-12',
    type: 'select',
    floatingLabelText: t1("theme's_color_palette"),
    options: themeColorPalettesAvailable(),
  },
  social_links__facebook: {
    classWrapper: 'col-md-6',
    type: 'text',
    hintText: t1('facebook'),
    floatingLabelText: t1('facebook'),
    defaultValue: '',
    fullWidth: true,
  },
  social_links__youtube: {
    classWrapper: 'col-md-6',
    type: 'text',
    hintText: t1('youtube'),
    floatingLabelText: t1('youtube'),
    defaultValue: '',
    fullWidth: true,
  },
  social_links__twitter: {
    classWrapper: 'col-md-6',
    type: 'text',
    hintText: t1('twitter'),
    floatingLabelText: t1('twitter'),
    defaultValue: '',
    fullWidth: true,
  },
  social_links__linkedin: {
    classWrapper: 'col-md-6',
    type: 'text',
    hintText: t1('linkedin'),
    floatingLabelText: t1('linkedin'),
    defaultValue: '',
    fullWidth: true,
  },
  social_links__pinterest: {
    classWrapper: 'col-md-6',
    type: 'text',
    hintText: t1('pinterest'),
    floatingLabelText: t1('pinterest'),
    defaultValue: '',
    fullWidth: true,
  },
  managing_units: {
    classWrapper: 'col-md-12',
    type: 'text',
    hintText: t1('managing_units'),
    floatingLabelText: t1('managing_units'),
    defaultValue: '',
    fullWidth: true,
  },
  homepage_slider: {
    classWrapper: 'col-md-12',
    type: 'array',
    schema: homepageBanner,
    floatingLabelText: t1('edit_homepage_slider'),
  },
  org_types: {
    classWrapper: 'col-md-12',
    type: 'array',
    schema: orgTypes,
    floatingLabelText: t1('edit_org_types'),
  },
  course_deadline_reminder_settings: {
    type: 'array',
    schema: remindFinishCourseSettings,
    floatingLabelText: t1('edit_course_deadline_reminder_settings'),
  },
  hrms: {
    classWrapper: 'col-md-12',
    type: 'section',
    schema: hrmsConfigs,
  },
  school_email: {
    classWrapper: 'col-md-6',
    type: 'text',
    hintText: t1('school_email'),
    floatingLabelText: t1('school_email'),
    defaultValue: '',
    validate: [isEmail(t1('this_is_not_a_valid_email'))],
  },
  approval_flow: {
    classWrapper: 'col-md-12',
    type: 'array',
    schema: approvalFlow,
    floatingLabelText: t1('edit_approval_flow'),
  },
});

export default schema;
