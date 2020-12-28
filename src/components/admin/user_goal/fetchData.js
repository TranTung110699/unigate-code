import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDataApiResultSelector } from 'components/admin/node/selectors/data-api-results';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';

const getDataApiResultKey = (iid) => `user_goal_${iid}`;

const fetchData = (Component) => {
  class WrappedComponent extends React.Component {
    componentWillMount() {
      this.fetchUserGoalProgress(this.props);
    }

    fetchUserGoalProgress = (props) => {
      const { dispatch, node } = props;
      const config = {
        url: apiUrls.get_data_for_user_goal_progress_chart,
        keyState: getDataApiResultKey(node.iid),
      };

      const params = {
        iid: node.iid,
      };

      dispatch(sagaActions.getDataRequest(config, params));
    };

    render() {
      const { progresses, originalProps } = this.props;
      if (!progresses) {
        return null;
      }
      return <Component {...originalProps} progresses={progresses} />;
    }
  }

  WrappedComponent.propTypes = {
    className: PropTypes.string,
    dispatch: PropTypes.func,
    node: PropTypes.shape(),
    originalProps: PropTypes.shape(),
    progresses: PropTypes.shape(),
  };

  WrappedComponent.defaultProps = {
    className: '',
    dispatch: null,
    node: null,
    originalProps: null,
    progresses: null,
  };

  const mapStateToProps = (state, props) => {
    const progresses = getDataApiResultSelector(state)(
      getDataApiResultKey(props.node.iid),
    );

    return {
      progresses,
      originalProps: props,
    };
  };

  return connect(mapStateToProps)(WrappedComponent);
};

export default fetchData;
