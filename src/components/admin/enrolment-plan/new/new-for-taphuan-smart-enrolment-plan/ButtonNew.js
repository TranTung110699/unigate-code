import React from 'react';
import { t1 } from 'translate';
import NewButton from 'components/common/primary-button';
import Icon from 'components/common/Icon';
import { Link } from 'react-router-dom';
import { getUrl } from 'routes/links/common';

const ButtonNewFromTemplate = ({ label }) => {
  return (
    <Link to={getUrl('enrolment-plan/new-taphuan-smart-enrolment-plan')}>
      <NewButton
        icon={<Icon icon="plus" />}
        label={label || t1('create_new_smart_enrolment_plan')}
      />
    </Link>
  );
};

export default ButtonNewFromTemplate;
