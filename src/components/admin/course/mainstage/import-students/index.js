import React, { Component } from 'react';
import { t1 } from 'translate';
import ImportUsers from 'components/admin/import-users';
import Alert from 'antd/lib/alert';

class ImportStudentsToCourse extends Component {
  render() {
    const { course, subAction } = this.props;

    return (
      <div>
        <Alert
          message={t1('import_users_to_course_from_excel_file')}
          description={
            <ul>
              <li>{t1('download_the_sample_template_excel_file')}</li>
              <li>{t1('edit_the_list_of_users_in_the_excel_file')}</li>
              <li>
                {t1(
                  'upload_the_excel_file_by_clicking_the_upload_icon_or_simply_paste_the_url_of_the_excel_file',
                )}
              </li>
              <li>{t1('click_preview')}</li>
              <li>{t1('review_the_list_of_members_and_then_import')}</li>
            </ul>
          }
          type="info"
          showIcon
          className="m-b-20"
        />

        <ImportUsers
          importId={Array.isArray(subAction) && subAction[0]}
          node={course}
        />
      </div>
    );
  }
}

export default ImportStudentsToCourse;
