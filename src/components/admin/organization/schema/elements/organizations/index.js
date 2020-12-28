import React from 'react';
import fetchData from 'components/common/fetchData';
import organizationApiUrls from 'components/admin/organization/endpoints';
import TreeSelect from 'components/common/tree-select';
import { findInTree, mapTree } from 'common/utils/object';
import Form from 'antd/lib/form';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';
import { getOrgTypes, loadingStatuses } from 'configs/constants';
import { groupByKey } from 'common/utils/Array';
import lodashGet from 'lodash.get';
import { getDefaultDepthOfOrganizationTreeToShowGivenConf } from 'common/conf';
import {
  confSelector,
  userOrganizationsSelector,
  userOrgIidsSelector,
} from 'common/selectors';
import addProps from 'components/common/addProps';
import { elementDisplayModes } from 'schema-form/constants';
import DefaultFormElementRecap from 'components/common/default-form-element-recap';

const getTreeSelectNodeValueFromOrganization = (org) => lodashGet(org, 'iid');
const getTreeSelectNodeTitleFromOrganization = (org) => lodashGet(org, 'name');

const addValueToOrganizationTreeDataForTreeSelect = (organizationTreeData) => {
  if (
    !Array.isArray(organizationTreeData) ||
    organizationTreeData.length === 0
  ) {
    return organizationTreeData;
  }

  return organizationTreeData.map((tree) =>
    mapTree(tree, (org) => {
      return (
        org && {
          ...org,
          title: getTreeSelectNodeTitleFromOrganization(org),
          value: getTreeSelectNodeValueFromOrganization(org),
        }
      );
    }),
  );
};

/**
 * if we have 2 organization types OT1 and OT2
 * and the original tree data look like this:
 *  - A type OT1
 *    |- B type OT1
 *       | - C type OT2
 *    |- D type OT2
 *    |- E type OT1
 *
 *  it will be hard for user to know which is element is OT1 and which is OT2
 *
 *  We will add some fake nodes in the tree so user can navigate easier (please look at the ui if this ascii art is too hard to understand)
 *  - OT1
 *    | -- A
 *          | - OT1
 *          |   | -- B
 *          |   |    | - OT1 (no data)
 *          |   |    |
 *          |   |    | - OT2
 *          |   |        | -- C
 *          |   |
 *          |   | -- E
 *          |
 *          | - OT2
 *              | -- D
 *
 *  - OT2 (no data)
 *
 * @param organizationTreeData
 * @param orgTypes
 * @param parentNodeOfOrganizationTreeData
 *    because this is recursive function,
 *    when working with the lower part of the tree, we need to know that part belong to what node
 * @return {*}
 */
const groupOrganizationTreeDataByOrgType = (
  organizationTreeData,
  orgTypes,
  parentNodeOfOrganizationTreeData = null,
) => {
  orgTypes = (orgTypes || []).filter(Boolean); // just to make sure there are not abnormal elements in orgTypes array

  if (
    // if there are not tree data, we have nothing to filter
    !Array.isArray(organizationTreeData) ||
    organizationTreeData.length === 0 ||
    // if there are only one org type, we don't have to group tree data together
    orgTypes.length <= 1
  ) {
    return organizationTreeData;
  }

  const treeDataBySubType = groupByKey(organizationTreeData, 'sub_type');

  const getTreeDataPartMatchingOrgType = (orgType) => {
    const { value: orgTypeValue } = orgType || {};
    return lodashGet(treeDataBySubType, orgTypeValue);
  };

  const orgTypesThatHasTreeData = orgTypes.filter((type) => {
    return getTreeDataPartMatchingOrgType(type);
  });

  // for each org type there will be a new node in the tree that represent that org type
  // their children will be organizations which have the org type
  let newTreeDataWithNodeToGroupByOrgType = orgTypesThatHasTreeData.map(
    (type) => {
      const treeDataPartMatchingOrgType = getTreeDataPartMatchingOrgType(type);
      const childrenOfTheNodeThatPresentThisOrgType = treeDataPartMatchingOrgType.map(
        (tree) => {
          return {
            ...tree,
            children: groupOrganizationTreeDataByOrgType(
              lodashGet(tree, 'children'),
              orgTypes,
              tree,
            ),
          };
        },
      );

      const { name: orgTypeName, value: orgTypeValue } = type;
      return {
        title: <span style={{ fontSize: 12 }}>{orgTypeName}</span>,
        children: childrenOfTheNodeThatPresentThisOrgType,
        disabled: true,
        value: `${
          parentNodeOfOrganizationTreeData
            ? lodashGet(parentNodeOfOrganizationTreeData, 'value')
            : ''
        }_${orgTypeValue}`, // we just need some unique value because this node is disabled anyway
      };
    },
  );

  // if at the top level, there is only 1 org type, remove the node present that type because it is unnecessary
  if (
    // no parent => at the top
    !parentNodeOfOrganizationTreeData &&
    // have only one org type
    newTreeDataWithNodeToGroupByOrgType.length === 1
  ) {
    newTreeDataWithNodeToGroupByOrgType = lodashGet(
      newTreeDataWithNodeToGroupByOrgType,
      [0, 'children'],
    );
  }

  return newTreeDataWithNodeToGroupByOrgType;
};

