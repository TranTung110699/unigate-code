import React from 'react';
import newTimetable from '../form-configs/new';
import NodeNew from 'components/admin/node/new';
import { t1 } from 'translate';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 21/10/2017
 **/
class ChooseTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onSubmit, params, node } = this.props;

    return (
      <NodeNew
        mode="edit"
        node={node}
        ntype="timetable"
        schema={newTimetable}
        onSubmit={onSubmit}
        step="teachers"
        params={params}
        formid="chooseTeacherForTimetable"
        submitLabels={{ new: t1('save'), submitting: '.....' }}
      />
    );
  }
}

export default ChooseTeacher;
