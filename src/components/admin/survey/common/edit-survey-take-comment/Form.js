import React, { Component } from 'react';
import schema from './schema';
import NodeNew from 'components/admin/node/new';
import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';

import { t1 } from 'translate';

class Form extends Component {
  render() {
    const { formid, takeIdsToSaveAnswer, comment, searchFormId } = this.props;
    return (
      <NodeNew
        searchFormId={searchFormId}
        formid={formid}
        node={{
          comment,
        }}
        hiddenFields={{
          take_ids: takeIdsToSaveAnswer,
        }}
        submitLabels={{
          new: t1('save'),
        }}
        schema={schema}
        alternativeApi={sApiUrls.save_survey_take_comment}
      />
    );
  }
}

export default Form;
