import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import routes from 'routes';
import Loading from 'components/common/loading';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';

import Dashboard from '../mainstage/dashboard';
import Info from '../mainstage/info';
import Children from '../mainstage/children/Layout';

import { menuItems } from './sub-left-menu-configs';
import childrenTopMenuSchema from '../menu/teacher-menus/fee-category-children';

class FeeCategoryEditContainer extends Component {
  getTopMenuSchemaByAction(props) {
    const { action } = props;

    switch (action) {
      case 'children':
        return childrenTopMenuSchema(null, props);
      default:
        return null;
    }
  }

  getContentByAction(node, action) {
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
      case 'children': {
        contentDisplay = <Children node={node} />;
        break;
      }
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

    return [
      <SubLeftMenuContext node={node} schema={menuItems(node)} />,
      <SubTopMenuContext
        lastBreadcrumbName={node.name}
        action={action}
        schema={this.getTopMenuSchemaByAction(this.props)}
      />,
      this.getContentByAction(node, action),
    ];
  }
}

FeeCategoryEditContainer.propTypes = {
  action: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  itemAncestors: PropTypes.arrayOf(PropTypes.any),
};

FeeCategoryEditContainer.defaultProps = {
  action: '',
  dispatch: () => {},
  itemAncestors: [],
};

function mapStateToProps(state, props) {
  const {
    match: {
      params: { subAction, level3Action },
    },
  } = props;
  const nodes = props.nodes || {};
  const categoryIid = subAction;
  let node = {};
  if (categoryIid && nodes[categoryIid]) {
    node = nodes[categoryIid];
  }

  return {
    node,
    action: level3Action,
  };
}

export default withNodeEditContainer(
  withRouter(connect(mapStateToProps)(FeeCategoryEditContainer)),
);
