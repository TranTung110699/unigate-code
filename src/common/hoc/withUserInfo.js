import React, { Component } from 'react';
import { connect } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import lodashGet from 'lodash.get';

/**
 * Will pass down the following props to component
 *
 *  - `userInfo`
 *
 * @param WrappedComponent
 * @returns {*}
 */
const withUserInfo = (WrappedComponent) => {
  class SchoolConfigsHOC extends Component {
    render() {
      const { globalConfigs, ...others } = this.props;

      return <WrappedComponent {...others} {...globalConfigs} />;
    }
  }

  const mapStateToProps = (state) => {
    return {
      userInfo: lodashGet(state, 'user.info'),
    };
  };

  hoistNonReactStatic(SchoolConfigsHOC, WrappedComponent);

  return connect(mapStateToProps)(SchoolConfigsHOC);
};

export default withUserInfo;
