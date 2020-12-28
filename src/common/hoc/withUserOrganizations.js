import React, { Component } from 'react';
import { connect } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import lodashGet from 'lodash.get';

/**
 * Will pass down the following props to component
 *
 * @param WrappedComponent
 * @returns {*}
 */
const withUserOrganizations = (WrappedComponent) => {
  class SchoolConfigsHOC extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return {
      orgIids: lodashGet(state, 'user.info.user_organizations'),
      // we still get departments for backwards compatibility
      organizations:
        lodashGet(state, 'user.info.organizations') ||
        lodashGet(state, 'user.info.departments'),
    };
  };

  hoistNonReactStatic(SchoolConfigsHOC, WrappedComponent);

  return connect(mapStateToProps)(SchoolConfigsHOC);
};

export default withUserOrganizations;