const getFullDataOfSelectedOrganizationInTreeData = (
  v,
  organizationTreeData,
) => {
  return (organizationTreeData || []).find((tree) => {
    return findInTree(tree, (org) => {
      return getTreeSelectNodeValueFromOrganization(org) === v;
    });
  });
};

const checkIfSelectedOrganizationInTreeData = (v, organizationTreeData) => {
  return (
    getFullDataOfSelectedOrganizationInTreeData(v, organizationTreeData) !==
    undefined
  );
};

const getFullDataOfSelectedOrganizationThatNotInTreeData = (
  v,
  selectedOrganizationsFullInfoThatNotInTreeData,
) => {
  return (selectedOrganizationsFullInfoThatNotInTreeData || []).find((org) => {
    return getTreeSelectNodeValueFromOrganization(org) === v;
  });
};

const getFullDataOfSelectedOrganization = (
  v,
  organizationTreeData,
  selectedOrganizationsFullInfoThatNotInTreeData,
) => {
  return (
    getFullDataOfSelectedOrganizationInTreeData(v, organizationTreeData) ||
    getFullDataOfSelectedOrganizationThatNotInTreeData(
      v,
      selectedOrganizationsFullInfoThatNotInTreeData,
    )
  );
};

const OrganizationsInDefaultMode = ({
  organizationTreeData,
  label,
  hintText,
  value,
  onChange,
  multiple,
  orgTypesToGet,
  selectedOrganizationsFullInfoThatNotInTreeData,
  onTreeSelectDropdownVisibleChange,
  organizationTreeDataLoadingStatus,
  fullWidth,
}) => {
  const modifiedTreeData = React.useMemo(
    () => {
      return groupOrganizationTreeDataByOrgType(
        addValueToOrganizationTreeDataForTreeSelect(organizationTreeData),
        orgTypesToGet,
      );
    },
    [organizationTreeData, orgTypesToGet],
  );

  const selectedOrganizationsThatInTreeData = React.useMemo(
    () =>
      (value || []).filter((v) => {
        return checkIfSelectedOrganizationInTreeData(v, organizationTreeData);
      }),
    [value, organizationTreeData],
  );

  const selectedOrganizationsThatNotInTreeData = React.useMemo(
    () =>
      (value || []).filter((v) => {
        return !checkIfSelectedOrganizationInTreeData(v, organizationTreeData);
      }),
    [value, organizationTreeData],
  );

  const titlesOfSelectedOrganizationsThatNotInTreeData = React.useMemo(
    () =>
      selectedOrganizationsThatNotInTreeData.map((v) => {
        return getTreeSelectNodeTitleFromOrganization(
          getFullDataOfSelectedOrganizationThatNotInTreeData(
            v,
            selectedOrganizationsFullInfoThatNotInTreeData,
          ),
        );
      }),
    [
      selectedOrganizationsThatNotInTreeData,
      selectedOrganizationsFullInfoThatNotInTreeData,
    ],
  );

  const valueToPassToTreeSelect = React.useMemo(
    () =>
      // normal value that tree select can handle normally
      selectedOrganizationsThatInTreeData.concat(
        // for value that not in tree data, we have to pass a string (the title) so select component can display it, and not some confusing iid
        titlesOfSelectedOrganizationsThatNotInTreeData,
      ),
    [
      selectedOrganizationsThatInTreeData,
      titlesOfSelectedOrganizationsThatNotInTreeData,
    ],
  );

  /**
   * when onChange, we need to convert the value back to the original format (iid)
   * in order to understand this function @see valueToPassToTreeSelect
   */
  const formatValueGetFromTreeSelect = React.useCallback(
    (valueFromTreeSelect) => {
      return (
        valueFromTreeSelect &&
        valueFromTreeSelect.map((v) => {
          // if v is a title
          if (titlesOfSelectedOrganizationsThatNotInTreeData.includes(v)) {
            return getTreeSelectNodeValueFromOrganization(
              selectedOrganizationsFullInfoThatNotInTreeData.find(
                (org) => getTreeSelectNodeTitleFromOrganization(org) === v,
              ),
            );
          }

          // then v it is in treeData;
          return v;
        })
      );
    },
    [
      titlesOfSelectedOrganizationsThatNotInTreeData,
      selectedOrganizationsFullInfoThatNotInTreeData,
    ],
  );

  const handleChange = React.useCallback(
    (valueFromTreeSelect, label, extra) => {
      const newValue = formatValueGetFromTreeSelect(valueFromTreeSelect);
      onChange(newValue, label, extra);
    },
    [formatValueGetFromTreeSelect, onChange],
  );

  return (
    <Form.Item label={label} colon={false}>
      <TreeSelect
        allowClear
        className={fullWidth ? 'w-100' : undefined}
        valueAsArrayEvenWhenNotMultiple
        placeholder={hintText}
        value={valueToPassToTreeSelect}
        onChange={handleChange}
        treeData={modifiedTreeData}
        multiple={multiple}
        onDropdownVisibleChange={onTreeSelectDropdownVisibleChange}
        loading={organizationTreeDataLoadingStatus === loadingStatuses.LOADING}
      />
    </Form.Item>
  );
};

