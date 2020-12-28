const schemaFormUrls = (fieldName, formid) => {
  let ret;
  switch (fieldName) {
    case 'scos_enable':
      ret = '/school/api/get-scos-enable';
      break;
    case 'videos_enable':
      ret = '/school/api/get-lectures-enable';
      break;
    case 'exercises_enable':
      ret = '/school/api/get-exercises-enable';
      break;
    case 'exercise_questions_enable':
      ret = '/school/api/get-questions-enable';
      break;
    case 'exam_questions_enable':
      ret = '/school/api/get-exam-questions-enable';
      break;
    case 'survey_questions_enable':
      ret = '/school/api/get-survey-questions-enable';
      break;
    case 'asset_type_enable':
      ret = '/school/api/get-asset-type-enable';
      break;
    case 'layouts':
      ret = '/school/api/get-available-layouts';
      break;
    case 'student_dashboard_menus':
      ret = '/school/api/get-student-dashboard-menus-available';
      break;
    case 'teacher_dashboard_menus':
      ret = '/school/api/get-teacher-dashboard-menus-available';
      break;
    case 'theme__font':
      ret = '/school/api/get-fonts-available';
      break;
    case 'theme__school':
      ret = '/school/api/get-schools-of-theme-by-theme-layout';
      break;
    case 'theme__top_menus_available':
      ret = '/school/api/get-top-menus-available';
      break;
    case 'modules':
      ret = '/school/api/get-modules-enable';
      break;
    case 'supported_learning_items_in_skill':
      ret = '/school/api/get-modules-enable';
      break;
    case 'delivery_methods':
      ret = '/school/api/get-delivery-methods-enable';
      break;

    default:
      console.error(fieldName + ' form field not defined');
      ret = '';
      break;
  }

  return ret;
};

export default schemaFormUrls;
