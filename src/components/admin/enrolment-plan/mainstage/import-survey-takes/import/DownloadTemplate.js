/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import IconDownload from 'material-ui/svg-icons/file/cloud-download';
import ApiRequestBtnWithConfirmDialog from 'components/common/action-button/ApiRequestBtnWithConfirmDialog';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import { downloadFileFromUrl } from 'common/utils/File';
import lodashGet from 'lodash.get';

const ImportForm = ({ enrolmentPlanIid, courseIid, numberOfUsers }) => {
  const handleRequestSuccessful = React.useCallback((ret) => {
    const url = lodashGet(ret, 'result.url');
    downloadFileFromUrl({
      downloadUrl: url,
      fileName: `${t1('import_survey_result_template')}.xlsx`,
    });
  }, []);

  return (
    <ApiRequestBtnWithConfirmDialog
      renderComponent={({ onClick }) => {
        return (
          <RaisedButton
            label={t1('download_form_import')}
            onClick={onClick}
            className="m-l-10 m-r-10"
            primary
            disabled={[enrolmentPlanIid, courseIid, numberOfUsers].some(
              (param) => !param, // only enable if all params are there
            )}
            icon={<IconDownload />}
          />
        );
      }}
      url={apiUrls.get_template_import_enrolment_plan_survey_takes}
      params={{
        enrolment_plan_iid: enrolmentPlanIid,
        course_iid: courseIid,
        number_of_users: numberOfUsers,
      }}
      noConfirm
      onRequestSuccessful={handleRequestSuccessful}
    />
  );
};

export default connect()(ImportForm);