const OrganizationsInRecapMode = ({
  organizationTreeData,
  label,
  value,
  selectedOrganizationsFullInfoThatNotInTreeData,
}) => {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <DefaultFormElementRecap
      label={label}
      content={value
        .map((v) =>
          getTreeSelectNodeTitleFromOrganization(
            getFullDataOfSelectedOrganization(
              v,
              organizationTreeData,
              selectedOrganizationsFullInfoThatNotInTreeData,
            ),
          ),
        )
        .join(', ')}
    />
  );
};

const Organizations = ({
  elementDisplayMode,
  organizationTreeData,
  label,
  hintText,
  value,
  onChange,
  multiple,
  orgTypesToGet,
  selectedOrganizationsFullInfoThatNotInTreeData,
  onTreeSelectDropdownVisibleChange,
  organizationTreeDataLoadingStatus,
  fullWidth,
}) => {
  switch (elementDisplayMode) {
    case elementDisplayModes.RECAP:
      return (
        <OrganizationsInRecapMode
          label={label}
          selectedOrganizationsFullInfoThatNotInTreeData={
            selectedOrganizationsFullInfoThatNotInTreeData
          }
          organizationTreeData={organizationTreeData}
          value={value}
        />
      );
    default:
      return (
        <OrganizationsInDefaultMode
          label={label}
          onChange={onChange}
          value={value}
          hintText={hintText}
          multiple={multiple}
          onTreeSelectDropdownVisibleChange={onTreeSelectDropdownVisibleChange}
          organizationTreeData={organizationTreeData}
          organizationTreeDataLoadingStatus={organizationTreeDataLoadingStatus}
          orgTypesToGet={orgTypesToGet}
          selectedOrganizationsFullInfoThatNotInTreeData={
            selectedOrganizationsFullInfoThatNotInTreeData
          }
          fullWidth={fullWidth}
        />
      );
  }
};

const monitorIfTreeSelectDropdownHaveBeenOpened = (Comp) => {
  const Wrapped = ({ ...organizationsProps }) => {
    const [
      isTreeSelectHaveBeenOpened,
      markIfTreeSelectHaveBeenOpened,
    ] = React.useState(false);

    const handleTreeSelectDropdownVisibleChange = React.useCallback(
      (visible) => {
        if (visible) {
          markIfTreeSelectHaveBeenOpened(true);
        }
      },
      [],
    );

    return (
      <Comp
        {...organizationsProps}
        onTreeSelectDropdownVisibleChange={
          handleTreeSelectDropdownVisibleChange
        }
        isTreeSelectHaveBeenOpened={isTreeSelectHaveBeenOpened}
      />
    );
  };

  return Wrapped;
};

const defaultDepthOfOrganizationTreeToShowSelector = (state) => {
  const conf = confSelector(state);
  return getDefaultDepthOfOrganizationTreeToShowGivenConf(conf);
};

