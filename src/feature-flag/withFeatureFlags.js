import React from 'react';
import { EnabledFeaturesContext } from 'feature-flag/contexts/enabled-features';

const withFeatureFlags = () => (WrappedComponent) => (props) => {
  const enabledFeatures = React.useContext(EnabledFeaturesContext);

  const isFeatureEnabled = React.useCallback(
    (featureName) => {
      return (
        Array.isArray(enabledFeatures) && enabledFeatures.includes(featureName)
      );
    },
    [enabledFeatures],
  );

  return <WrappedComponent {...props} isFeatureEnabled={isFeatureEnabled} />;
};

export default withFeatureFlags;
