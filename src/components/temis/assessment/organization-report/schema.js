import React from 'react';
import withTemisConfig from 'common/hoc/withTemisConfig';
import { t1 } from 'translate/index';
import {
  isHieuTruong,
  isLeader,
  isReviewApprover,
} from 'components/admin/user/utils';
import { organizations } from 'components/admin/organization/schema/elements/index';
import { required } from 'common/validators/index';
import get from 'lodash.get';

const schema = (formid, values, step, xpath, props, domainInfo) => ({
  organizations: organizations({
    formid,
    multiple: false,
    label: `${t1('organizations')}`,
    defaultValue: props.orgIids,
    validate: required(t1('organization_can_not_empty')),
  }),
});

const ui = () => [
  {
    id: 'default',
    fields: ['organizations'],
  },
];

const LayoutFreeStyle = withTemisConfig(
  ({ groups, submitButton, userRoot }) => (
    <div className={`row ${isHieuTruong(userRoot) ? 'display-none' : ''}`}>
      <div className="col-md-9">
        {get(groups, 'default.fieldNames.organizations')}
      </div>
      <div className="col-md-3 text-center m-t-10">{submitButton}</div>
    </div>
  ),
);

const layout = () => ({
  component: LayoutFreeStyle,
  freestyle: 1,
});

export default {
  schema,
  ui,
  layout,
};
