/**
 * Created by hungvo on 21/04/2017.
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import routes from 'routes';
import Loading from 'components/common/loading';
import Skills from 'components/admin/node/edit/EditSkill';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';

import Dashboard from '../mainstage/dashboard';
import Info from '../mainstage/info';
// import Children from '../mainstage/children/Layout';
import childrenTopMenuSchema from '../menu/teacher-menus/job-position-children';

import { menuItems } from './sub-left-menu-configs';

class JobPositionEditContainer extends Component {
  getTopMenuSchemaByAction(props) {
    const { action } = props;

    switch (action) {
      case 'children':
        return childrenTopMenuSchema(null, props);
      default:
        return null;
    }
  }

  getContentByAction(props) {
    const { action, node } = props;
    if (!node || !node.iid) {
      return <Loading />;
    }

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
      case 'skills': {
        contentDisplay = <Skills node={node} />;
        break;
      }
      // case 'children': {
      //   contentDisplay = <Children node={node} />;
      //   break;
      // }
      default: {
        contentDisplay = (
          <Redirect
            to={routes.url(
              'node_edit',
              Object.assign({}, node, { ntype: 'category', step: 'info' }),
            )}
          />
        );
        break;
      }
    }

    return contentDisplay;
  }

  render() {
    const { node, action } = this.props;

    return (
      <div>
        <SubLeftMenuContext node={node} schema={menuItems(this.props)} />
        <SubTopMenuContext
          lastBreadcrumbName={node.name}
          action={action}
          schema={this.getTopMenuSchemaByAction(this.props)}
        />
        {this.getContentByAction(this.props)}
      </div>
    );
  }
}

JobPositionEditContainer.propTypes = {
  action: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

JobPositionEditContainer.defaultProps = {
  action: '',
  dispatch: () => {},
};
//
// function mapStateToProps(state, props) {
//   const {
//     match: {
//       params: { iid, action },
//     },
//   } = props;
//   const nodes = state.tree;
//
//   return {
//     action,
//     node: (iid && nodes && nodes[iid]) || {},
//     conf: get(state, 'domainInfo.conf'),
//   };
// }

export default withNodeEditContainer(JobPositionEditContainer);
