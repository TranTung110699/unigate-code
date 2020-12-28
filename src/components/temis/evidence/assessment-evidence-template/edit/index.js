import React from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Form from './Form';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';

const iconStyle = {
  cursor: 'pointer',
};

const Edit = ({ evidenceTemplate, searchFormId }) => {
  const dialogKey = `update_assessment_evidence_template_${lodashGet(
    evidenceTemplate,
    'iid',
  )}`;

  const renderPreview = React.useCallback(({ showFull }) => {
    return <Icon style={iconStyle} icon="edit" onClick={showFull} />;
  }, []);

  const renderFull = React.useCallback(
    () => {
      return (
        <Form
          evidenceTemplate={evidenceTemplate}
          dialogKey={dialogKey}
          searchFormId={searchFormId}
        />
      );
    },
    [evidenceTemplate, searchFormId, dialogKey],
  );

  return (
    <DetailOnDialog
      renderPreview={renderPreview}
      renderFull={renderFull}
      dialogKey={dialogKey}
      dialogOptionsProperties={{
        title: t1('edit_assessment_evidence_template'),
        width: '80%',
      }}
    />
  );
};

export default Edit;
