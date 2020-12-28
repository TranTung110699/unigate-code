import React from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Form from './Form';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';

const iconStyle = {
  cursor: 'pointer',
};

const New = ({ template, searchFormId }) => {
  const dialogKey = 'view_assessment_evidence_content';

  const renderPreview = React.useCallback(({ showFull }) => {
    return <Icon style={iconStyle} icon="upload" onClick={showFull} />;
  }, []);

  const renderFull = React.useCallback(
    () => {
      return (
        <Form
          template={template}
          dialogKey={dialogKey}
          searchFormId={searchFormId}
        />
      );
    },
    [template, searchFormId],
  );

  return (
    <DetailOnDialog
      renderPreview={renderPreview}
      renderFull={renderFull}
      dialogKey={dialogKey}
      dialogOptionsProperties={{
        title: t1('new_assessment_evidence'),
        handleClose: true,
      }}
    />
  );
};

export default New;
