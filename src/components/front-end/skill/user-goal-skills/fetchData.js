import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDataApiResultSelector } from 'components/admin/node/selectors/data-api-results';
import { getLoadingStatus } from 'utils/selectors';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';

const fetchData = (Component) => {
  const dataApiResultKey = 'user-goal-skills';

  class WrappedComponent extends React.Component {
    componentWillMount() {
      this.fetchUserGoalProgress(this.props);
    }

    fetchUserGoalProgress = (props) => {
      const { dispatch, node } = props;
      const config = {
        url: apiUrls.get_skills_of_user_goals,
        keyState: dataApiResultKey,
      };

      const params = {
        user_iid: node && node.iid,
      };

      dispatch(sagaActions.getDataRequest(config, params));
    };

    render() {
      const { skills, loadingStatus, originalProps } = this.props;
      if (!skills) {
        return null;
      }
      return (
        <Component
          {...originalProps}
          loadingStatus={loadingStatus}
          skills={skills}
        />
      );
    }
  }

  WrappedComponent.propTypes = {
    className: PropTypes.string,
    dispatch: PropTypes.func,
    loadingStatus: PropTypes.string,
    node: PropTypes.shape(),
    originalProps: PropTypes.shape(),
    skills: PropTypes.arrayOf(PropTypes.shape()),
  };

  WrappedComponent.defaultProps = {
    className: '',
    dispatch: null,
    loadingStatus: '',
    node: null,
    originalProps: null,
    skills: null,
  };

  const mapStateToProps = (state, props) => {
    const skills = getDataApiResultSelector(state)(dataApiResultKey);

    return {
      skills,
      originalProps: props,
      loadingStatus: getLoadingStatus(state)(dataApiResultKey),
    };
  };

  return connect(mapStateToProps)(WrappedComponent);
};

export default fetchData;
