import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDataApiResultSelector } from 'components/admin/node/selectors/data-api-results';
import { getNodeSelector } from 'components/admin/node/utils';
import groupApiUrls from 'components/admin/group/endpoints';
import sagaActions from 'actions/node/saga-creators';
import actions from 'actions/node/creators';

const fetchData = (Component) => {
  const dataApiResultKey = 'assignment-group';

  class WrappedComponent extends React.Component {
    componentWillMount() {
      this.fetchGroup(this.props);
      this.fetchScoAndExercise(this.props);
    }

    fetchGroup = (props) => {
      const { dispatch, course, sco, exercise } = props;
      const config = {
        url: groupApiUrls.get_assignment_group,
        keyState: dataApiResultKey,
      };

      const params = {
        course_iid: course.iid,
        sco_iid: sco.iid,
        exercise_iid: exercise.iid,
      };

      dispatch(sagaActions.getDataRequest(config, params));
    };

    fetchScoAndExercise = (props) => {
      const { dispatch, sco } = props;

      dispatch(
        actions.fetchNode({
          iid: sco.iid,
          ntype: 'sco',
          depth: 1,
        }),
      );
    };

    render() {
      const { group, fullSco, fullExercise, originalProps } = this.props;
      if (!group) {
        return null;
      }
      return (
        <Component
          {...originalProps}
          sco={fullSco}
          exercise={fullExercise}
          group={group}
        />
      );
    }
  }

  WrappedComponent.propTypes = {
    className: PropTypes.string,
    course: PropTypes.shape(),
    dispatch: PropTypes.func,
    exercise: PropTypes.shape(),
    node: PropTypes.shape(),
    originalProps: PropTypes.shape(),
    sco: PropTypes.shape(),
    group: PropTypes.shape(),
  };

  WrappedComponent.defaultProps = {
    className: '',
    course: null,
    dispatch: null,
    exercise: null,
    node: null,
    originalProps: null,
    sco: null,
    group: null,
  };

  const mapStateToProps = (state, props) => {
    const groups = getDataApiResultSelector(state)(dataApiResultKey);
    let group = null;
    if (Array.isArray(groups)) {
      group = groups[0];
    }
    const { course, exercise, sco } = props;
    const fullSco = getNodeSelector(state)(sco.iid, course.syllabus, -1);
    const fullExercise = getNodeSelector(state)(exercise.iid, sco.iid, -1);

    return {
      group,
      fullSco,
      fullExercise,
      originalProps: props,
    };
  };

  return connect(mapStateToProps)(WrappedComponent);
};

export default fetchData;
