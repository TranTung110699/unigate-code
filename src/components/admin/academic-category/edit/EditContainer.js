/**
 * Created by hungvo on 21/04/2017.
 */
import React, { Component } from 'react';

import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import Loading from 'components/common/loading';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import ButtonNewStaff from 'components/admin/group/common/new-staff/ButtonNew';

import Dashboard from '../mainstage/dashboard';
import Roles from '../mainstage/roles/Layout';
import Info from '../mainstage/info';
import Staff from '../mainstage/staff/Layout';
import Children from '../mainstage/children/Layout';
import ButtonNewRoles from '../mainstage/roles/new/ButtonNew';
import ButtonNewChildren from '../mainstage/children/new/ButtonNew';
import { getSearchFormId } from '../mainstage/staff/common/utils';
import { menuItems } from './sub-left-menu-configs';

class CategoryEditContainer extends Component {
  getButtonByAction(props) {
    const { action, node } = props;

    if (!node || !node.iid) {
      return <Loading />;
    }

    switch (action) {
      case 'roles': {
        return <ButtonNewRoles node={node} />;
      }
      case 'staff': {
        return (
          <ButtonNewStaff searchFormId={getSearchFormId(node)} node={node} />
        );
      }
      case 'children': {
        return <ButtonNewChildren node={node} />;
      }
      default:
        return <div />;
    }
  }

  getContentByAction(props) {
    const { action, node, ...options } = props;
    const { subAction } = options;
    // if (!node || !node.iid) {
    //   return <Loading />;
    // }

    let contentDisplay = '';
    switch (action) {
      case 'dashboard': {
        contentDisplay = <Dashboard node={node} />;
        break;
      }
      case 'info': {
        contentDisplay = <Info node={node} />;
        break;
      }
      case 'staff': {
        contentDisplay = <Staff node={node} {...options} />;
        break;
      }
      case 'children': {
        contentDisplay = <Children node={node} />;
        break;
      }
      case 'roles': {
        contentDisplay = (
          <Roles node={node} action={subAction && subAction[0]} />
        );
        break;
      }
      default: {
        contentDisplay = <Info node={node} />;
        break;
      }
    }

    return contentDisplay;
  }

  render() {
    const { action, node } = this.props;

    return (
      <div>
        <SubLeftMenuContext node={node} schema={menuItems(node)} />
        <SubTopMenuContext
          lastBreadcrumbName={node.name}
          action={action}
          button={this.getButtonByAction(this.props)}
        />
        {this.getContentByAction(this.props)}
      </div>
    );
  }
}

/*
CategoryEditContainer.propTypes = {
  action: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  itemAncestors: PropTypes.arrayOf(PropTypes.any),
};

CategoryEditContainer.defaultProps = {
  action: '',
  dispatch: () => {},
  itemAncestors: [],
};


function mapStateToProps(state) {
  let action = state.editing.action;
  const subAction = state.editing.subAction;
  const itemAncestors = state.editing.itemAncestors || [];
  const categoryItem = itemAncestors[0];
  action = action || '';
  const nodes = state.tree;
  let category = {};
  if (categoryItem && categoryItem.iid && nodes[categoryItem.iid]) {
    category = nodes[categoryItem.iid];
  }
  return {
    itemAncestors,
    action,
    category,
    subAction,
  };
}
*/

export default withNodeEditContainer(CategoryEditContainer);
