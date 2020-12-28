import React from 'react';
import Import from './import';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import { t1 } from 'translate';

const ImportSurveyTakes = ({ enrolmentPlan }) => {
  return (
    <React.Fragment>
      <div>
        <div className="whitebox m-b-20">
          <h1>{t1('import_survey_results_from_excel_file')}</h1>
          <div>
            {t1(
              'you_can_import_survey_results_from_an_excel_file_with_the_following_steps',
            )}
            <ul>
              <li>
                {t1('select_the_course_you_want_to_import_survey_results')}
              </li>
              <li>{t1('enter_the_number_of_survey_takes_to_import')}</li>
              <li>{t1('download_the_sample_template_excel_file')}</li>
              <li>{t1('edit_the_data')}</li>
              <li>
                {t1(
                  'upload_the_excel_file_by_clicking_the_upload_icon_or_simply_paste_the_url_of_the_excel_file',
                )}
              </li>
              <li>{t1('click_preview')}</li>
              <li>{t1('resolve_errors')}</li>
              <li>{t1('click_import')}</li>
            </ul>
          </div>
        </div>

        <Import enrolmentPlan={enrolmentPlan} />
      </div>
    </React.Fragment>
  );
};

export default withSchoolConfigs(ImportSurveyTakes);
