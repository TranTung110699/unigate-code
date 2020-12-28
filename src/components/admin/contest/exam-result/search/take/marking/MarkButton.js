import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate/index';
import actions from 'actions/node/creators';
import MarkScore from './MarkScore';
import Icon from 'components/common/Icon/index';

class MarkButton extends Component {
  markTakeInDialog = (takeId, question, answer) => {
    const { onManualMarkingQuestion } = this.props;

    const optionsProperties = {
      width: '60%',
      handleClose: true,

      modal: true,
      title: t1('marking_a_question'),
    };

    const contentDialog = (
      <MarkScore
        takeId={takeId}
        question={question}
        answer={answer}
        onManualMarkingQuestion={onManualMarkingQuestion}
      />
    );

    const dialogKey = `${takeId}-${question.id}`;

    this.props.dispatch(
      actions.handleOpenDialog({ contentDialog, optionsProperties }, dialogKey),
    );
  };

  render() {
    const { question, takeId, answer } = this.props;

    return (
      <button
        onClick={() => {
          this.markTakeInDialog(takeId, question, answer);
        }}
        title={t1('view_user_answer_and_mark')}
      >
        <Icon icon="edit" />
      </button>
    );
  }
}

export default connect()(MarkButton);
