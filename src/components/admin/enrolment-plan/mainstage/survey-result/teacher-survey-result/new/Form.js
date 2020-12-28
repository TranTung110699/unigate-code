import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import schema from './schema';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import Warning from 'components/common/Warning';
import { t1 } from 'translate';

class Form extends Component {
  render() {
    const {
      node,
      params,
      requestSuccessful,
      searchFormId,
      surveyIid,
    } = this.props;
    const formid =
      this.props.formid || 'new_enrolment_plan_teacher_survey_take';
    const alternativeApi = apiUrls.new_enrolment_plan_teacher_survey_take;

    return (
      <div>
        {!surveyIid ? (
          <Warning>{t1('please_select_survey_first')}</Warning>
        ) : (
          <NodeNew
            schema={schema}
            formid={formid}
            searchFormId={searchFormId}
            alternativeApi={alternativeApi}
            hiddenFields={{
              enrolment_plan_iid: node && node.iid,
              survey_iid: surveyIid,
            }}
            params={params}
            requestSuccessful={requestSuccessful}
          />
        )}
      </div>
    );
  }
}

export default connect()(Form);
