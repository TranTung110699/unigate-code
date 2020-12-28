import React, { Component } from 'react';
import lodashGet from 'lodash.get';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Form from './Form';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import Popover from 'antd/lib/popover';

class Question extends Component {
  render() {
    const {
      style,
      question,
      userIids,
      enrolmentPlan,
      targetIid,
      searchFormId,
    } = this.props;

    return (
      <Popover
        title={t1('update_survey_question_answers_in_this_column')}
        content={
          <Form
            searchFormId={searchFormId}
            formid={`edit_survey_question_answer_${lodashGet(
              enrolmentPlan,
              'iid',
            )}_${lodashGet(question, 'iid')}`}
            question={question}
            enrolmentPlan={enrolmentPlan}
            targetIid={targetIid}
            userIids={userIids}
          />
        }
        placement="right"
        trigger="click"
      >
        <Icon
          style={{
            cursor: 'pointer',
            ...(style || {}),
          }}
          title={t1('update_survey_question_answers_in_this_column')}
          icon="edit"
        />
      </Popover>
    );
  }
}

export default Question;
