import React, { Component } from 'react';
import SchemaForm from 'schema-form/Form';
import schema from './schema';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Warning from 'components/common/Warning';
import { portals } from 'components/common/portal';

const Form = (props) => {
  const [hideSubmitButton, setHideSubmitButton] = React.useState(false);

  return (
    <div>
      <SchemaForm
        {...props}
        hideSubmitButton={props.hideSubmitButton || hideSubmitButton}
        setHideSubmitButton={setHideSubmitButton}
        schema={schema}
        ntype={'take'}
        mode={'new'}
        resetForm={false}
        submitLabels={{ new: t1('submit_open_ended_answer') }}
        oldSubmitButton
      />
      <div id={portals.MARKING_ASSESSMENT_RESULT} />
      {!props.isSp1 && (
        <Warning>
          {t1(
            'before_moving_on_to_another_question_you_must_submit_your_answer_for_this_question_by_clicking_the_button_below',
          )}
        </Warning>
      )}
    </div>
  );
};

export default connect()(Form);
