import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNodeSelector } from 'components/admin/node/utils';
import { ntype } from 'configs/constants';
import actions from 'actions/node/creators';

const fetchData = (Component) => {
  class Wrapped extends React.Component {
    componentWillMount() {
      const { dispatch, iid } = this.props;
      dispatch(actions.fetchNode({ iid, ntype: ntype.PATH, depth: 1 }));
    }

    render() {
      const { path } = this.props;
      return <Component {...this.props} path={path} />;
    }
  }

  Wrapped.propTypes = {
    path: PropTypes.shape(),
  };

  Wrapped.defaultProps = {
    path: null,
  };

  const mapStateToProps = (state, props) => {
    const { iid } = props;
    const path = getNodeSelector(state)(iid, null, 1);
    return {
      path,
    };
  };

  return connect(mapStateToProps)(Wrapped);
};

export default fetchData;
