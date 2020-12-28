import React, { Component } from 'react';
import schema from './schema';
import NodeNew from 'components/admin/node/new';
// import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import { isIntro } from 'common/learn/Question';

import { t1 } from 'translate';

class Form extends Component {
  render() {
    const {
      formid,
      takeIdsToSaveAnswer,
      question,
      answer,
      searchFormId,
    } = this.props;
    return (
      <NodeNew
        hideSubmitButton={isIntro(question)}
        searchFormId={searchFormId}
        formid={formid}
        node={{
          answer,
        }}
        hiddenFields={{
          take_ids: takeIdsToSaveAnswer,
          question,
        }}
        submitLabels={{
          new: t1('save'),
        }}
        schema={schema}
        alternativeApi={sApiUrls.save_survey_take_question_answer}
      />
    );
  }
}

export default Form;
