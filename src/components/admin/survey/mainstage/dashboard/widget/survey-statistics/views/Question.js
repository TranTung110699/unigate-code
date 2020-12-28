import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import DisplayHtml from 'components/common/html';
import {
  questionTypeInText,
  types as QuestionTypes,
} from 'components/admin/question/schema/question-types';
import actions from 'actions/node/creators';
import ViewForm from '../layout/Form';
import SurveyReportQuestionChart from './Chart';
import RaisedButton from 'components/common/mui/RaisedButton';
import commonSagaActions from 'actions/saga-creators';

const styles = {
  title: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
};

class SurveyReportQuestion extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const {
      dispatch,
      surveyIid,
      item: question,
      trainingPlan,
      paramsToFilter,
    } = this.props;
    const contentDialog = (
      <ViewForm
        questionIid={question.iid}
        surveyIid={surveyIid}
        trainingPlan={trainingPlan}
        paramsToFilter={paramsToFilter}
      />
    );

    const optionsProperties = {
      handleClose: true,
      width: '90%',
      title: t1('view_answers'),
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  handleExport = () => {
    const {
      dispatch,
      surveyIid,
      item: question,
      trainingPlan,
      paramsToFilter = {},
    } = this.props;

    dispatch(
      commonSagaActions.exportDataRequest(
        '/survey/api/export-open-ended-answers',
        {
          survey_iid: surveyIid,
          question_iid: question.iid,
          item_iid: trainingPlan && trainingPlan.iid,
          ...paramsToFilter,
        },
      ),
    );
  };

  renderQuestionContent = (question, index) => {
    const qType = questionTypeInText(question.type);

    return (
      <div>
        <div style={styles.title}>
          <span>
            {t1(`question_%s`, [index + 1])}: ({qType})
          </span>
        </div>
        <DisplayHtml content={question.content} />
      </div>
    );
  };

  render() {
    const { item: question, index } = this.props;
    const questionContent = this.renderQuestionContent(question, index);
    let questionAnswers = <div />;
    let total = 0;

    switch (question.type) {
      case QuestionTypes.TYPE_MC:
      case QuestionTypes.TYPE_NUMBER:
        // count total reponses of all answers
        question.loop &&
          question.loop.forEach((loopValue) => {
            if (!isNaN(loopValue) && loopValue > 0) {
              // answer's been clicked
              total += loopValue;
            }
          });

        questionAnswers = (
          <SurveyReportQuestionChart
            answers={question.answers2}
            totalAnswer={total}
            loops={question.loop}
          />
        );
        break;
      case QuestionTypes.TYPE_OPEN_ENDED:
        questionAnswers = [
          <Link to="#" onClick={() => this.handleOnClick()}>
            <RaisedButton label={t1('view_answers')} />
          </Link>,
          <RaisedButton
            className="m-l-30"
            label={t1('export')}
            onClick={this.handleExport}
          />,
        ];
        break;
      default:
        break;
    }

    return (
      <div>
        <div>{questionContent}</div>
        <div>{questionAnswers}</div>
        <hr />
      </div>
    );
  }
}

export default connect()(SurveyReportQuestion);
