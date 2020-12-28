import React from 'react';
import { connect } from 'react-redux';
import NormalExercise from './normal-exercise';
import RolePlay from './role-play';

class Exercise extends React.Component {
  render() {
    const { exercise } = this.props;
    return (
      exercise &&
      ((exercise.type === 'roleplay' && (
        <RolePlay exerciseIid={exercise.iid} />
      )) || <NormalExercise exerciseIid={exercise.iid} />)
    );
  }
}

const mapStateToProps = (state, props) => {
  const nodes = state.tree;
  const { exerciseIid } = props;
  const exercise = nodes[exerciseIid];

  return {
    exercise,
  };
};

export default connect(mapStateToProps)(Exercise);
