import React from 'react';
import PropTypes from 'prop-types';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import { t1 } from 'translate';
import NodeNew from 'components/admin/node/new';
import schema from './schema';

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
      submitLabel,
    } = this.props;

    return (
      <div>
        <div>{message}</div>
        <br />
        <NodeNew
          closeModal
          dialogKey={dialogKey}
          formid={formid}
          searchFormId={searchFormId}
          schema={schema}
          submitLabels={{
            new: submitLabel || t1('submit'),
          }}
          requestSuccessful={requestSuccessful}
          params={{
            items,
            mode,
          }}
          alternativeApi={apiUrls.add_enrolment_plan_member_relations}
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
