import React from 'react';
import { pushToSet, remove } from 'common/utils/Array';

export const EnabledFeaturesContext = React.createContext([]);

export const EnabledFeaturesContextProvider = ({ children }) => {
  const [enableFeatures, setEnabledFeatures] = React.useState(
    window.APP_ENABLED_FEATURES,
  );

  window.hack_enableFeatureFlag = (featureName) => {
    setEnabledFeatures(
      Array.isArray(enableFeatures)
        ? pushToSet(enableFeatures, featureName)
        : [featureName],
    );
  };

  window.hack_disableFeatureFlag = (featureName) => {
    setEnabledFeatures(
      Array.isArray(enableFeatures)
        ? remove(enableFeatures, featureName)
        : enableFeatures,
    );
  };

  return (
    <EnabledFeaturesContext.Provider value={enableFeatures}>
      {children}
    </EnabledFeaturesContext.Provider>
  );
};
