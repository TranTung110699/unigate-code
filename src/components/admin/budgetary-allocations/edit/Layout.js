import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import routes from 'routes';
import Loading from 'components/common/loading';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';

import Dashboard from '../mainstage/dashboard';
import Info from '../mainstage/info';
import { menuItems } from './sub-left-menu-configs';

class CostEditContainer extends Component {
  getContentByAction(props) {
    const { action, node, ...options } = props;

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
      default: {
        contentDisplay = (
          <Redirect
            to={routes.url(
              'node_edit',
              Object.assign({}, node, { ntype: 'cost', step: 'info' }),
            )}
          />
        );
        break;
      }
    }

    return contentDisplay;
  }

  render() {
    const { node } = this.props;

    return [
      <SubLeftMenuContext node={node} schema={menuItems(node)} />,
      <SubTopMenuContext lastBreadcrumbName={node.name} />,
      this.getContentByAction(this.props),
    ];
  }
}

CostEditContainer.propTypes = {
  action: PropTypes.string,
  itemAncestors: PropTypes.arrayOf(PropTypes.any),
};

CostEditContainer.defaultProps = {
  action: '',
  itemAncestors: [],
};

export default withNodeEditContainer(CostEditContainer);