const orgTypesToGetSelector = (state, { shouldGetAllSubTypes, subTypes }) => {
  return shouldGetAllSubTypes
    ? // get all organizations
      getOrgTypes(state, '*')
    : subTypes
    ? (getOrgTypes(state, '*') || []).filter((t) =>
        subTypes.find((s) => s == lodashGet(t, 'value')),
      )
    : // get only has_perm organizations
      // (at the time of writing, we have only has_perm or phongban organizations, if this logic is wrong when you read it, please update)
      getOrgTypes(state, 'has_perm');
};

const getDataFromState = connect(
  createSelector(
    defaultDepthOfOrganizationTreeToShowSelector,
    orgTypesToGetSelector,
    userOrganizationsSelector,
    userOrgIidsSelector,
    (
      defaultDepthOfOrganizationTreeToShow,
      orgTypesToGet,
      userOrganizations,
      userOrgIids,
    ) => ({
      defaultDepthOfOrganizationTreeToShow,
      orgTypesToGet,
      userOrganizations,
      userOrgIids,
    }),
  ),
);

const fetchOrganizationTreeData = fetchData(
  ({
    rootIids,
    includeRoot,
    getOnlyOrganizationWhereUserHasPermission,
    provinceId,
    districtId,
    orgTypesToGet,
    defaultDepthOfOrganizationTreeToShow,
    isTreeSelectHaveBeenOpened,
    userOrgIidsAsRootIids,
    userOrgIids,
  }) => {
    const depth = defaultDepthOfOrganizationTreeToShow || -1;
    const subTypes = Array.isArray(orgTypesToGet)
      ? orgTypesToGet.map((type) => lodashGet(type, 'value'))
      : undefined;

    if (!rootIids && userOrgIidsAsRootIids) {
      rootIids = userOrgIids;
    }

    return {
      fetchCondition: isTreeSelectHaveBeenOpened,
      baseUrl: organizationApiUrls.organization_search,
      params: {
        view: 'tree',
        depth,
        pid: '0',
        includeRoot,
        getOnlyOrganizationWhereUserHasPermission,
        _sand_expand: ['ancestor_iids'],
        sub_type: subTypes,
        ...(rootIids ? { pIids: rootIids } : {}),
        ...(provinceId ? { org_province_id: provinceId } : {}),
        ...(districtId ? { org_district_id: districtId } : {}),
      },
      propKey: 'organizationTreeData',
      loadingStatusPropKey: 'organizationTreeDataLoadingStatus',
      keyState: `organizationTreeData_${depth}_${includeRoot}_${getOnlyOrganizationWhereUserHasPermission}_${subTypes}_${rootIids}_${provinceId}_${districtId}`, // its not like organization structure can change from
    };
  },
);

const fetchSelectedOrganizationData = fetchData(
  ({ value, organizationTreeData, userOrganizations }) => {
    // => for the organizations that we do not have full info in the client, we need to fetch those data from server

    const selectedOrganizationsThatNeedFullInfo = (value || []).filter(
      (v) =>
        v &&
        // not in user organizations array
        !(userOrganizations || []).find(
          (org) => getTreeSelectNodeValueFromOrganization(org) === v,
        ) &&
        // not in tree data
        !checkIfSelectedOrganizationInTreeData(v, organizationTreeData),
    );

    return {
      baseUrl: organizationApiUrls.get_multiple_organizations_info,
      fetchCondition: selectedOrganizationsThatNeedFullInfo.length > 0,
      params: {
        iids: selectedOrganizationsThatNeedFullInfo,
        _sand_expand: ['ancestor_iids'],
      },
      propKey: 'selectedOrganizationsFullInfoThatNeedAnExtraFetchFromServer',
    };
  },
);

const addPropsSelectedOrganizationsFullInfoThatNotInTreeData = addProps(
  ({
    userOrganizations,
    selectedOrganizationsFullInfoThatNeedAnExtraFetchFromServer,
  }) => ({
    selectedOrganizationsFullInfoThatNotInTreeData: []
      // actually, user organizations may be in tree data
      // but at the time of writing, we can live with this, if you cannot, edit this to filter out userOrganizations if they are in tree data
      .concat(userOrganizations)
      .concat(selectedOrganizationsFullInfoThatNeedAnExtraFetchFromServer),
  }),
);

export default makeReduxFormCompatible({})(
  monitorIfTreeSelectDropdownHaveBeenOpened(
    getDataFromState(
      fetchOrganizationTreeData(
        fetchSelectedOrganizationData(
          addPropsSelectedOrganizationsFullInfoThatNotInTreeData(Organizations),
        ),
      ),
    ),
  ),
);
