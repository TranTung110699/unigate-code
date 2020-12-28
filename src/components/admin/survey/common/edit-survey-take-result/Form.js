import React, { Component } from 'react';
import schema from './schema';
import NodeNew from 'components/admin/node/new';
import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';

class Form extends Component {
  render() {
    const { searchFormId, formid, questions, take } = this.props;
    return (
      <NodeNew
        searchFormId={searchFormId}
        formid={formid}
        hiddenFields={{
          questions,
          take_id: lodashGet(take, 'id'),
        }}
        node={Object.assign({}, take, {
          answers: (questions || []).reduce(
            (answers, q) => ({
              ...answers,
              [lodashGet(q, 'iid')]:
                lodashGet(take, ['answers', lodashGet(q, 'iid')]) || {},
            }),
            {},
          ),
        })}
        submitLabels={{
          new: t1('save'),
        }}
        schema={schema}
        alternativeApi={sApiUrls.update_survey_take_result}
      />
    );
  }
}

export default Form;
