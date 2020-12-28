import lodashGet from 'lodash.get';
import { YesNo } from 'configs/constants';

export const getConfFromDomainInfo = (domainInfo) =>
  lodashGet(domainInfo, 'conf');
/*
 * contains all the config/settings of the school
 */

export const getSurveyNumberAnswerDisplayingScale = (conf) =>
  conf && conf.survey_number_answer_displaying_scale;

export const getSurveyNumberQuestionRange = (conf) =>
  conf && conf.survey_number_question_range;

export const checkIfUseV1FileManagerFromConf = (conf) =>
  conf && conf.use_v1_file_manager;

export const checkIfEnableExamTemplate = (enableExamTemplate) =>
  enableExamTemplate === 1 || enableExamTemplate === true;

/**
 * Whether or not school has departments/organizations.
 * @param domainInfo Object from store
 * @returns {boolean}
 */
export const hasOrganization = (domainInfo) => {
  return lodashGet(domainInfo, 'conf.organizations_enabled');
};

export const allowSyncUsersOnAbnormalAccountScreen = (domainInfo) => {
  return lodashGet(
    domainInfo,
    'conf.allow_sync_users_on_abnormal_account_screen',
  );
};

export const hasTemplateOfCreditSyllabusCode = (domainInfo) => {
  return lodashGet(domainInfo, 'conf.template_of_credit_syllabus_code');
};

export const checkWanDomainIsEnabled = (domainInfo) => {
  return (
    lodashGet(domainInfo, 'conf.wan_domain_enabled') &&
    lodashGet(domainInfo, 'conf.wan_domain_enabled') === YesNo.YES
  );
};

export const checkPreloadDataModeIsEnabled = (domainInfo) => {
  return lodashGet(domainInfo, 'conf.enabled_preload_data_mode');
};

// export const checkAddGroupsToExerciseInExamTemplateIsEnabled = (domainInfo) => {
//   return lodashGet(
//     domainInfo,
//     'conf.enabled_add_groups_to_exercise_in_exam_template',
//   );
// };

export const hasTemplateOfCourseCode = (domainInfo) => {
  return lodashGet(domainInfo, 'conf.template_of_course_code');
};

export const hasAcademicCategories = (domainInfo) => {
  return lodashGet(domainInfo, 'conf.academic_categories_enabled');
};

// for now, we use this logic to simplify the config process:
//    IF THE TRAINING PLAN MENU IS ENABLED -> TRAINING PLAN MODULE IS ENABLED
//
// TODO: refactor if necessary
export const hasTrainingPlan = (domainInfo) => {
  return (lodashGet(domainInfo, 'school.admin_menu_nav') || []).includes(
    'training_plan',
  );
};

export const enrolmentPlanHasLocation = (domainInfo) => {
  return !checkIfAllCreditSyllabusesAreOnlineOnlyGivenDomainInfo(domainInfo);
};

export const getEnrolmentPlanDefaultSettingsGivenDomainInfo = (domainInfo) => {
  return getEnrolmentPlanDefaultSettingsGivenConf(
    getConfFromDomainInfo(domainInfo),
  );
};

export const getEnrolmentPlanDefaultSettingsGivenConf = (conf) => {
  const defaultValue = {
    need_to_invite_all_members_to_all_credit_syllabuses: 1,
    when_user_leave_enrolment_plan: {
      remove_from_courses: 1,
    },
    when_stopped: {
      remove_users_from_courses: 1,
    },
  };

  return lodashGet(conf, 'enrolment_plan_default_settings') || defaultValue;
};

export const checkIfAllCreditSyllabusesAreOnlineOnlyGivenConf = (conf) =>
  lodashGet(conf, 'allCreditSyllabusesAreOnlineOnly');

export const checkIfAllCreditSyllabusesAreOnlineOnlyGivenDomainInfo = (
  domainInfo,
) =>
  checkIfAllCreditSyllabusesAreOnlineOnlyGivenConf(
    lodashGet(domainInfo, 'conf'),
  );

export const getDefaultVideoProviderGivenConf = (conf) =>
  lodashGet(conf, 'default_partner_video_provider') || [
    'vimeo',
    'youtube',
    'attachments',
    'drm_vid',
  ];

export const getOrganizationSubTypesToDisplayInTemisProfileFormGivenConf = (
  conf,
) => lodashGet(conf, 'organization_sub_types_to_display_in_temis_profile_form');

/**
 * @see config 'default_specialize_to_teaching_hours_conversion_rate_in_contract' meanings to understand what it is
 *    (you can check in admin config screen)
 *
 * @param conf object from redux store
 * @return float the default conversion rate from specialize hours to teaching hours in contract
 */
