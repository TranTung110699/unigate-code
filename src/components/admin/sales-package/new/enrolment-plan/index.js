import React from 'react';
import { t1 } from 'translate';
import NewButton from 'components/common/primary-button';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';
import NewForm from '../../mainstage/enrolment-plan/SearchForm';
import apiUrls from '../../../enrolment-plan/endpoints';

function ButtonNew({ node }) {
  const dialogKey = `add_enrolment_plan_${node.iid}`;

  const renderFull = ({}) => (
    <NewForm
      mode="new"
      dialogKey={dialogKey}
      node={node}
      alternativeApi={apiUrls.enrolment_plan_search}
      formid={dialogKey}
    />
  );

  const renderPreview = ({ showFull }) => {
    return (
      <NewButton
        icon={<Icon icon="plus" />}
        label={t1('add_enrolment_plan')}
        onClick={showFull}
      />
    );
  };

  return (
    <DetailOnDialog
      renderPreview={renderPreview}
      renderFull={renderFull}
      dialogKey={dialogKey}
      dialogOptionsProperties={{
        title: t1('add_enrolment_plan'),
        handleClose: true,
        modal: true,
        width: '80%',
      }}
    />
  );
}

export default ButtonNew;
