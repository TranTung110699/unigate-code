/**
 * Created by hungvo on 21/04/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import get from 'lodash.get';

import actions from 'actions/creators';
import nodeActions from 'actions/node/creators';

import { t, t1 } from 'translate';
import routes from 'routes';
import { getThemeConfig } from 'utils/selectors';
import Loading from 'components/common/loading';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import { getCategoryStructureLevelNameSelector } from 'common/category-structure/selectors';

import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import Dashboard from '../mainstage/dashboard';
import Info from '../mainstage/info';
import Staff from '../mainstage/staff/Layout';
import Students from '../mainstage/students/Layout';
import Children from '../mainstage/children/Layout';
import MajorStudents from '../mainstage/major-students/Layout';
import Majors from '../mainstage/majors/Layout';
import Credits from '../mainstage/credits/Layout';
import Courses from '../mainstage/courses/Layout';
import Roles from '../mainstage/roles/Layout';
import AbstractRoles from '../mainstage/roles/AbstractRoles';
import JobPositions from '../mainstage/job-positions/Layout';
import Group from '../mainstage/group';

import ButtonNew from '../mainstage/children/ButtonNew';
import { menuItems } from './sub-left-menu-configs';
import { taphuanSubTypes } from 'configs/constants';
import SubTopMenuContext from '../../../../common/context/menu/SubMenuTop';
import childrenTopMenuSchema from '../mainstage/children/sub-top-menu';

class OrganizationEditContainer extends Component {
  // getTopMenuSchemaByAction(props) {
  //   const { action } = props;
  //   // console.log({action});
  //   switch (action) {
  //     // case 'children':
  //     //   return childrenTopMenuSchema(props.node, props.location.pathname);
  //     // case 'roles':
  //     //   return rolesTopMenuSchema(null, props);
  //     case 'job-positions':
  //       return jobPositionsTopMenuSchema(null, props);
  //     default:
  //       return null;
  //   }
  // }

  getContentByAction(props) {
    const { action, node, ...options } = props;

    const { subAction } = options;
    if (!node || !node.iid) {
      return <Loading />;
    }

    let contentDisplay = '';
    switch (action) {
      case 'dashboard': {
        contentDisplay = <Dashboard {...props} />;
        break;
      }
      case 'info': {
        contentDisplay = <Info node={node} />;
        break;
      }
      case 'staff': {
        // list of all trainers in the organization
        contentDisplay = <Staff node={node} {...options} />;
        break;
      }
      case 'students':
      case 'accounts': {
        // list of all employees in the org/dept
        contentDisplay = <Students node={node} {...options} action={action} />;
        break;
      }
      case 'children': {
        contentDisplay = <Children {...props} />;
        break;
      }
      case 'major-students': {
        contentDisplay = <MajorStudents node={node} />;
        break;
      }
      case 'majors': {
        contentDisplay = <Majors node={node} />;
        break;
      }
      case 'credits': {
        contentDisplay = <Credits node={node} />;
        break;
      }
      case 'courses': {
        contentDisplay = <Courses node={node} />;
        break;
      }
      case 'roles': {
        contentDisplay = (
          <Roles {...props} action={subAction && subAction[0]} />
        );
        break;
      }
      case 'abstract-roles': {
        contentDisplay = (
          <AbstractRoles {...props} action={subAction && subAction[0]} />
        );
        break;
      }
      case 'job-positions': {
        // list of all job positions in the org/dept
        contentDisplay = <JobPositions {...props} />;
        break;
      }
      case 'group': {
        contentDisplay = <Group {...props} />;
        break;
      }
      default: {
        contentDisplay = (
          <Redirect
            to={routes.url(
              'node_edit',
              Object.assign({}, node, {
                ntype: 'organization',
                step: 'dashboard',
              }),
            )}
          />
        );
        break;
      }
    }

    return contentDisplay;
  }

  // TODO: react-router has a hash-based router.
  // maybe we should use that one.
  showDialog(nextProps) {
    const { action } = nextProps;

    const search = nextProps.search;

    if (action === 'children' && search === '?new') {
      const contentDialog = <ButtonNew {...nextProps} noDialog />;
      const { childrenOrganizationLevelName } = nextProps;

      const optionsProperties = {
        title: t1('new_%s', [t(childrenOrganizationLevelName)]),
        handleClose: true,

        modal: true,
        clearHashOnClose: true,
      };

      nextProps.dispatch(
        nodeActions.handleOpenDialog({ contentDialog, optionsProperties }),
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.node && !isEqual(this.props.node, nextProps.node)) {
      const siteTitle = `${t1('organization')}: ${nextProps.node.name}`;
      const { dispatch } = this.props;
      dispatch(actions.setTopMenuElement({ siteTitle }));

      if (nextProps.search) this.showDialog(nextProps);
    }

    if (nextProps.search && !isEqual(this.props.search, nextProps.search)) {
      this.showDialog(nextProps);
    }
  }

  componentDidMount() {
    if (this.props.search) this.showDialog(this.props);
  }

  render() {
    const { node, action } = this.props;
    return [
      <SubLeftMenuContext node={node} schema={menuItems(this.props)} />,
      this.getContentByAction(this.props),
    ];
  }
}

OrganizationEditContainer.propTypes = {
  action: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  itemAncestors: PropTypes.arrayOf(PropTypes.any),
};

OrganizationEditContainer.defaultProps = {
  action: '',
  dispatch: () => {},
  itemAncestors: [],
};

function mapStateToProps(state, props) {
  let node = props.node || {};

  const level = (node.level || 0) + 1;
  const childrenOrganizationLevelName =
    window.isTaphuan && Object.values(taphuanSubTypes).includes(node.sub_type)
      ? 'Tổ bộ môn'
      : getCategoryStructureLevelNameSelector(state)(node.type, level);

  return {
    childrenOrganizationLevelName,
    conf: get(state, 'domainInfo.conf'),
    themeConfig: getThemeConfig(state),
    search: window.location.search,
  };
}

export default withNodeEditContainer(
  connect(mapStateToProps)(OrganizationEditContainer),
);