export const getDefaultSpecializeToTeachingHoursConversionRateInContractGivenConf = (
  conf,
) =>
  lodashGet(
    conf,
    'default_specialize_to_teaching_hours_conversion_rate_in_contract',
  );

/**
 * @see getDefaultSpecializeToTeachingHoursConversionRateInContractGivenConf for more info
 *  about what this function return
 *
 * @param domainInfo object from redux store
 * @return float the default conversion rate from specialize hours to teaching hours in contract
 */
export const getDefaultSpecializeToTeachingHoursConversionRateInContractGivenDomainInfo = (
  domainInfo,
) =>
  getDefaultSpecializeToTeachingHoursConversionRateInContractGivenConf(
    lodashGet(domainInfo, 'conf'),
  );

export const contentShareable = (domainInfo) => {
  return (
    hasOrganization(domainInfo) &&
    lodashGet(domainInfo, 'conf.content_shareable')
  );
};

export const allCreditSyllabusesAreOnlineOnly = (domainInfo) => {
  return lodashGet(domainInfo, 'conf.allCreditSyllabusesAreOnlineOnly');
};

export const enableScorm = (domainInfo) => {
  return lodashGet(domainInfo, 'conf.enableScorm');
};

export const enableAsset = (domainInfo) => {
  return lodashGet(domainInfo, 'conf.enableAsset');
};

export const creditSyllabusLevels = (domainInfo) => {
  return lodashGet(domainInfo, 'conf.creditSyllabusLevels');
};

export const creditSyllabusHasTopEquivalentPositionCode = (domainInfo) => {
  return lodashGet(
    domainInfo,
    'conf.creditSyllabusHasTopEquivalentPositionCode',
  );
};

export const creditSyllabusHasTags = (domainInfo) => {
  return lodashGet(domainInfo, 'conf.creditSyllabusHasTags');
};

export const getFacebookAppIdFromConf = (themeConfig, conf) => {
  const appName = (themeConfig && themeConfig.layout) || 'pixelz';

  const facebookAppIdConfig = conf && conf['sso:facebook:app_id'];
  const facebookConfigByAppName =
    conf && conf['sso:facebook:config_by_app_name'];
  let facebookAppId =
    (facebookConfigByAppName &&
      facebookConfigByAppName[appName] &&
      facebookConfigByAppName[appName].app_id) ||
    facebookAppIdConfig;
  if (facebookAppId === 'none') {
    facebookAppId = null;
  }

  return facebookAppId;
};

export const enableWorkingMode = (domainInfo) => {
  return lodashGet(domainInfo, 'conf.enable_working_mode');
};

export const supportedBrowsersFromConfig = (conf) => {
  return lodashGet(conf, 'supported_browsers');
};

export const getOrganizationTypesToDisplayInTeachersOfOrganizationReportFromConf = (
  conf,
) =>
  (
    lodashGet(
      conf,
      'organization_types_to_display_in_teachers_of_organization_report',
    ) || []
  ).map((orgType) => Number.parseInt(orgType, 10));

//Check organization is phong ban with sub type
export const organizationIsPhongBan = (domainInfo, subType) => {
  const orgTypes = lodashGet(domainInfo, 'school.org_types');
  return orgTypes.find(
    (orgType) => parseInt(orgType.type) === subType && orgType.is_phongban,
  );
};

export const organizationHasProvince = (domainInfo, subType) => {
  const orgTypes = lodashGet(domainInfo, 'school.org_types');
  return Boolean(
    (orgTypes || []).find(
      (orgType) =>
        parseInt(orgType.type) === parseInt(subType) &&
        (orgType.has_province || orgType.has_province_and_district),
    ),
  );
};

export const organizationHasDistrict = (domainInfo, subType) => {
  const orgTypes = lodashGet(domainInfo, 'school.org_types');
  return Boolean(
    (orgTypes || []).find(
      (orgType) =>
        parseInt(orgType.type) === parseInt(subType) &&
        (orgType.has_district || orgType.has_province_and_district),
    ),
  );
};

export const getForumUrl = (conf) => {
  return lodashGet(conf, 'forum_home_page_url');
};

export const checkLearnerCanDownloadAttachments = (conf) => {
  return lodashGet(conf, 'learners_can_download_attachments');
};

export const getDefaultDepthOfOrganizationTreeToShowGivenConf = (conf) => {
  return lodashGet(conf, 'default_depth_of_organization_tree_to_show');
};
