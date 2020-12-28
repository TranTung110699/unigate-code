import React, { Component } from 'react';
import { connect } from 'react-redux';

import { t1 } from 'translate';
import actions from 'actions/node/creators';
import FlatButton from 'components/common/mui/FlatButton';
import questionTypesOptions from 'components/admin/question/schema/question-types';

import EditForm from './edit/Form';

// import RaisedButton from 'components/common/mui/RaisedButton';

const dialogKey = 'edit_school';

class Block extends Component {
  handleEditItem = (item, type) => {
    const { dispatch } = this.props;

    const contentDialog = (
      <EditForm
        dialogKey={dialogKey}
        node={item}
        title={t1(`edit_${type}`)}
        ntype="school"
        mode="edit"
        step={type}
        className={`system_school_search-${type}`}
        searchFormId="system_school_search"
        formid="edit_school"
      />
    );

    const optionsProperties = {
      handleClose: true,
      modal: true,
    };

    dispatch(
      actions.handleOpenDialog({ contentDialog, optionsProperties }, dialogKey),
    );
  };

  displayQuestionsEnableLabel = (questionsEnable) => {
    const questionsEnableLabel = [];
    Object.keys(questionsEnable).forEach((key) => {
      const questionTypeObject = questionTypesOptions.find(
        (questionType) => questionType.value === parseInt(key, 10),
      );

      if (key && questionTypeObject && questionTypeObject.label) {
        questionsEnableLabel[key] = questionTypeObject.label;
      }
    });

    return questionsEnableLabel;
  };

  enhancedItems = (items, menu) =>
    [
      'exercise_questions_enable',
      'exam_questions_enable',
      'survey_questions_enable',
    ].includes(menu)
      ? this.displayQuestionsEnableLabel(items)
      : items;

  renderConfigItemLabel = (item, menu) => {
    let str;

    if (
      ['org_types', 'course_deadline_reminder_settings'].indexOf(menu) !== -1 &&
      item[menu]
    ) {
      const items = [];
      item[menu].forEach((itemValue) => {
        if (itemValue && itemValue.name) {
          items.push(t1(itemValue.name));
        }
      });
      str = items.join(', ');
    } else if (item.approval_flow && menu === 'approval_flow') {
      const codes = item.approval_flow.map((approvalFlow) => approvalFlow.code);
      str = codes.join(', ');
    } else if (item[menu] && item[menu].constructor === Array) {
      str = this.enhancedItems(item[menu], menu).join(', ');
    } else if (item[menu] && item[menu].constructor === String) {
      str = this.enhancedItems(item[menu], menu)
        .split()
        .join(', ');
    } else if (menu === 'theme_layout' && item.theme && item.theme.layout) {
      str = item.theme.layout;
    } else {
      str = t1('nothing_configured');
    }

    return str;
  };

  render() {
    const { item, menu } = this.props;
    return (
      <div>
        <b>{t1(menu)}</b>
        <div>
          {this.renderConfigItemLabel(item, menu)}
          <FlatButton
            name="update"
            onClick={() => this.handleEditItem(item, menu)}
            label={t1('edit')}
            primary
          />
        </div>
      </div>
    );
  }
}

export default connect()(Block);
