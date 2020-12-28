import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import userSchema from 'components/admin/user/schema/form';

class Form extends Component {
  componentDidMount() {
    const { step, formid } = this.props;
    if (step === 'set_pass') {
      this.props.dispatch(change(formid, 'pass', ''));
    }
  }

  render() {
    const {
      mode,
      step,
      teacher,
      hiddenFields,
      submitButton,
      requestSuccessful,
    } = this.props;
    let { node } = this.props;
    const formid = this.props.formid || 'new_user';
    const searchFormId = this.props.searchFormId || 'user_school_search';
    const alternativeApi = this.props.alternativeApi;
    const showAddNewAndEditButton = this.props.showAddNewAndEditButton;
    const getEditItemUrl = this.props.getEditItemUrl;
    if (teacher && !node) {
      node = teacher;
    }
    if (node && node.roles) {
      node.roles = node.roles.filter((role) => {
        const parts = role.split(':');
        if (parts.length > 0) {
          if (parts[0] !== '') {
            return true;
          }
        }

        return false;
      });
    }

    return (
      <div>
        <NodeNew
          ntype={'user'}
          schema={userSchema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          alternativeApi={alternativeApi}
          showAddNewAndEditButton={showAddNewAndEditButton}
          getEditItemUrl={getEditItemUrl}
          hiddenFields={hiddenFields}
          formid={formid}
          searchFormId={searchFormId}
          submitButton={submitButton}
          requestSuccessful={requestSuccessful}
        />
      </div>
    );
  }
}

export default connect()(Form);
