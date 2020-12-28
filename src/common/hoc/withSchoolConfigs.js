import React, { Component } from 'react';
import { connect } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { getGlobalConfigs } from 'utils/selectors';
import { createSelector } from 'reselect';

/**
 * Will pass down the following props to component
 *  1. themeConfig: the whole theme config object, including lots of stuff like layout, color....
 *  2. Some commonly used pararms like
 *
   layout, // the layout in string ('sb', 'evn'...)
   isK12.
   isEnterprise
   isSIS

   isEvn
   isViettel
   isSeabank
   isXpeak
   isPixelz
   isMsi
   isLotus
   isEtec
   isVieted

 * this way the wrapped component doesn't have to get from the state any more
 *
 *
 *
 *
 * @param WrappedComponent
 * @returns {*}
 */

const mapStateToProps = createSelector(
  getGlobalConfigs,
  (globalConfigs) => {
    return {
      globalConfigs,
    };
  },
);

const withSchoolConfigs = (WrappedComponent, mapGlobalConfigsToProps) => {
  class SchoolConfigsHOC extends Component {
    render() {
      const { globalConfigs, ...others } = this.props;

      let newProps =
        typeof mapGlobalConfigsToProps === 'function'
          ? mapGlobalConfigsToProps(globalConfigs)
          : globalConfigs;

      return <WrappedComponent {...others} {...newProps} />;
    }
  }

  hoistNonReactStatic(SchoolConfigsHOC, WrappedComponent);

  return connect(mapStateToProps)(SchoolConfigsHOC);
};

export default withSchoolConfigs;
