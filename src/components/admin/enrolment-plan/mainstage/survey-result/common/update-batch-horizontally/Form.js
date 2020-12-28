import React, { Component } from 'react';
import schema from './schema';
import NodeNew from 'components/admin/node/new';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';

class Form extends Component {
  render() {
    const {
      searchFormId,
      formid,
      questions,
      enrolmentPlan,
      userIid,
      targetIids,
    } = this.props;
    return (
      <NodeNew
        searchFormId={searchFormId}
        formid={formid}
        hiddenFields={{
          enrolment_plan_iid: lodashGet(enrolmentPlan, 'iid'),
          questions,
          user_iid: userIid,
          target_iids: targetIids,
        }}
        submitLabels={{
          new: t1('save'),
        }}
        schema={schema}
        alternativeApi={
          apiUrls.save_survey_take_question_answer_for_surveys_of_enrolment_plan_users
        }
      />
    );
  }
}

export default Form;
