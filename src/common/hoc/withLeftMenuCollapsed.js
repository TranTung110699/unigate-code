import React, { Component } from 'react';
import { connect } from 'react-redux';
import layoutContextAction from 'actions/layout-context';
import hoistNonReactStatic from 'hoist-non-react-statics';

const withLeftMenuCollapsed = (WrappedComponent) => {
  class LeftMenuCollapsedHOC extends Component {
    componentDidMount() {
      this.setMenu(false);
    }

    componentWillUnmount() {
      this.setMenu(true);
    }

    setMenu = (state) => {
      const { dispatch } = this.props;

      dispatch(layoutContextAction.setStateOfLeftMenu(state));
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  hoistNonReactStatic(LeftMenuCollapsedHOC, WrappedComponent);

  return connect()(LeftMenuCollapsedHOC);
};

export default withLeftMenuCollapsed;
