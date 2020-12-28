import React from 'react';
import PropTypes from 'prop-types';
import { enrolmentPlanStatuses } from 'configs/constants/enrolmentPlan';
import { t1 } from 'translate';
import NodeNew from 'components/admin/node/new';
import { fetchEnrolmentPlanData } from 'components/admin/enrolment-plan/common';

class Form extends React.PureComponent {
  render() {
    const { node } = this.props;

    return (
      <div>
        <div>
          {t1('do_you_want_to_stop_this_enrolment_plan?')}{' '}
          {t1('this_action_is_irreversible')}
        </div>
        <NodeNew
          closeModal
          formid="stop_enrolment_plan"
          schema={{}}
          mode="edit"
          ntype="enrolment_plan"
          step="stop"
          node={node}
          submitLabels={{
            edit: t1('submit'),
          }}
          requestSuccessful={() => fetchEnrolmentPlanData(node)}
          params={{
            status: enrolmentPlanStatuses.STOPPED,
          }}
        />
      </div>
    );
  }
}

Form.propTypes = {
  className: PropTypes.string,
};

Form.defaultProps = {
  className: '',
};

export default Form;
