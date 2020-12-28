import React from 'react';
import ExportBtnWithConfirmDialog from 'components/common/action-button/ExportBtnWithConfirmDialog';
import temisApiUrls from 'components/temis/endpoints';
import { t1 } from 'translate';

const LayoutFreeStyle = ({
  formValues,
  groups: {
    default: { fieldNames },
  },
  submitButton,
  formid,
}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">{fieldNames.organizations}</div>
      </div>
      <div className="row">
        <div className="col-md-12">{fieldNames.include_sub_organizations}</div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center m-t-20">
          {submitButton}
          <ExportBtnWithConfirmDialog
            url={temisApiUrls.export_organization_learning_report}
            formValues={formValues}
            formid={formid}
            label={t1('export')}
            raisedButton
            primary
          />
        </div>
      </div>
    </div>
  );
};

export default LayoutFreeStyle;
