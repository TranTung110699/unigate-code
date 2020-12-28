/**
 * Created by hungvo on 21/04/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { t1 } from 'translate';
import actions from 'actions/creators';
import nodeActions from 'actions/node/creators';
import { formatSiteTitle } from 'common/layout';
import { extractObject } from 'common/utils/Array';

import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';

import Dashboard from 'components/admin/path/mainstage/dashboard';
import Communicate from 'components/admin/course/mainstage/communication/Form';
// import Marking from 'components/admin/course/mainstage/marking/Layout';
import Graduation from 'components/admin/path/mainstage/graduation';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import EditMetadata from 'components/admin/path/metadata';
import EditAvatar from 'components/admin/node/edit/EditAvatar';
import ReportLayout from 'components/admin/report/node/draw-graph/Layout';
import InviteEnrolment from 'components/admin/invite/new/Form';
import SearchReport from 'components/admin/report/dashboard/search';
import ClassGroupUsers from 'components/admin/path/classgroup/users';
import FormNewInvite from 'components/admin/invite/new/FormNewInvite';
import MajorPrograms from 'components/admin/plan/mainstage/major-program/Layout';
import Info from 'components/admin/path/mainstage/info';

import NewForm from '../new/Form';
// import ProgramDashboard from '../program/Dashboard';
import EquivalentPrerequisites from '../mainstage/prerequisites';

import { menuItems } from './sub-left-menu-configs';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

const USER_TARGET = 'user';
const GROUP_TARGET = 'group';

class PathEditContainer extends Component {
  componentWillReceiveProps(nextProps) {
    let { node, action } = this.props;
    if (
      (nextProps && nextProps.node && nextProps.node.iid !== node.iid) ||
      nextProps.action !== action
    ) {
      node = nextProps.node || node;
      const siteTitle = formatSiteTitle(node.type, node.name);

      // const siteTitle = `${t1('program: %s', node.name)}`;
      this.props.dispatch(actions.setTopMenuElement({ siteTitle }));
    }
  }

  inviteSuccessFull = () => {
    const { node, dispatch } = this.props;
    const url = `/admin/${node.ntype}/${node.iid}/invite`;
    window.history.pushState(null, null, url);
    dispatch(nodeActions.setEditingItem({ action: 'invite' }));
  };

  getContentByAction(props) {
    const { action, node } = props;
    let contentDisplay = '';
    switch (action) {
      case 'dashboard': {
        // if (node.type === 'program')
        //   contentDisplay = <ProgramDashboard {...props} />;
        contentDisplay = <Dashboard {...props} />;
        break;
      }
      case 'users':
        if (node.type === 'classgroup') {
          contentDisplay = <ClassGroupUsers node={node} />;
        } else {
          contentDisplay = <SearchReport node={node} target={USER_TARGET} />;
        }
        break;
      case 'groups': {
        const itemAncestors = props.itemAncestors || [];
        const group = itemAncestors[itemAncestors.length - 1];
        const groups =
          group && group.iid && group.ntype === 'group'
            ? group.iid.split('+')
            : [];
        contentDisplay = (
          <SearchReport
            node={node}
            target={groups.length ? USER_TARGET : GROUP_TARGET}
            groups={groups}
          />
        );
        break;
      }
      case 'invite': {
        const value = extractObject(node, [
          'name',
          'iid',
          'id',
          'ntype',
          'major',
          'ico',
          'training_level',
          'training_mode',
          'semester',
        ]);
        value.type = node.type || node.ntype;
        contentDisplay = (
          <InviteEnrolment
            modal={1}
            step="node"
            node={node}
            hiddenFields={{ items: [{ ...value }] }}
            formNewInvite={
              <FormNewInvite
                modal={1}
                path={node}
                hiddenFields={{ learning_items: [{ ...value }] }}
                inviteSuccessFull={this.inviteSuccessFull}
              />
            }
          />
        );
        break;
      }
      // case 'marking': {
      //   contentDisplay = <Marking node={node} />;
      //   break;
      // }
      case 'communication': {
        contentDisplay = <Communicate />;
        break;
      }
      case 'update': {
        contentDisplay = <Info node={node} />;
        break;
      }
      case 'children': {
        // contentDisplay = <EditMetadata fieldEdit="metadata" node={node} />;
        contentDisplay = (
          <EditMetadata node={node} action={action} fieldEdit="metadata" />
        );
        break;
      }
      case 'avatar': {
        contentDisplay = <EditAvatar node={node} />;
        break;
      }
      case 'prerequisites': {
        contentDisplay = <EquivalentPrerequisites node={node} />;
        break;
      }
      case 'majors': {
        contentDisplay = (
          <MajorPrograms paramsSearch={{ program: node && node.iid }} />
        );
        break;
      }
      case 'report': {
        const { itemAncestors } = this.props;
        const itemReport =
          itemAncestors.length > 2
            ? itemAncestors[itemAncestors.length - 1]
            : itemAncestors[0];
        contentDisplay = (
          <ReportLayout
            targetReport={itemAncestors[1]}
            itemReport={itemReport || {}}
            node={node}
          />
        );
        break;
      }
      case 'graduation': {
        contentDisplay = <Graduation node={node} />;
        break;
      }
      case 'financial': {
        const { subAction } = this.props;
        if (subAction.includes('update')) {
          contentDisplay = (
            <NewForm
              node={node}
              mode="edit"
              step={!node.type || node.type === 'path' ? '' : node.type}
              title={t1('update_node')}
            />
          );
        } else if (subAction.includes('children')) {
          contentDisplay = <EditMetadata fieldEdit="metadata" node={node} />;
        } else {
          contentDisplay = (
            <div className="container-fluid">
              <h1>Dashboard</h1>
            </div>
          );
        }
        break;
      }
      default: {
        contentDisplay = <Dashboard {...props} />;
      }
    }
    return contentDisplay;
  }

  render() {
    const contentDisplay = this.getContentByAction(this.props);
    const { node, isFeatureEnabled } = this.props;
    let isSmallProp;
    if (isFeatureEnabled(features.NEW_UI_JULY_2019)) {
      isSmallProp = { isSmallSize: true };
    }

    return (
      <div>
        <SubLeftMenuContext node={node} schema={menuItems(node)} />
        <SubTopMenuContext lastBreadcrumbName={node.name} {...isSmallProp} />
        {contentDisplay}
      </div>
    );
  }
}

PathEditContainer.propTypes = {
  action: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  itemAncestors: PropTypes.arrayOf(PropTypes.any),
};

PathEditContainer.defaultProps = {
  action: '',
  dispatch: () => {},
  itemAncestors: [],
};

/*
const mapStateToProps = createSelector(
  (state) => state.editing.action,
  (state) => state.editing.subAction,
  (state) => state.editing.itemAncestors,
  (state) => state.tree,
  getThemeConfig,
  (actionFromState, subAction, itemAncestorsFromState, nodes, themeConfig) => {
    const itemAncestors = itemAncestorsFromState || [];
    const item = itemAncestors[0];
    const action = actionFromState || '';
    let node = {};
    if (item && item.iid && nodes[item.iid]) {
      node = nodes[item.iid];
    }
    return {
      item,
      itemAncestors,
      action,
      node,
      subAction,
      themeConfig,
    };
  },
);
*/
export default connect()(
  withNodeEditContainer(withFeatureFlags()(PathEditContainer)),
);
