import React from 'react';
import { t1 } from 'translate';
import Button from 'components/common/primary-button';
import DetailOnDialog from '../../../common/detail-on-dialog';
import Form from './Form';
import apiUrls from '../endpoints';

const dialogKey = 'new_sale_package';

function NewButton() {
  const renderFull = ({}) => (
    <Form
      formid="new_sale_package"
      mode="new"
      dialogKey={dialogKey}
      alternativeApi={apiUrls.newPackage}
    />
  );
  const renderPreview = ({ showFull }) => {
    return (
      <Button icon="plus" onClick={showFull}>
        {t1('new_package')}
      </Button>
    );
  };
  return (
    <DetailOnDialog
      renderPreview={renderPreview}
      renderFull={renderFull}
      dialogKey={dialogKey}
    />
  );
}

export default NewButton;
