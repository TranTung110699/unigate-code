import React from 'react';
import { withRouter } from 'react-router';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import NewButton from 'components/common/primary-button';
import ChooseSyllabusTemplate from './ChooseSyllabusTemplate';
import DetailOnDialog from 'components/common/detail-on-dialog';

const ButtonNew = ({ history }) => {
  const dialogKey = 'new_credit_syllabus';

  const optionsProperties = {
    handleClose: true,

    title: t1('new_syllabus'),
    modal: true,
    callbacks: {
      onCloseDialog: () => {
        history && history.push('/admin/credit');
      },
    },
  };

  return (
    <DetailOnDialog
      dialogKey={dialogKey}
      dialogOptionsProperties={optionsProperties}
      renderFull={() => {
        return <ChooseSyllabusTemplate dialogKey={dialogKey} />;
      }}
      renderPreview={({ showFull }) => {
        return (
          <NewButton
            name="submit"
            type="submit"
            icon={<Icon icon="plus" />}
            label={t1('new_syllabus')}
            onClick={showFull}
          />
        );
      }}
    />
  );
};

export default withRouter(ButtonNew);
