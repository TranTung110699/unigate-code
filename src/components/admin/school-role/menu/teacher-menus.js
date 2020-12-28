import React from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'components/common/mui/NewButton';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';

const academicCategory = () => [
  {
    id: 'school_roles',
    href: getUrl('school-roles'),
    label: t1('school_roles'),
  },
  {
    button: (
      <Link to={getUrl('school-roles/new')}>
        <FlatButton
          name="submit"
          type="submit"
          icon={<Icon icon="plus" />}
          label={t1('new_role')}
        />
      </Link>
    ),
    id: 'school_roles_new_role',
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default academicCategory;
