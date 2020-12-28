/**
 * Created by hungvo on 21/04/2017.
 */
import React from 'react';
import { createSelector } from 'reselect';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import PrimaryButton from 'components/common/primary-button';
import Icon from 'components/common/Icon';

const major = createSelector(
  (state, props) => props,
  (props) => [
    {
      id: 'new-request-type',
      type: 'modal',
      floatRight: true,
      component: (
        <Link to={getUrl('req-type/new')}>
          <PrimaryButton
            icon={<Icon icon="plus" />}
            label={t1('new_request_type')}
          />
        </Link>
      ),
    },
  ],
);

export default major;
