import React, { Component } from 'react';
import { t1 } from 'translate';
import Alert from 'antd/lib/alert';

class ImportAccountsHelp extends Component {
  render() {
    return (
      <Alert
        message={t1('import_users_to_school_from_excel_file')}
        description={
          <>
            {t1(
              'you_can_import_members_from_an_excel_file_with_the_following_steps',
            )}
            <ul>
              <li>{t1('download_the_sample_template_excel_file')}</li>
              <li>{t1('edit_the_list_of_users_in_the_excel_file')}</li>
              <li>
                {t1(
                  'upload_the_excel_file_by_clicking_the_upload_icon_or_simply_paste_the_url_of_the_excel_file',
                )}
              </li>
              <li>{t1('click_preview')}</li>
              <li>
                {t1('resolve_errors_and_missing_fields_and_duplicate_accounts')}
              </li>
              <li>{t1('import_users')}</li>
            </ul>
          </>
        }
        type="info"
        showIcon
        className="m-b-20"
      />
    );
  }
}

export default ImportAccountsHelp;
