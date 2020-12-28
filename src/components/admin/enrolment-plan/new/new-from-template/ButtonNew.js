import React from 'react';
import { t1 } from 'translate';
import NewButton from 'components/common/primary-button';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';
import NewForm from './Form';

const ButtonNewFromTemplate = ({ searchFormId, label }) => {
  const dialogKey = 'new_enrolment_plan_from_template';

  const renderFull = React.useCallback(
    () => (
      <NewForm
        searchFormId={searchFormId}
        dialogKey={dialogKey}
        redirectToEditPage
      />
    ),
    [searchFormId],
  );

  const renderPreview = React.useCallback(
    ({ showFull }) => {
      return (
        <NewButton
          icon={<Icon icon="plus" />}
          label={label || t1('new_enrolment_plan_from_template')}
          onClick={showFull}
        />
      );
    },
    [label],
  );

  return (
    <DetailOnDialog
      renderPreview={renderPreview}
      renderFull={renderFull}
      dialogKey={dialogKey}
      dialogOptionsProperties={{
        title: t1('new_enrolment_plan_from_template'),
        handleClose: true,
        modal: true,
      }}
    />
  );
};

export default ButtonNewFromTemplate;
