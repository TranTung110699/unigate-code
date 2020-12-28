import React from 'react';
import get from 'lodash.get';
import withNodeEditContainer from '../../node/edit/withNodeEditContainer';
import { connect } from 'react-redux';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import { menuItems } from './sub-left-menu-configs';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import Loading from 'components/common/loading';
import Dashboard from '../mainstage/dashboard';
import Info from '../mainstage/info';
import EnrolmentPlans from '../mainstage/enrolment-plan';
import enrolmentPlansTopMenuSchema from './sub-top-menu-configs';
import Buyer from '../mainstage/buyer';

function SalePackageEditContainer(props) {
  const getTopMenuSchemaByAction = () => {
    const { action } = props;
    if (action === 'enrolment-plans') {
      return enrolmentPlansTopMenuSchema(null, props);
    }
  };

  const getContentByAction = () => {
    const { action, node } = props;
    if (!node || !node.iid) {
      return <Loading />;
    }
    let contentDisplay = '';
    switch (action) {
      case 'info': {
        contentDisplay = <Info node={node} />;
        break;
      }
      case 'enrolment-plans': {
        contentDisplay = <EnrolmentPlans node={node} />;
        break;
      }
      case 'buyer': {
        contentDisplay = <Buyer node={node} />;
        break;
      }
      default:
        contentDisplay = <Dashboard node={node} />;
    }

    return contentDisplay;
  };

  const { node, action } = props;

  return [
    <SubLeftMenuContext node={node} schema={menuItems(node)} />,
    <SubTopMenuContext
      lastBreadcrumbName={node.name}
      action={action}
      schema={getTopMenuSchemaByAction()}
      isSmallSize
    />,
    getContentByAction(),
  ];
}

function mapStateToProps(state, props) {
  const {
    match: {
      params: { iid, action, subAction },
    },
    location: { search },
  } = props;
  const nodes = state.tree;

  return {
    action,
    subAction,
    search,
    node: get(nodes, iid, {}),
  };
}

export default withNodeEditContainer(
  connect(mapStateToProps)(SalePackageEditContainer),
);
