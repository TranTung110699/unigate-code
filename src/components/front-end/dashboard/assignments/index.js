import React from 'react';
import GroupAssignments from './group-assignments';
import PersonalAssignments from './personal-assignments';
import HorizontalNav from 'layouts/admin_v2/horizontal-nav/index-v2';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import { t1 } from 'translate';
import { getDashboardUrl } from 'routes/links/common';

const LayoutForSIS = ({}) => {
  return (
    <div>
      <h1>{t1('assignments')}</h1>
      <GroupAssignments />
    </div>
  );
};

const LayoutForEnterprise = ({ mode = 'personal-assignments' }) => {
  const items = [
    {
      id: 'personal-assignments',
      active: mode === 'personal-assignments',
      link: getDashboardUrl('personal-assignments'),
      label: t1('personal_assignments'),
    },
    {
      id: 'group-assignments',
      active: mode === 'group-assignments',
      link: getDashboardUrl('group-assignments'),
      label: t1('group_assignments'),
    },
  ];

  return (
    <div className="">
      <HorizontalNav
        items={items}
        componentClass="white-horizontal-nav m-b-50"
        content={
          <React.Fragment>
            {mode === 'group-assignments' && <GroupAssignments />}
            {mode === 'personal-assignments' && <PersonalAssignments />}
          </React.Fragment>
        }
      />
    </div>
  );
};

const Layout = ({ isSIS, mode }) => {
  if (isSIS) {
    return <LayoutForSIS mode={mode} />;
  }

  return <LayoutForEnterprise mode={mode} />;
};

export default withSchoolConfigs(Layout);
