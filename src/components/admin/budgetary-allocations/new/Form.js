import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import schema from '../schema/form';
import { createSelector } from 'reselect';
import lodashGet from 'lodash.get';
class Form extends Component {
  render() {
    const {
      mode,
      step,
      node,
      params,
      allocations_budgetary_equivalent,
    } = this.props;
    const formid = this.props.formid || 'new_cost';
    const alternativeApi = this.props.alternativeApi;
    /**
     * Lay config xem support equivalent positions hay credit && programs
     * Hien tai support cho equivalent_positions
     * @type {string}
     */
    let modeConfig = 'credit_programs';
    if (allocations_budgetary_equivalent) {
      modeConfig = 'equivalent_positions';
    }
    return (
      <div>
        <NodeNew
          ntype={'budgetary-allocations'}
          schema={schema}
          mode={mode}
          step={step}
          node={node}
          hiddenFields={{
            mode: modeConfig,
          }}
          closeModal
          alternativeApi={alternativeApi}
          formid={formid}
          searchFormId="budgetary_form_new"
          params={params}
        />
      </div>
    );
  }
}
const mapStateToProps = createSelector(
  (state, props) => lodashGet(state, 'domainInfo.conf'),
  (conf) => ({
    allocations_budgetary_equivalent: lodashGet(
      conf,
      'support_equivalent_job_positions',
    ),
  }),
);
export default connect(mapStateToProps)(Form);
