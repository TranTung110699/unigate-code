import React from 'react';
import { t1 } from 'translate/index';
import DetailOnDialog from 'components/common/detail-on-dialog/index';
import Overview from './Overview';
import IconHelp from 'components/common/Icon/Help';

const dialogOptionsProperties = {
  width: '80%',
  handleClose: true,
};

const RubricOverview = ({ iid }) => {
  if (!iid) return null;
  const renderCreate = ({ closeDialog }) => <Overview iid={iid} />;

  return (
    <>
      <DetailOnDialog
        renderPreview={({ showFull }) => (
          <span
            className="cursor-pointer"
            onClick={showFull}
            title={t1('click_to_view_rubric_details')}
          >
            {t1('passing_rubric')}: {iid} <IconHelp />
          </span>
        )}
        renderFull={renderCreate}
        dialogOptionsProperties={dialogOptionsProperties}
      />
    </>
  );
};

export default RubricOverview;
