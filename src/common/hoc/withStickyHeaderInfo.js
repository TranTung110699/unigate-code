import React from 'react';
import { connect } from 'react-redux';
import lodashGet from 'lodash.get';
import { createSelector } from 'reselect';

const withStickyHeaderInfo = () => (Component) => {
  const WrappedComponent = ({ stickyHeaderInfo, ...rest }) => {
    return <Component stickyHeaderInfo={stickyHeaderInfo} {...rest} />;
  };

  const mapStateToProps = createSelector(
    (state) => lodashGet(state, 'common.stickyHeaderHeight'),
    (height) => {
      return {
        stickyHeaderInfo: {
          height,
        },
      };
    },
  );

  return connect(mapStateToProps)(WrappedComponent);
};

export default withStickyHeaderInfo;
