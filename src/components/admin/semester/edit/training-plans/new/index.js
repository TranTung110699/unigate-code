import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { t1 } from 'translate';
// import { creditSyllabusLevels } from 'common/conf';
// import sagaActions from 'actions/node/saga-creators';
// import VarDump from 'components/common/VarDump';
import NodeNew from 'components/admin/node/new';
import schema from './schema';

class NewTrainingPlan extends React.Component {
  render() {
    const {
      // node, // object
      semester,
      // grade,
      // trainingMode,
    } = this.props;

    const hiddenFields = {
      semester,
      // grade,
      // training_mode: trainingMode,
    };

    const formid = `create-tp-for-semester-${semester}`; //-${grade}-${
    //   node ? node.iid : ''
    // }`;

    return (
      <div>
        <h1>Semester: {semester}</h1>

        <NodeNew
          ntype={'semester'}
          schema={schema}
          hiddenFields={hiddenFields}
          mode={'new'}
          step={''}
          closeModal
          formid={formid}
          alternativeApi={'/k12/training-plan/create'}
        />
      </div>
    );
  }
}

export default NewTrainingPlan;
