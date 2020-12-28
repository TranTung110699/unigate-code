import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import jobPositionSchema from '../schema/form';

class JobPositionNewForm extends Component {
  render() {
    const { mode, step, node, params, searchFormId } = this.props;
    const formid = this.props.formid || 'new_job_position';
    let alternativeApi;
    if (mode === 'new') alternativeApi = '/job-position/api/new';
    if (mode === 'edit') alternativeApi = '/job-position/api/update';

    let hiddenFields = this.props.hiddenFields || {};

    return (
      <div>
        <NodeNew
          ntype={'job_position'}
          schema={jobPositionSchema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          hiddenFields={hiddenFields}
          alternativeApi={alternativeApi}
          formid={formid}
          searchFormId={searchFormId || 'job_position_search_form'}
          params={params}
        />
      </div>
    );
  }
}

export default JobPositionNewForm;
