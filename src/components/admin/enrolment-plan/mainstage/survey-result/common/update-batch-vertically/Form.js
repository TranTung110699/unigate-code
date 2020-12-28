import React, { Component } from 'react';
import schema from './schema';
import NodeNew from 'components/admin/node/new';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';

class Form extends Component {
  render() {
    const {
      formid,
      question,
      searchFormId,
      enrolmentPlan,
      targetIid,
      userIids,
    } = this.props;
    return (
      <NodeNew
        searchFormId={searchFormId}
        formid={formid}
        hiddenFields={{
          question,
          target_iid: targetIid,
          enrolment_plan_iid: lodashGet(enrolmentPlan, 'iid'),
          user_iids: userIids,
        }}
        submitLabels={{
          new: t1('save'),
        }}
        schema={schema}
        alternativeApi={
          apiUrls.save_survey_take_question_answer_for_surveys_of_a_target_in_enrolment_plan
        }
      />
    );
  }
}

export default Form;
