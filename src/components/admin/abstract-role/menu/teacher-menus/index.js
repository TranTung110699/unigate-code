import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import FlatButton from 'components/common/mui/NewButton';
import Icon from 'components/common/Icon';

const menu = () => [
  {
    button: (
      <Link to={getUrl('abstract-role/new')}>
        <FlatButton
          name="submit"
          type="submit"
          icon={<Icon icon="plus" />}
          label={t1('new_abstract_role')}
        />
      </Link>
    ),
    id: 'new_abstract_role',
    type: 'modal',
    floatRight: true,
  },
];

export default menu;
