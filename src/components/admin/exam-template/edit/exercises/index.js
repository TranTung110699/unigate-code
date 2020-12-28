import React from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux';
import FlatButton from 'components/common/mui/NewButton';
import actions from 'actions/node/creators';
import { t1 } from 'translate';
import examTemplateSchema from '../../schema/form';
import examTemplateApiUrls from 'components/admin/exam-template/endpoints';
import NodeNew from 'components/admin/node/new';
import WidgetQuestion from 'components/admin/question-bank/edit/dashboard/DifficultyOfQuestions';
import Widget from 'components/common/Widget';
import { approveSwitch } from '../switch-controls';
import SwitchControls from 'components/common/SwitchControls';
import Card from 'antd/lib/card';

class ExamTemplateExercises extends React.Component {
  handleOnClick = () => {
    const { dispatch, node, categoryMappingWithTheSkills } = this.props;

    const contentDialog = (
      <div>
        <div className="flex-item">
          <Widget title={t1('the_difficulty_of_questions_by_category')}>
            <WidgetQuestion
              groupBy="category"
              questionBanks={get(node, 'question_banks')}
            />
          </Widget>
        </div>
        {categoryMappingWithTheSkills && (
          <div className="flex-item">
            <Widget title={t1('the_difficulty_of_questions_by_skill')}>
              <WidgetQuestion
                groupBy="skill"
                questionBanks={get(node, 'question_banks')}
              />
            </Widget>
          </div>
        )}
      </div>
    );

    const optionsProperties = {
      handleClose: true,

      title: t1('exam_template_bank_overview'),
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { node, categoryMappingWithTheSkills } = this.props;
    return (
      <Card
        title={
          <FlatButton
            onClick={() => {
              this.handleOnClick();
            }}
            label={t1('bank_overview')}
          />
        }
        extra={<SwitchControls node={node} items={[approveSwitch(node)]} />}
        size="small"
      >
        <NodeNew
          alternativeApi={examTemplateApiUrls.update_exercise_template}
          schema={examTemplateSchema}
          step="exercise_templates"
          mode="edit"
          node={node}
          resetForm
          hiddenFields={{
            iid: node.iid,
          }}
          categoryMappingWithTheSkills={categoryMappingWithTheSkills}
          formid={`edit_exercise_templates`}
        />
      </Card>
    );
  }
}

export default connect()(ExamTemplateExercises);
