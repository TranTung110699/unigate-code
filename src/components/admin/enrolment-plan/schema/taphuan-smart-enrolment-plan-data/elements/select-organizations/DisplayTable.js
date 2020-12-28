import React from 'react';
import AntdTable from 'antd/lib/table';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import AntdSelectField from 'schema-form/elements/select/AntdSelectField';
import AntdToggle from 'schema-form/elements/toggle';
import { range, sum } from 'common/utils/Array';

const rowTypes = {
  TOTAL: 'total',
  SELECTED: 'selected',
  ORGANIZATION: 'organization',
};

const SelectOrganizations = ({
  getGroupOfOrganization,
  setGroupOfOrganization,
  isOrganizationSelected,
  setIsOrganizationSelected,
  organizations,
  numberOfNotAssignedUsersByOrganization,
}) => {
  const numberOfOrganizations = (organizations || []).length;

  const getNumberOfNotAssignedUsersInOrganization = (organizationIid) => {
    return lodashGet(numberOfNotAssignedUsersByOrganization, organizationIid);
  };

  const getTotalNumberOfNotAssignedUsersInOrganizations = (
    organizationIids,
  ) => {
    return (
      sum(organizationIids, (orgIid) => {
        return getNumberOfNotAssignedUsersInOrganization(orgIid);
      }) || 0
    );
  };

  const getTotalNumberOfNotAssignedUsersInAllOrganizations = () => {
    return getTotalNumberOfNotAssignedUsersInOrganizations(
      (organizations || []).map((org) => lodashGet(org, 'iid')),
    );
  };

  const getTotalNumberOfNotAssignedUsersInSelectedOrganizations = () => {
    return getTotalNumberOfNotAssignedUsersInOrganizations(
      (organizations || [])
        .map((org) => lodashGet(org, 'iid'))
        .filter((orgIid) => isOrganizationSelected(orgIid)),
    );
  };

  const dataSource = (organizations || [])
    .map((org) => ({
      id: lodashGet(org, 'id'),
      type: rowTypes.ORGANIZATION,
      organization: org,
    }))
    .concat([
      {
        id: 'total',
        type: rowTypes.TOTAL,
      },
      {
        id: 'selected',
        type: rowTypes.SELECTED,
      },
    ]);

  const getOrganizationFromRow = (row) => lodashGet(row, 'organization');

  const columns = [
    {
      title: t1('organization_name'),
      key: 'organization_name',
      render: (row) => {
        const rowType = lodashGet(row, 'type');
        if (rowType === rowTypes.TOTAL) {
          return t1('total');
        }

        if (rowType === rowTypes.SELECTED) {
          return t1('selected');
        }

        return lodashGet(getOrganizationFromRow(row), 'name');
      },
    },
    {
      title: t1('number_of_not_assigned_users'),
      key: 'number_of_not_assigned_users',
      render: (row) => {
        const rowType = lodashGet(row, 'type');
        if (rowType === rowTypes.TOTAL) {
          return getTotalNumberOfNotAssignedUsersInAllOrganizations();
        }

        if (rowType === rowTypes.SELECTED) {
          return getTotalNumberOfNotAssignedUsersInSelectedOrganizations();
        }

        const organizationIid = lodashGet(getOrganizationFromRow(row), 'iid');
        return getNumberOfNotAssignedUsersInOrganization(organizationIid);
      },
    },
    {
      width: '20%',
      title: t1('group'),
      key: 'group',
      render: (row) => {
        const rowType = lodashGet(row, 'type');
        if (rowType !== rowTypes.ORGANIZATION) {
          return null;
        }

        const options = range(1, numberOfOrganizations).map((n) => ({
          value: n,
          label: t1('group_%s', n),
        }));
        const organizationIid = lodashGet(getOrganizationFromRow(row), 'iid');

        return (
          <AntdSelectField
            options={options}
            value={getGroupOfOrganization(organizationIid)}
            onChange={(v) => setGroupOfOrganization(organizationIid, v)}
          />
        );
      },
    },
    {
      width: '10%',
      title: t1('selected'),
      key: 'selected',
      render: (row) => {
        const rowType = lodashGet(row, 'type');
        if (rowType !== rowTypes.ORGANIZATION) {
          return null;
        }

        const organizationIid = lodashGet(getOrganizationFromRow(row), 'iid');

        return (
          <AntdToggle
            toggled={isOrganizationSelected(organizationIid)}
            onChange={(v) => setIsOrganizationSelected(organizationIid, v)}
            label={null}
          />
        );
      },
    },
  ];

  return (
    <AntdTable
      size="middle"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      bordered
      rowKey="id"
    />
  );
};

export default SelectOrganizations;
