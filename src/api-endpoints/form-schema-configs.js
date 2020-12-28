const getFormSchemaConfigs = (fieldName, formid) => {
  let ret;
  switch (fieldName) {
    case 'syllabus':
    case 'foo_type':
      // if (fieldName === 'syllabus' || fieldName === 'foo_type'/* TODO && formid === 'foo_' */) {
      ret = '/site/api/get-data-schema?ntype=course';
      break;
    case 'syllabus_iid':
      ret = '/site/api/get-data-schema?ntype=course&type=syllabus';
      break;
    case 'credit_syllabus':
      ret = '/site/api/get-data-schema?ntype=course&type=credit';
      break;
    case 'venue':
      ret = '/venue/api/get-venue';
      break;
    case 'get_venue_by_parent':
      ret = '/venue/api/get-venue-by-parent';
      break;
    case 'all_venue':
      ret = '/venue/api/get-all-venue';
      break;
    case 'timetable':
      ret = '/timetable/api/get-timetable';
      break;
    case 'teaching_hours_major':
      ret = '/category/api/get-data-child-level';
      break;
    case 'faculty': // TODO: refactor this
      ret = '/category/api/get-data-child-level?type=faculty';
      break;
    case 'exam_round':
      ret = '/exam-round/api/get-exam-rounds-by-contest-code';
      break;
    case 'upcoming_exam_round':
      ret = '/exam-round/api/get-upcoming-exam-rounds-by-contest-code';
      break;
    case 'current_exam_round':
      ret = '/exam-round/api/get-exam-rounds-by-contest-code';
      break;
    case 'shift_exam':
      ret = '/exam-shift/schema-form/get-exam-shifts-for-select-box';
      break;
    case 'contest_code':
      if (formid && formid.indexOf('update_contest') !== -1) {
        ret = '/contest/api/get-current-contests';
      } else {
        ret = '/contest/schema-form/get-all-contests';
      }
      break;
    case 'contest':
      ret = '/contest/schema-form/get-all-contests';
      break;
    case 'exam_method':
      ret = '/exam-round/api/get-all-exam-methods';
      break;
    case 'school__grade':
      ret = '/site/api/get-all-grades';
      break;
    case 'grade_school':
      ret = '/page/api/get-grade-school';
      break;
    case 'status':
      if (formid === 'new_page' || formid.indexOf('edit_page') !== -1) {
        ret = '/page/api/get-page-statuses';
      } else if (
        formid === 'new_path' ||
        formid === 'path_new' ||
        formid === 'edit_path' ||
        formid === 'path_search' ||
        formid === 'program_search'
      ) {
        ret = '/path/api/get-path-statuses';
      } else if (
        formid === 'skill_relation_search' ||
        formid === 'edit_skill_relation'
      ) {
        ret = '/skill/api/get-relation-statuses';
      } else {
        ret = '/user/api/get-user-statuses';
      }

      break;
    case 'training_level':
      ret = '/path/api/get-training-levels';
      break;
    case 'training_mode':
      ret = '/path/api/get-training-modes';
      break;
    case 'birthday':
      ret = '/conf/api/get-limitation-of-birth-select-box';
      break;
    case 'zone':
      ret = '/pds/api/get-zone-list';
      break;
    case 'sub_type': // TODO: refactor
      if (
        formid === 'new_province_district' ||
        formid === 'edit_province_district' ||
        formid === 'province_district_search'
      ) {
        ret = '/pds/api/get-province-district-sub-type';
      } else {
        ret = '/page/api/get-blog-sub-types';
      }

      break;
    case 'pid':
      if (
        formid === 'new_province_district' ||
        formid === 'edit_province_district'
      ) {
        ret = '/pds/api/get-all-provinces';
      }
      if (formid === 'new_blog' || formid === 'edit_blog') {
        ret = '/category/schema-form/get-category-tree';
      } else if (
        formid === 'new_organization' ||
        formid === 'edit_organization'
      ) {
        ret = '/category/schema-form/get-category-tree';
      } else if (formid === 'new_major' || formid === 'edit_major') {
        ret = '/category/schema-form/get-category-tree';
      } else if (formid === 'edit_group') {
        ret = '/category/schema-form/get-category-tree-v2';
      } else if (formid === 'new_asset_category') {
        ret = '/asset/api/get-category-tree';
      }
      break;
    case 'allowed_languages': {
      ret = '/school/api/get-allowed-languages';
      break;
    }
    case 'usable_languages': {
      ret = '/school/api/get-usable-languages';
      break;
    }
    case 'category':
      if (formid === 'new_page' || formid === 'edit_page') {
        ret = '/page/api/get-category-list';
      } else {
        ret = '/category/schema-form/get-category-tree';
      }

      break;
    case 'year':
      ret = '/contest/schema-form/get-contest-years';
      break;
    case 'skills':
      ret = 'skill/api/get-skills-auto-complete';
      break;
    case 'skill':
      ret = 'skill/api/get-approved-skills';
      break;
    case 'from':
      ret = 'skill/api/get-skills-auto-complete';
      break;
    case 'to':
      ret = 'skill/api/get-skills-auto-complete';
      break;
    case 'estimated_effort_type':
      ret = 'skill/api/get-relation-effort-types';
      break;
    case 'g':
      ret = 'role/api/get-all-roles-under-domain';
      break;
    case 'roles':
      if (formid.indexOf('roles_menu') !== -1) {
        ret = 'api/v2/site/roles-menu';
      } else {
        ret = 'role/api/get-all-roles-under-domain';
      }

      break;
    case 'role':
      ret = '/role/api/get-staff-roles';
      break;
    case 'user_level':
      ret = '/user/api/get-levels';
      break;
    case 'course':
      if (formid === 'user_learn_search') {
        ret = '/course/api/get-all-approved-courses?is_without_course_exam=1';
      } else {
        ret = '/course/api/get-all-approved-courses';
      }
      break;
    case 'target_item__iid':
      ret = '/fee/api/get-target-items-by-fee-template-type';
      break;
    case 'class':
      ret = '/course/api/get-all-approved-courses?is_class=true';
      break;
    case 'staff_id':
      ret = '/syllabus/api/get-school-approved-staffs';
      break;
    case 'data':
      if (formid.indexOf('try_to_learn') !== -1) {
        ret = 'course/api/get-trial-packages';
      } else {
        ret = 'path/api/get-unlockable-paths';
      }

      break;
    case 'level':
      ret = 'skill/api/get-skill-levels';
      break;
    case 'act':
      ret = 'transaction/api/get-transaction-act-options';
      break;
    case 'accept_files':
      ret = '/file/get-accept-files';
      break;
    case 'admission_documents':
      ret = '/school/api/get-admission-documents';
      break;
    case 'survey_search':
      ret = '/survey/api/search-surveys-by-item';
      break;
    case 'global_survey':
      ret = '/survey/api/search-global-survey-report';
      break;
    case 'db':
      ret = '/redis/index/get-redis-dbs';
      break;
    case 'key_type':
      ret = '/redis/index/get-redis-key-types';
      break;
    case 'learning_type':
      ret = '/course/api/get-learning-types';
      break;
    case 'ico':
      // if (formid === 'plan_new' || formid === 'plan_edit')
      ret = '/ico/api/get-all-icos';
      break;
    case 'program':
    case 'new_program':
      // if (formid === 'plan_new' || formid === 'plan_edit')
      ret = '/path/api/get-all-active-programs';
      break;
    case 'font_family':
      ret = '/degree/get-fonts';
      break;
    case 'degree':
      ret = '/degree/get-degree-options-for-select-box';
      break;
    case 'semester':
      ret = '/semester/search?ntype=semester&type=semester';
      break;
    case 'school_year':
      ret = '/semester/search?ntype=semester&type=school_year';
      break;
    case 'credits_of_program':
      ret = '/syllabus/api/get-all-credits-of-program';
      break;
    case 'fee_template':
      ret =
        '/finance-template/api/get-finance-templates-for-options?category=deposit_to_account';
      break;
    case 'major':
      return '/category/schema-form/get-category-tree?type=major&key=iid&get_top_level=0';
    case 'asset_type': {
      ret = '/asset/api/get-asset-type-enable';
      break;
    }
    case 'asset_unit': {
      ret = '/asset/api/get-asset-unit-enable';
      break;
    }
    case 'asset_category': {
      ret = '/asset/api/get-category-tree';
      break;
    }
    case 'passdef': {
      ret = '/passdef/get-passdefs-for-option';
      break;
    }
    case 'zm_iid': {
      ret = '/zm/search';
      break;
    }
    case 'allowed_actions': {
      ret = '/abac-role/api/get-actions-based-on-applied-scope-and-module';
      break;
    }
    case 'abstract_role': {
      ret = '/abac-role/api/get-abstract-roles-options-for-specific-role-type';
      break;
    }
    case 'category_id': {
      ret = '/organization/schema-form/get-all-categories-for-select-options';
      break;
    }
    case 'message_template_actions': {
      ret = '/message-template/api/get-message-template-actions';
      break;
    }
    case 'rubric_of_course_exam': {
      ret = '/api/v2/skill/get-academic-score-list-by-subject';
      break;
    }
    default:
      ret = '/';
      break;
  }
  return ret;
};

export default getFormSchemaConfigs;
