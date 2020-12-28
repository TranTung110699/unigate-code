import React, { Component } from 'react';
import { connect } from 'react-redux';
import schema from 'components/admin/enrolment-plan/schema/form';
import { filterObjectKeys } from 'common/utils/object';
import NewEnrolmentPlanForm from 'components/admin/enrolment-plan/new/Form';

const getFormId = (props) => props.formid || 'new_enrolment_plan_of_program';

class Form extends Component {
  render() {
    const { learningItems } = this.props;

    let params = this.props.params || {};

    return (
      <NewEnrolmentPlanForm
        schema={schema}
        mode={'new'}
        learningItems={learningItems}
        redirectToEditPage
        node={
          // if there is only one learningItems, we will use some of its attributes as default values for enrolment plan
          Array.isArray(learningItems) &&
          learningItems.length === 1 &&
          filterObjectKeys(learningItems[0], [
            'academic_categories',
            'name',
            'organizations',
          ])
        }
        closeModal
        formid={getFormId(this.props)}
        params={params}
      />
    );
  }
}

export default connect()(Form);
