import React from 'react';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import { menuItems } from './sub-left-menu-configs';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import Loading from 'components/common/loading';
import Dashboard from '../mainstage/dashboard';
import Status from '../mainstage/status';
import withNodeEditContainer from '../../node/edit/withNodeEditContainer';

function SalePackageEditContainer(props) {
  const getContentByAction = () => {
    const { action, node } = props;
    if (!node || !node.iid) {
      return <Loading />;
    }
    let contentDisplay = '';
    switch (action) {
      case 'status': {
        contentDisplay = <Status node={node} />;
        break;
      }
      default:
        contentDisplay = <Dashboard node={node} />;
    }

    return contentDisplay;
  };
  const { node } = props;

  return [
    <SubLeftMenuContext node={node} schema={menuItems(node)} />,
    <SubTopMenuContext lastBreadcrumbName={node.name} isSmallSize />,
    getContentByAction(),
  ];
}

export default withNodeEditContainer(SalePackageEditContainer);
