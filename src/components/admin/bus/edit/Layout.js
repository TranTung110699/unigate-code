/**
 * Created by hungvo on 21/04/2017.
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import { t1 } from 'translate';
import actions from 'actions/creators';
import Loading from 'components/common/loading';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';

import Dashboard from './dashboard';

import { menuItems } from './sub-left-menu-configs';

class BusEditContainer extends Component {
  getTopMenuSchemaByAction(props) {
    const { action } = props;

    return null;
  }

  getContentByAction(props) {
    const { action, node } = props;
    if (!node || !node.iid) {
      return <Loading />;
    }
    // TODO: switch action here or use the router
    const contentDisplay = <Dashboard node={node} />;

    return contentDisplay;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.node && !isEqual(this.props.node, nextProps.node)) {
      const siteTitle = `${t1('survey')}: ${nextProps.node.name}`;
      const { dispatch } = this.props;
      dispatch(actions.setTopMenuElement({ siteTitle }));
    }
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
      this.getContentByAction(this.props),
    ];
  }
}

BusEditContainer.propTypes = {
  action: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

BusEditContainer.defaultProps = {
  action: '',
  dispatch: () => {},
};

function mapStateToProps(state, props) {
  const {
    match: {
      params: { iid, action },
    },
  } = props;
  const nodes = state.tree;

  return {
    action,
    node: (iid && nodes && nodes[iid]) || {},
  };
}

export default withNodeEditContainer(
  connect(mapStateToProps)(BusEditContainer),
);
