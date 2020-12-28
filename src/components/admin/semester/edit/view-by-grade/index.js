import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { creditSyllabusLevels } from 'common/conf';
import sagaActions from 'actions/node/saga-creators';
import VarDump from 'components/common/VarDump';
import NodeNew from 'components/admin/node/new';
import schema from './new-plan-for-grade-schema';

const groupKeyInStore = (props) =>
  props.semester && props.grade
    ? `groups-${props.semester.iid}-${props.grade}`
    : 'groups-by-semester-grade';

class SemesterGrade extends React.Component {
  componentDidMount() {
    const { semester, grade, trainingMode } = this.props;

    const url = '/k12/semester/get-academic-info-for-groups-by-grade';
    const key = groupKeyInStore(this.props);

    const params = {
      semester: semester.iid,
      grade: grade,
      training_mode: trainingMode,
    };

    // this.props.dispatch(
    //   sagaActions.getDataRequest(
    //     { url, keyState: key },
    //     params,
    //   ),
    // );
  }

  render() {
    const {
      semester, // object
      grade,
      // groups,
      trainingMode,
    } = this.props;

    const hiddenFields = {
      semester: semester.iid,
      grade,
      training_mode: trainingMode,
    };

    return (
      <div>
        <h1>
          {t1('grade')}: grade {grade}, training mode: {trainingMode}
        </h1>

        <NodeNew
          ntype={'semester'}
          schema={schema}
          hiddenFields={hiddenFields}
          mode={'new'}
          step={''}
          closeModal
          formid={`xxxxx`}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const key = groupKeyInStore(props);
  return {
    grades: creditSyllabusLevels(state.domainInfo),
    groups: state.dataApiResults[key] || [],
  };
};

export default connect(mapStateToProps)(SemesterGrade);
