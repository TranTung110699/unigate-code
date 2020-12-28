import React from 'react';
import PropTypes from 'prop-types';
import schema from 'components/admin/user/schema/form';
import SchemaForm from 'schema-form/Form';
import sagaActions from 'actions/saga-creators';
import store from 'store';

class Form extends React.Component {
  cssClass = 'admin-graduation-form';

  handleSubmit = ({ allowed_to_test }) => {
    const { node, user, executeOnSuccess, userIid } = this.props;
    const data = {
      progress: [
        {
          tco_iid: node.iid,
          att: allowed_to_test,
        },
      ],
      userIid: userIid || user.iid,
      ciid: node.iid,
    };
    store.dispatch(
      sagaActions.trackerProgressSave(data, false, executeOnSuccess),
    );
  };

  render() {
    const { className, user, allowedToTest } = this.props;
    return (
      <SchemaForm
        schema={schema}
        node={{ ...user, allowed_to_test: String(allowedToTest) }}
        ntype="user"
        mode="edit"
        step={'allowed_to_test'}
        onSubmit={this.handleSubmit}
        formid={'edit_allowed_to_test'}
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
