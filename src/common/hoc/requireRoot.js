import React from 'react';
import { t1 } from 'translate';
import hoistNonReactStatic from 'hoist-non-react-statics';
import Warning from 'components/common/Warning';
import checkRoot from 'common/hoc/checkRoot';

const requireRoot = (WrappedComponent) => {
  const Display = ({ isRoot, ...others }) => {
    if (!isRoot)
      return <Warning>{t1('you_must_be_root_to_access_this_page')}</Warning>;

    return <WrappedComponent {...others} />;
  };

  const RequireRootHOC = checkRoot()(Display);

  hoistNonReactStatic(RequireRootHOC, WrappedComponent);

  return RequireRootHOC;
};

export default requireRoot;
