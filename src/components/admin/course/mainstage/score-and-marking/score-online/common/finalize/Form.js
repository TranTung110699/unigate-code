import React from 'react';
import PropTypes from 'prop-types';
import schema from 'components/admin/user/schema/form';
import SchemaForm from 'schema-form/Form';
// import sagaActions from 'actions/saga-creators';
import store from 'store';
import nodeSagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';

class Form extends React.Component {
  cssClass = 'admin-graduation-form';

  handleSubmit = ({ graduated }) => {
    const { node, user, executeOnSuccess, score, offlineExamIid } = this.props;
    store.dispatch(
      nodeSagaActions.submitFormRequest('', {
        url: apiUrls.set_user_pass_fail_status_in_course,
        extraParams: {
          user_iid: user.iid,
          course_iid: node.iid,
          offline_exam_iid: offlineExamIid,
          pf: graduated,
          p: score,
        },
        executeOnSuccess,
      }),
    );
  };

  render() {
    const { user, graduated } = this.props;
    return (
      <SchemaForm
        schema={schema}
        node={{ ...user, graduated }}
        ntype="user"
        mode="edit"
        step={'graduation_finalize'}
        onSubmit={this.handleSubmit}
        formid={'edit_graduation_finalize'}
      />
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
