/**
 * Created by hungvo on 21/04/2017.
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import routes from 'routes';
import Loading from 'components/common/loading';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';

import Dashboard from '../mainstage/dashboard';
import Info from '../mainstage/info';
import Children from '../mainstage/children/Layout';
import Rubric from '../mainstage/rubric';
import { menuItems } from './sub-left-menu-configs';

class GoalEditContainer extends Component {
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
      case 'children': {
        contentDisplay = <Children node={node} />;
        break;
      }
      case 'rubric': {
        contentDisplay = <Rubric node={node} />;
        break;
      }
      default: {
        contentDisplay = (
          <Redirect
            to={routes.url(
              'node_edit',
              Object.assign({}, node, {
                ntype: 'goal',
                step: 'info',
              }),
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
      <SubTopMenuContext lastBreadcrumbName={node.name} />,
      <SubLeftMenuContext node={node} schema={menuItems(node)} />,
      this.getContentByAction(this.props),
    ];
  }
}

GoalEditContainer.propTypes = {
  action: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  itemAncestors: PropTypes.arrayOf(PropTypes.any),
};

GoalEditContainer.defaultProps = {
  action: '',
  dispatch: () => {},
  itemAncestors: [],
};

export default withNodeEditContainer(GoalEditContainer);
