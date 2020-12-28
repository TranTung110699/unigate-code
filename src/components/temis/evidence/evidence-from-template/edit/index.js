import React from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Form from './Form';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';

const iconStyle = {
  cursor: 'pointer',
};

const Edit = ({ evidence, searchFormId }) => {
  const dialogKey = 'view_assessment_evidence_content';

  const renderPreview = React.useCallback(({ showFull }) => {
    return <Icon style={iconStyle} icon="edit" onClick={showFull} />;
  }, []);

  const renderFull = React.useCallback(
    () => {
      return (
        <Form
          evidence={evidence}
          dialogKey={dialogKey}
          searchFormId={searchFormId}
        />
      );
    },
    [evidence, searchFormId],
  );

  return (
    <DetailOnDialog
      renderPreview={renderPreview}
      renderFull={renderFull}
      dialogKey={dialogKey}
      dialogOptionsProperties={{
        title: t1('edit_assessment_evidence'),
      }}
    />
  );
};

export default Edit;
