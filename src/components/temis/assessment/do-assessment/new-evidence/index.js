import React from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Form from './Form';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';

const iconStyle = {
  cursor: 'pointer',
};

const New = ({
  assessmentRubricIid,
  tieuChuanIid,
  tieuChiIid,
  searchFormId,
  onNewEvidence,
}) => {
  const dialogKey = 'view_assessment_evidence_content';

  const renderPreview = React.useCallback(({ showFull }) => {
    return <Icon style={iconStyle} icon="add" onClick={showFull} />;
  }, []);

  const renderFull = React.useCallback(
    () => {
      return (
        <Form
          assessmentRubricIid={assessmentRubricIid}
          tieuChuanIid={tieuChuanIid}
          tieuChiIid={tieuChiIid}
          dialogKey={dialogKey}
          searchFormId={searchFormId}
          onNewEvidence={onNewEvidence}
        />
      );
    },
    [
      onNewEvidence,
      assessmentRubricIid,
      tieuChuanIid,
      tieuChiIid,
      searchFormId,
    ],
  );

  return (
    <DetailOnDialog
      renderPreview={renderPreview}
      renderFull={renderFull}
      dialogKey={dialogKey}
      dialogOptionsProperties={{
        title: t1('new_assessment_evidence'),
        width: '80%',
      }}
    />
  );
};

export default New;
