import { t1 } from 'translate';
import schema from './elements';

const ui = (step) => {
  switch (step) {
    case 'new': {
      return [
        {
          id: 'new',
          title: t1('register_a_new_school'),
          fields: [
            'type',
            'slug',
            // 'domains',
            // 'saas_domain',
            // 'logo',
            // 'slogan',
            // 'content',
            // 'short_description',
            'language',
            // 'hotline',
          ],
        },
      ];
    }
    case 'edit_domain-seo': {
      return [
        {
          id: 'edit',
          title: t1('domain_and_SEO_information'),
          isBlock: 1,
          fields: [
            'domains',
            'seo',
            // 'theme__site_name',
            // 'theme__website_title',
            // 'theme__website_description',
          ],
        },
      ];
    }
    case 'edit_homepage-slider': {
      return [
        {
          id: 'default',
          fields: ['homepage_slider'],
        },
      ];
    }
    case 'edit_org_types': {
      return [
        {
          id: 'default',
          fields: ['org_types'],
        },
      ];
    }
    case 'edit_approval_flow': {
      return [
        {
          id: 'default',
          fields: ['approval_flow'],
        },
      ];
    }
    case 'edit_course_deadline_reminder_settings': {
      return [
        {
          id: 'default',
          fields: ['course_deadline_reminder_settings'],
        },
      ];
    }
    case 'edit_hrms': {
      return [
        {
          id: 'default',
          fields: ['hrms'],
        },
      ];
    }
    case 'edit_theme': {
      return [
        {
          id: 'edit_theme_configs',
          title: t1('edit_theme_configs'),
          // isBlock: 1,
          fields: [
            'theme__color_palette',
            // 'theme__layout',
            'theme__font',
            // 'theme__school',
            'theme__top_menus_available',
            'student_dashboard_menus',
            'teacher_dashboard_menus',
            'language',
            'usable_languages',
          ],
        },
        {
          id: 'edit_theme_configs2',
          title: t1('logos'),
          // isBlock: 1,
          fields: [
            'theme__logo',
            'theme__mobile_logo',
            'theme__black_logo',
            'theme__footer_logo',
            'theme__favicon',
          ],
        },
      ];
    }
    case 'edit_theme_layout': {
      return [
        {
          id: 'edit_theme_layout',
          title: t1('edit_theme_layout'),
          // isBlock: 1,
          fields: ['theme__layout'],
        },
      ];
    }
    case 'edit_allowed_languages': {
      return [
        {
          id: 'edit_allowed_languages',
          title: t1('edit_allowed_languages'),
          // isBlock: 1,
          fields: ['allowed_languages'],
        },
      ];
    }
    case 'edit_info': {
      return [
        {
          id: 'edit',
          title: t1('school_basic_information'),
          // isBlock: 1,
          fields: [
            'name',
            // 'type',
            // 'slogan',
            'content',
            'short_description',
          ],
        },
        {
          id: 'contact',
          title: t1('school_basic_contact'),
          // isBlock: 1,
          fields: ['hotline', 'school_email'],
        },
        {
          id: 'social',
          title: t1('school_social_websites'),
          // isBlock: 1,
          fields: [
            'social_links__facebook',
            'social_links__youtube',
            'social_links__twitter',
            'social_links__linkedin',
            'social_links__pinterest',
          ],
        },
        {
          id: 'other',
          title: t1('other'),
          // isBlock: 1,
          fields: ['powered_by', 'copyright'],
        },
      ];
    }
    case 'edit_info_ums': {
      return [
        {
          id: 'edit',
          title: t1('school_basic_information'),
          isBlock: 1,
          fields: [
            'name',
            'eng_name',
            'managing_units',
            'tax_identification_number',
            'address',
            'content',
            'short_description',
          ],
        },
        {
          id: 'contact',
          title: t1('school_basic_contact'),
          // isBlock: 1,
          fields: [
            'hotline',
            'school_email',
            'social_links__facebook',
            'social_links__youtube',
            'social_links__twitter',
            'social_links__linkedin',
            'social_links__pinterest',
          ],
        },
      ];
    }
    case 'edit_type': {
      return [
        {
          id: 'edit',
          title: t1('edit_school_type'),
          // isBlock: 1,
          fields: ['type'],
        },
      ];
    }
    case 'edit_domains': {
      return [
        {
          id: 'edit',
          title: t1('edit_domains'),
          // isBlock: 1,
          fields: ['domains'],
        },
      ];
    }
    case 'edit_admin_menu_nav': {
      return [
        {
          id: 'default',
          title: t1('edit_admin_menu_nav'),
          fields: ['admin_menu_nav'],
        },
      ];
    }
    case 'edit_config_menu_nav': {
      return [
        {
          id: 'default',
          title: t1(
            'edit_config_menu_nav(items_configurable_in_school_config)',
          ),
          fields: ['config_menu_nav'],
        },
      ];
    }
    case 'edit_admission_documents': {
      return [
        {
          id: 'default',
          title: t1('edit_admission_documents'),
          fields: ['admission_documents'],
        },
      ];
    }
    case 'edit_modules': {
      return [
        {
          id: 'default',
          title: t1('edit_modules'),
          fields: ['modules'],
        },
      ];
    }
    case 'edit_scos_enable': {
      return [
        {
          id: 'default',
          title: t1('edit_scos_enable'),
          fields: ['scos_enable'],
        },
      ];
    }
    case 'edit_exercise_questions_enable': {
      return [
        {
          id: 'default',
          title: t1('edit_questions_enable_in_exercise'),
          fields: ['exercise_questions_enable'],
        },
      ];
    }
    case 'edit_exam_questions_enable': {
      return [
        {
          id: 'default',
          title: t1('edit_questions_enable_in_exam'),
          fields: ['exam_questions_enable'],
        },
      ];
    }
    case 'edit_survey_questions_enable': {
      return [
        {
          id: 'default',
          title: t1('edit_questions_enable_in_survey'),
          fields: ['survey_questions_enable'],
        },
      ];
    }
    case 'edit_exercises_enable': {
      return [
        {
          id: 'default',
          title: t1('edit_exercises_enable'),
          fields: ['exercises_enable'],
        },
      ];
    }
    case 'edit_videos_enable': {
      return [
        {
          id: 'default',
          title: t1('edit_videos_enable'),
          fields: ['videos_enable'],
        },
      ];
    }
    case 'edit_asset_type_enable': {
      return [
        {
          id: 'default',
          title: t1('edit_asset_type_enable'),
          fields: ['asset_type_enable'],
        },
      ];
    }
    case 'edit_layouts': {
      return [
        {
          id: 'default',
          title: t1('edit_available_layouts'),
          fields: ['layouts'],
        },
      ];
    }
    case 'edit_supported_learning_methods': {
      return [
        {
          id: 'default',
          title: t1('edit_supported_learning_methods'),
          fields: ['supported_learning_methods'],
        },
      ];
    }
    case 'edit_supported_request_types': {
      return [
        {
          id: 'default',
          title: t1('edit_supported_request_types'),
          fields: ['supported_request_types'],
        },
      ];
    }
    case 'edit_supported_learning_items_in_skill': {
      return [
        {
          id: 'default',
          title: t1('edit_supported_learning_items_in_skill'),
          fields: ['supported_learning_items_in_skill'],
        },
      ];
    }
    default: {
      return [];
    }
  }
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
