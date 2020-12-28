import React from 'react';
import PrimaryButton from 'components/common/primary-button';
import { t1 } from 'translate';
import DetailOnDialog from 'components/common/detail-on-dialog';
import NodeNew from 'components/admin/node/new';
import apiUrls from '../../../endpoints';
import schema from './schema';

function ExportUser({ className = '' }) {
  const handleExportUser = ({ closeDialog }) => {
    return (
      <>
        <NodeNew
          ntype="report"
          schema={schema}
          alternativeApi={apiUrls.exportUserByTime}
          requestSuccessful={closeDialog}
          submitButton={
            <PrimaryButton
              icon="download"
              label={t1('export')}
              primary
              type="submit"
              className="m-t-10"
            />
          }
        />
      </>
    );
  };

  return (
    <DetailOnDialog
      renderPreview={({ showFull }) => (
        <PrimaryButton
          primary
          className={className}
          type="submit"
          icon="download"
          label={t1('export_user_by_date')}
          onClick={showFull}
          fullWidth={false}
        />
      )}
      renderFull={handleExportUser}
    />
  );
}

export default ExportUser;
