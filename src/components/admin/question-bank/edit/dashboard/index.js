import React from 'react';
import { t1 } from 'translate';
import { approveSwitch, freezeSwitch } from '../switch-controls';
import SwitchControls from 'components/common/SwitchControls';
import Widget from 'components/common/Widget';
import WidgetDifficultyOfQuestions from './DifficultyOfQuestions';
import WidgetTypeOfQuestions from './TypeOfQuestions';

class QuestionBankDashboard extends React.Component {
  render() {
    const { node, categoryMappingWithTheSkills } = this.props;

    return (
      <div className="flex-container-wrap">
        <div className="flex-item">
          <Widget title={t1('question_bank_status')}>
            <div>
              <b>{t1('approve_status')}</b>
              <SwitchControls node={node} items={[approveSwitch(node)]} />
            </div>
          </Widget>
        </div>
        {!!categoryMappingWithTheSkills ? (
          <div className="flex-item">
            <Widget title={t1('the_difficulty_of_questions_by_skill')}>
              <WidgetDifficultyOfQuestions
                groupBy="skill"
                questionBanks={[node.iid]}
              />
            </Widget>
          </div>
        ) : (
          [
            <div className="flex-item">
              <Widget title={t1('the_difficulty_of_questions_by_category')}>
                <WidgetDifficultyOfQuestions
                  groupBy="category"
                  questionBanks={[node.iid]}
                />
              </Widget>
              ,
            </div>,
            <div className="flex-item">
              <Widget title={t1('question_number_by_type_group_by_category')}>
                <WidgetTypeOfQuestions questionBanks={[node.iid]} />
              </Widget>
              ,
            </div>,
          ]
        )}
      </div>
    );
  }
}

export default QuestionBankDashboard;
