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
class SetupForTimetable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onSave, params, defaultValues } = this.props;
    return (
      <NodeNew
        mode="new"
        node={defaultValues}
        ntype="timetable"
        schema={newTimetable}
        onSubmit={onSave}
        step="setup"
        params={params}
        formid="setupTimeTable"
        submitLabels={{ new: t1('save'), submitting: '.....' }}
      />
    );
  }
}

export default SetupForTimetable;
