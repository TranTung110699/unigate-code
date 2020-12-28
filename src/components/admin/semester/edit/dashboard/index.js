/**
 * Created by hungvo on 21/04/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import SearchTrainingPlans from '../training-plans/search';
import { isK12 } from 'common/k12';

class SemesterDashboard extends React.Component {
  render() {
    const { node, k12 } = this.props;

    return (
      <div>
        {t1('semester')}: {node.name}
        {k12 ? <SearchTrainingPlans {...this.props} /> : null}
        {/*
        { trainingModes.map((mode) => {
          <h1>{t1('training_mode')}: {mode}</h1>
          {
            grades.map((grade) => (<SemesterForGrade
              semester={node}
              grade={grade}
              trainingMode={mode}
            />
          ))
          }
          }
        )}

           */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    k12: isK12(state),
  };
};

export default connect(mapStateToProps)(SemesterDashboard);
