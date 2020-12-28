import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import user from 'components/admin/user/schema/form';

class UserChangePasswordForm extends Component {
  render() {
    const {
      mode,
      ntype,
      step,
      node,
      searchFormId,
      schoolScope,
      hiddenFields,
      alternativeApi,
    } = this.props;
    const title = this.props.title;
    const formid = this.props.formid || 'change_password';

    // this form is used by both root & school admin.
    // if schoolScope it will send flag system along

    return (
      <div>
        <NodeNew
          title={title}
          ntype={ntype}
          mode={mode}
          step={step}
          node={node}
          schema={user}
          closeModal
          searchFormId={searchFormId}
          formid={formid}
          hiddenFields={Object.assign(
            {},
            schoolScope ? {} : { _sand_is_system: 1 },
            hiddenFields,
          )}
          alternativeApi={alternativeApi}
          oldSubmitButton
        />
      </div>
    );
  }
}

export default connect()(UserChangePasswordForm);
