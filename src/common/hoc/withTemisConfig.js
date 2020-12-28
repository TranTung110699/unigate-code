import React, { Component } from 'react';
import { connect } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import lodashGet from 'lodash.get';
import Store from 'store';
import { isHieuTruong, isLeader } from 'components/admin/user/utils';

export const getTemisConfByUser = (user) => {
  const state = Store.getState();
  const isHT = isHieuTruong(user);
  const isLD = isLeader(user);
  const temisConfig = lodashGet(state, 'domainInfo.conf.temis') || {};
  const rubricToAssessment = lodashGet(
    temisConfig,
    isHT ? 'tcnn_ht' : 'tcnn_gv',
  );

  return {
    temisConfig,
    isHieuTruong: isHT,
    isLeader: isLD,
    rubricToAssessment,
  };
};

/**
 * Will pass down the following props to component
 *
 * @param WrappedComponent
 * @returns {*}
 */
const withTemisConfig = (WrappedComponent) => {
  class SchoolConfigsHOC extends Component {
    render() {
      const { globalConfigs, ...others } = this.props;

      return <WrappedComponent {...others} {...globalConfigs} />;
    }
  }

  const mapStateToProps = (state) => {
    const user = lodashGet(state, 'user.info');
    const temisByUser = getTemisConfByUser(user);

    return {
      ...temisByUser,
      userRoot: user,
    };
  };

  hoistNonReactStatic(SchoolConfigsHOC, WrappedComponent);

  return connect(mapStateToProps)(SchoolConfigsHOC);
};

export default withTemisConfig;
