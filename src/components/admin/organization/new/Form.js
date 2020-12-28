/* eslint-disable react/prop-types,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { getOrgTypes } from 'configs/constants';
import organizationSchema from '../schema/form';

class Form extends Component {
  render() {
    const { mode, params, orgTypes, ...props } = this.props;
    const formid = this.props.formid || 'new_organization';

    const alternativeApi =
      mode === 'new' ? '/organization/api/new' : '/organization/api/update';

    return (
      <div>
        <NodeNew
          {...props}
          ntype={'organization'}
          schema={organizationSchema}
          mode={mode}
          closeModal
          alternativeApi={alternativeApi}
          formid={formid}
          searchFormId="organization_search"
          params={{ ...params, orgTypes }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  orgTypes: getOrgTypes(state, '*'),
});

export default connect(mapStateToProps)(Form);
