import React from 'react';
import SearchLayout from 'components/admin/group/search';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import topMenuSchema from 'components/admin/group/menu/MainstageTopMenu';

function OrgGroup(props) {
  const { node } = props;
  return [
    <SubTopMenuContext
      lastBreadcrumbName={node.name}
      isSmallSize
      schema={topMenuSchema(node.iid)}
    />,
    <SearchLayout
      hiddenFields={{
        organizations: [node.iid],
        type: [],
      }}
      showList
      hideAdvanceSearchSchema
    />,
  ];
}

export default OrgGroup;
