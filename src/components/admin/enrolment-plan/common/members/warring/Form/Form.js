import React from 'react';
import PropTypes from 'prop-types';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import { t1 } from 'translate';
import NodeNew from 'components/admin/node/new';
import schema from './schema';
import lodashGet from 'lodash.get';

class Form extends React.PureComponent {
  render() {
    const {
      items,
      requestSuccessful,
      searchFormId,
      formid,
      message,
      mode,
      dialogKey,
      node,
      totalResult,
      conditionToSearch,
      trainingPlan,
    } = this.props;

    const hiddenFields = {
      items,
      enrolment_plan_iid: lodashGet(node, 'iid'),
      training_plan_iid: lodashGet(trainingPlan, 'iid'),
      condition_to_search: conditionToSearch,
    };
    if (!Array.isArray(items) || !items.length) {
      hiddenFields.send_all = 1;
    }

    return (
      <div>
        <div>{message}</div>
        <br />
        <NodeNew
          closeModal
          hiddenFields={hiddenFields}
          dialogKey={dialogKey}
          formid={formid}
          schema={schema}
          submitLabels={{
            new: t1('submit'),
          }}
          totalResult={totalResult}
          requestSuccessful={requestSuccessful}
          params={{
            mode,
          }}
          alternativeApi={apiUrls.notification_warning_users_in_epl}
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
