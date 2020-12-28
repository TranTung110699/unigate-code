import React from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Form from './Form';
import Icon from 'components/common/Icon';

const iconStyle = {
  cursor: 'pointer',
};

const ViewContent = ({ content }) => {
  const dialogKey = 'view_assessment_evidence_content';

  const renderPreview = React.useCallback(({ showFull }) => {
    return <Icon style={iconStyle} icon="view" onClick={showFull} />;
  }, []);

  const renderFull = React.useCallback(
    () => {
      return <Form content={content} readOnly />;
    },
    [content],
  );

  return (
    <DetailOnDialog
      renderPreview={renderPreview}
      renderFull={renderFull}
      dialogKey={dialogKey}
    />
  );
};

export default ViewContent;
