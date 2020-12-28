import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import newEpSchema from './schema-form';
import { t1 } from 'translate';
import Warning from 'components/common/Warning';

class Form extends Component {
  requestSuccessful = () => {
    const { group } = this.props;
    window.location = `/admin/group/${group.iid}/setup`; //.reload();
  };

  render() {
    const formid = this.props.formid || 'add_ep_for_group';

    const { group, semester } = this.props;
    const hiddenFields = {
      group: group.iid,
    };

    return (
      <div>
        <h1>
          {t1('create_enrolment_plans_for_semester')}: {semester.name}
        </h1>
        <Warning>
          {t1(
            'when_you_create_this,_all_other_enrolment_plans_for_the_semester_will_be_deleted',
          )}
        </Warning>
        <NodeNew
          {...this.props}
          schema={newEpSchema}
          hiddenFields={Object.assign(hiddenFields, { semester: semester.iid })}
          closeModal
          formid={`${formid}-${semester.iid}`}
          alternativeApi={'/k12/enrolment-plan/create-ep-for-group'}
          key={`node-new-sem-${semester.iid}`}
          requestSuccessful={this.requestSuccessful}
        />
      </div>
    );
  }
}

export default connect()(Form);
