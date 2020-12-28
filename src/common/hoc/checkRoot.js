import React from 'react';
import { connect } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import lodashGet from 'lodash.get';

const checkRoot = () => (WrappedComponent) => {
  const Display = ({ isRoot, ...others }) => {
    return <WrappedComponent isRoot={isRoot} {...others} />;
  };

  const mapStateToProps = (state) => ({
    isRoot: lodashGet(state, 'domainInfo.isRoot'), // || lodashGet(state, 'user.info.lname') === 'root',
  });

  const CheckRootHOC = connect(mapStateToProps)(Display);

  hoistNonReactStatic(CheckRootHOC, WrappedComponent);

  return CheckRootHOC;
};

export default checkRoot;
