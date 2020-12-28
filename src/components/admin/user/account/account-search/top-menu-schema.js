/**
 * Created by quandv on 12/05/17.
 */
import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1, t2 } from 'translate';
import ButtonNew from '../../new/ButtonNew';
import Icon from 'components/common/Icon';
import PrimaryButton from 'components/common/primary-button';
import { Link } from 'react-router-dom';

const topMenuSchemaForAccountsLayout = ({
  allow_inserting_users_when_compare_data_not_found_in_file_import = [],
} = {}) => {
  if (
    !Array.isArray(
      allow_inserting_users_when_compare_data_not_found_in_file_import,
    ) ||
    !allow_inserting_users_when_compare_data_not_found_in_file_import.length
  ) {
    return [];
  }

  return [
    allow_inserting_users_when_compare_data_not_found_in_file_import.includes(
      'in_system_by_manually',
    ) && {
      component: <ButtonNew searchFormId="account_search" />,
      href: getUrl('users'),
      id: 'new_user',
      type: 'modal',
      label: t2('new_user'),
      floatRight: true,
      icon: 'plus',
    },
    allow_inserting_users_when_compare_data_not_found_in_file_import.includes(
      'in_system_by_importing',
    ) && {
      component: (
        <Link to={getUrl('school/import-students')}>
          <PrimaryButton
            label={t1('import_students')}
            className="m-l-10"
            icon={<Icon icon="import" />}
          />
        </Link>
      ),
      id: 'import_students',
      href: getUrl('school/import-students'),
      label: t1('import_students'),
      floatRight: true,
      primary: true,
      icon: 'import',
    },
  ].filter(Boolean);
};

export default topMenuSchemaForAccountsLayout;
