import React, { Component } from 'react';
import { constants } from 'configs/constants';
import routes from 'routes';
import ActionSelect from 'components/common/select/ActionSelect';
import { t1 } from 'translate';

class SequentialLearning extends Component {
  render() {
    const { node, syllabus, readOnly } = this.props;

    return (
      <ActionSelect
        floatingLabelText={t1('sequential_learning_type')}
        name="sequential_learning_type"
        value={syllabus && syllabus.sequential_learning_type}
        baseURL={routes.url('node_update', {
          ...syllabus,
          step: 'sequential',
        })}
        dataSet={constants.syllabusSequentialLearningTypeOptions()}
        style={this.actionSelectStyle}
        type="radio"
        readOnly={readOnly}
      />
    );
  }
}

export default SequentialLearning;
