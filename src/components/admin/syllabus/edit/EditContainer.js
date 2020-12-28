import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import get from 'lodash.get';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';

import actions from 'actions/creators';
import { getNodeSelector } from 'components/admin/node/utils';

import { formatSiteTitle } from 'common/layout';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';

import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import withLeftMenuCollapsed from 'common/hoc/withLeftMenuCollapsed';
import Mainstage from './Mainstage';
import SyllabusSurvey from './sub-top-menu/SyllabusSurvey';
import Permission from 'components/common/permission/Permission';
import { abacRoleTypes } from 'configs/constants';
import { getThemeConfig } from 'utils/selectors';

import { menuItems, messages } from './sub-menu-left-configs';
import syllabusSubTopMenuSchema from './sub-top-menu';
import { SyllabusActions } from 'configs/constants/permission';

class SyllabusEditContainer extends Component {
  getParamsForCheckPermission = (props) => {
    const { node } = props;
    return {
      actions: SyllabusActions,
      resourceIids: node && [node.iid],
      type: abacRoleTypes.SYLLABUS,
    };
  };

  componentWillReceiveProps(nextProps) {
    const { node, action, itemAncestors = [] } = this.props;

    if (
      typeof nextProps !== 'undefined' &&
      ((nextProps.node && nextProps.node.iid !== node.iid) ||
        (nextProps.node && nextProps.node.name !== node.name) ||
        (nextProps.itemAncestors &&
          nextProps.itemAncestors.length !== itemAncestors.length) ||
        nextProps.action !== action)
    ) {
      const siteTitle = this.getSiteTitle(nextProps);
      const { dispatch } = this.props;

      dispatch(actions.setTopMenuElement({ siteTitle }));
    }
  }

  getSiteTitle = (nextProps) => {
    const props = nextProps || this.props;
    const { node, syllabus } = props;
    let siteTitle;

    if (syllabus) {
      if (syllabus.type === 'credit')
        siteTitle = formatSiteTitle('credit', syllabus.name);
      else if (syllabus.type === 'syllabus_exam')
        siteTitle = formatSiteTitle('syllabus_exam', syllabus.name);
      else siteTitle = formatSiteTitle('syllabus', syllabus.name);
    } else {
      siteTitle = formatSiteTitle(node.ntype, node.name || `# ${syllabus.iid}`);
    }

    return siteTitle;
  };

  getMenuTop = (props) => {
    const { action, permissions, hasPermission, isHashbang, syllabus } = props;

    const hasPermissionManagerCollaborator =
      hasPermission &&
      hasPermission(
        SyllabusActions.SYLLABUS_ACTION_MANAGE_COLLABORATORS,
        syllabus && syllabus.iid,
        permissions,
      );

    switch (action) {
      case 'roles':
      //   return hasPermissionManagerCollaborator
      //     ? SyllabusTopRolesTopMenuSchema(null, props)
      //     : null;
      // case 'staff':
      //   return hasPermissionManagerCollaborator
      //     ? SyllabusStaffTopMenuSchema(null, props)
      //     : null;
      case 'survey':
        return SyllabusSurvey(null, props);
      default:
        return syllabusSubTopMenuSchema(action, syllabus);
    }
  };

  render() {
    /*
     We wanna use NodeEditContainer because maybe sometime in the future
     We wanna edit some other node type, not going through syllabus layout.
     For example, we go straight from bank
     */
    const {
      hasPermission,
      permissions,
      themeConfig,
      isHashbang,
      syllabus,
    } = this.props;
    const siteTitle = this.getSiteTitle();

    const hasPermissionUpdate =
      hasPermission &&
      hasPermission(
        SyllabusActions.SYLLABUS_ACTION_UPDATE,
        syllabus && syllabus.iid,
        permissions,
      );

    return [
      !this.props.noSubMenu && (
        <SubLeftMenuContext
          node={syllabus}
          schema={menuItems(
            syllabus,
            this.props.conf,
            hasPermission,
            permissions,
            themeConfig,
          )}
          messages={messages(syllabus)}
          isSmallMenu
        />
      ),
      !isHashbang && (
        <SubTopMenuContext
          action={this.props.action}
          lastBreadcrumbName={siteTitle}
          schema={this.getMenuTop(this.props)}
          isSmallSize
        />
      ),
      <Mainstage {...this.props} />,
    ];
  }
}

const emptyObject = {};

const mapStateToProps = (state, props) => {
  const { itemAncestors, nodes } = props;

  const syllabusItem = Array.isArray(itemAncestors)
    ? itemAncestors.find((item) => item.ntype == 'syllabus')
    : {};

  const syllabus = get(nodes, syllabusItem && syllabusItem.iid, emptyObject);

  return {
    syllabus,
    conf: get(state, 'domainInfo.conf'),
    themeConfig: getThemeConfig(state),
  };
};

const refreshPermission = (props, nextProps) => {
  return get(props, 'node.iid') !== get(nextProps, 'node.iid');
};

export default connect()(
  withLeftMenuCollapsed(
    withSchoolConfigs(
      withNodeEditContainer(
        connect(mapStateToProps)(
          Permission(SyllabusEditContainer),
          refreshPermission,
        ),
      ),
    ),
  ),
);
