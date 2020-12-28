/**
 * Created by hungvo on 21/04/2017.
 */
import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import PrimaryButton from 'components/common/primary-button';
import Icon from 'components/common/Icon';
import { reqTypes } from 'configs/constants';

const major = [
  {
    component: (
      <Link to={getUrl('user-major/new')}>
        <PrimaryButton
          icon={<Icon icon="plus" />}
          label={t1(`new_${reqTypes.REGISTRATION_MAJOR}`)}
        />
      </Link>
    ),
    id: `new_${reqTypes.REGISTRATION_MAJOR}`,
    floatRight: true,
    icon: 'plus',
  },
];

export default major;
