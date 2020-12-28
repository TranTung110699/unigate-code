import React from 'react';
import { t1 } from 'translate';
import get from 'lodash.get';
import { approveSwitch, freezeSwitch } from '../switch-controls';
import SwitchControls from 'components/common/SwitchControls';
import Widget from 'components/common/Widget';
import WidgetDifficultyOfQuestions from 'components/admin/question-bank/edit/dashboard/DifficultyOfQuestions';
import WidgetTypeOfQuestions from 'components/admin/question-bank/edit/dashboard/TypeOfQuestions';

class ExamTemplateDashboard extends React.Component {
  render() {
    const { node, categoryMappingWithTheSkills } = this.props;
    const questionBanks = get(node, 'question_banks');

    return (
      <div className="flex-container-wrap">
        <div className="flex-item">
          <Widget title={t1('exam_template_status')}>
            <div>
              <b>{t1('approve_status')}</b>
              <SwitchControls node={node} items={[approveSwitch(node)]} />
            </div>
            <div>
              <b>{t1('freeze_status')}</b>
              <SwitchControls node={node} items={[freezeSwitch(node)]} />
            </div>
          </Widget>
        </div>
        {!!categoryMappingWithTheSkills ? (
          <div className="flex-item">
            <Widget title={t1('the_difficulty_of_questions_by_skill')}>
              <WidgetDifficultyOfQuestions
                groupBy="skill"
                questionBanks={questionBanks}
              />
            </Widget>
          </div>
        ) : (
          [
            <div className="flex-item">
              <Widget title={t1('the_difficulty_of_questions_by_category')}>
                <WidgetDifficultyOfQuestions
                  groupBy="category"
                  questionBanks={questionBanks}
                />
              </Widget>
            </div>,
            <div className="flex-item">
              <Widget title={t1('question_number_by_type_group_by_category')}>
                <WidgetTypeOfQuestions questionBanks={questionBanks} />
              </Widget>
            </div>,
          ]
        )}
      </div>
    );
  }
}

export default ExamTemplateDashboard;
