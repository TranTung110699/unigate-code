import React from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Form from './Form';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';

const New = ({ searchFormId }) => {
  const dialogKey = 'view_assessment_evidence_content';

  const renderPreview = React.useCallback(({ showFull }) => {
    return (
      <RaisedButton
        onClick={showFull}
        label={t1('add_new_assessment_evidence')}
        className="m-t-10"
      />
    );
  }, []);

  const renderFull = React.useCallback(
    () => {
      return <Form dialogKey={dialogKey} searchFormId={searchFormId} />;
    },
    [searchFormId],
  );

  return (
    <DetailOnDialog
      renderPreview={renderPreview}
      renderFull={renderFull}
      dialogKey={dialogKey}
      dialogOptionsProperties={{
        title: t1('new_assessment_evidence'),
        width: '80%',
        handleClose: true,
      }}
    />
  );
};

export default New;
