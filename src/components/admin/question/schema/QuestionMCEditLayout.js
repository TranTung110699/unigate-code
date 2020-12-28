import React from 'react';
import getLodash from 'lodash.get';
import { t1 } from 'translate';
import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

class QuestionEdit extends React.PureComponent {
  render() {
    const { groups, isTesting, readOnly, hideSubmitButton } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div>
        <Row>
          <Card title={t1('multiple_choice_question_type')}>
            <div>{getLodash(groups, 'content.fieldNames.type')}</div>
            <div>{getLodash(groups, 'content.fieldNames.sub_type')}</div>
            <div>{getLodash(groups, 'content.fieldNames.tpl_type')}</div>
          </Card>
        </Row>

        <Row className="m-t-24" gutter={24}>
          <Col span={12}>
            <Card title={t1('question_content')}>
              <div>{getLodash(groups, 'content.fieldNames.content')}</div>
              <div>{getLodash(groups, 'media.fieldNames.audio')}</div>
              <div>{getLodash(groups, 'media.fieldNames.avatar')}</div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={t1('question_answer')}>
              <div>{getLodash(groups, '1.fieldNames.quick_options')}</div>
              <div>{getLodash(groups, '1.fieldNames.quick_text_options')}</div>
              <div>{getLodash(groups, '1.fieldNames.shufflable')}</div>
              <div>{getLodash(groups, '1.fieldNames.answers2')}</div>
            </Card>
          </Col>
        </Row>
        {getLodash(groups, 'feedback') && (
          <Row className="m-t-24">
            <Card title={t1('feedbacks')}>
              <div className="col-md-6">
                {getLodash(groups, 'feedback.fieldNames.feedback_true')}
              </div>
              <div className="col-md-6">
                {getLodash(groups, 'feedback.fieldNames.feedback_false')}
              </div>
            </Card>
          </Row>
        )}
        <Row className="m-t-24">
          <Card title={t1('categorize_information')}>
            <div>
              {getLodash(groups, 'categorize_information.fieldNames.tags')}
            </div>
            <div>
              {getLodash(
                groups,
                'categorize_information.fieldNames.organizations',
              )}
            </div>
            <div>
              {getLodash(groups, 'categorize_information.fieldNames.skills')}
            </div>
            <div className="col-md-6">
              {getLodash(groups, 'categorize_information.fieldNames.positions')}
            </div>
            <div className="col-md-6">
              {getLodash(
                groups,
                'categorize_information.fieldNames.difficulty',
              )}
            </div>
          </Card>
        </Row>
        <Row className="m-t-24">
          <Card title={t1('display_template')}>
            <div>
              {getLodash(
                groups,
                'display_template.fieldNames.display_template',
              )}
            </div>
          </Card>
        </Row>
        <div className={'text-center'}>
          {!isTesting && !hideSubmitButton && submitButton}
        </div>
      </div>
    );
  }
}

export default QuestionEdit;
