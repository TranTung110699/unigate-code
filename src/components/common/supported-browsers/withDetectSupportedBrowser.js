import React from 'react';
import { connect } from 'react-redux';
import { confSelector } from 'common/selectors';
import { createSelector } from 'reselect';
import { supportedBrowsersFromConfig } from 'common/conf';
import { detect } from 'detect-browser';

const detectedBrowser = detect();

const isBrowserNameConditionSatisfied = (browserName, nameCondition) =>
  browserName === nameCondition;

const isOsConditionSatisfied = (os, osCondition) => {
  if (!Array.isArray(osCondition)) {
    return false;
  }

  return osCondition.includes(os);
};

const compareGenericVersionNumber = (value, anotherValue) => {
  if (value === anotherValue) {
    return 0;
  }

  if (value === null) {
    return -1;
  }

  if (anotherValue === null) {
    return -1;
  }

  const removeEndingZeroes = (parts) => {
    while (parts.length > 0 && parts[parts.length - 1] == 0) {
      parts = parts.slice(0, -1);
    }
    return parts;
  };

  const valueParts = removeEndingZeroes((value || '').split('.'));
  const anotherValueParts = removeEndingZeroes((anotherValue || '').split('.'));

  for (
    let pos = 0;
    pos < Math.min(valueParts.length, anotherValueParts.length);
    pos += 1
  ) {
    if (+valueParts[pos] < +anotherValueParts[pos]) {
      return -1;
    }
    if (+valueParts[pos] > +anotherValueParts[pos]) {
      return 1;
    }
  }

  return valueParts.length - anotherValueParts.length;
};

const isVersionConditionSatisfied = (version, versionCondition) => {
  if (!Array.isArray(versionCondition)) {
    return false;
  }

  return versionCondition.some((elem) => {
    if (elem === version) {
      return true;
    }

    if (Array.isArray(elem)) {
      const lower = elem[0];
      const upper = elem[1];

      return (
        compareGenericVersionNumber(lower, version) < 0 &&
        compareGenericVersionNumber(version, upper) < 0
      );
    }
  });
};

const isSupportedBrowserConditionSatisfied = (
  browserData,
  supportedBrowserCondition,
) => {
  if (!browserData) {
    // no data about browser
    return false;
  }

  if (!supportedBrowserCondition) {
    // no condition
    return true;
  }

  const { name, os, version } = browserData;
  const {
    name: nameCondition,
    os: osCondition,
    version: versionCondition,
  } = supportedBrowserCondition;

  return (
    isBrowserNameConditionSatisfied(name, nameCondition) &&
    isOsConditionSatisfied(os, osCondition) &&
    isVersionConditionSatisfied(version, versionCondition)
  );
};

const withDetectSupportedBrowser = () => (Comp) => {
  const DetectSupportedBrowser = ({ supportedBrowsers, ...rest }) => {
    if (!Array.isArray(supportedBrowsers)) {
      // no config => except every browsers
      return <Comp {...rest} />;
    }

    const isBrowserSupported = supportedBrowsers.some((elem) =>
      isSupportedBrowserConditionSatisfied(detectedBrowser, elem),
    );

    return (
      <Comp
        {...rest}
        isBrowserSupported={isBrowserSupported}
        supportedBrowsers={supportedBrowsers}
      />
    );
  };

  const mapStateToProps = createSelector(
    confSelector,
    (conf) => ({
      supportedBrowsers: supportedBrowsersFromConfig(conf),
    }),
  );

  return connect(mapStateToProps)(DetectSupportedBrowser);
};

export default withDetectSupportedBrowser;
