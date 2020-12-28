import React, { Component } from 'react';
import { t1 } from 'translate/index';
import getLodash from 'lodash.get';
import DisplayHtml from 'components/common/html/index';
import schema from 'components/admin/take/schema/form';
import NewForm from 'components/admin/node/new/index';

const style = {
  border: '1px solid green',
};

class MarkScore extends Component {
  render() {
    const { takeId, question, answer, onManualMarkingQuestion } = this.props;

    const hiddenFields = {
      question: answer.iid,
      weighted: answer.weighted,
    };

    return (
      <div>
        <div className="whitebox">
          <DisplayHtml content={question.content} />
        </div>

        <hr />
        <b>{t1("user's_answer")}</b>
        <div style={style} className="whitebox">
          <DisplayHtml content={getLodash(answer, 'answer.content')} />
        </div>

        <h2>
          {t1('current_score')}:{' '}
          <b>
            {typeof answer.score != 'undefined'
              ? answer.score
              : t1('not_yet_marked')}
          </b>
        </h2>
        <NewForm
          schema={schema}
          mode="edit"
          step="set_question_score"
          ntype="take"
          node={{
            id: takeId,
            question: answer.iid,
          }}
          params={hiddenFields}
          formid={`mark_score_${takeId}_${answer.iid}`}
          searchFormId={'exam_result_search'}
          alternativeApi={'/take/update'}
          closeModal={false}
          requestSuccessful={() => {
            if (
              onManualMarkingQuestion &&
              typeof onManualMarkingQuestion == 'function'
            ) {
              onManualMarkingQuestion();
            }
          }}
        />
      </div>
    );
  }
}

export default MarkScore;
