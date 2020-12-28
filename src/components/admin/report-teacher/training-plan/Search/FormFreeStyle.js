import GlobalSurveyApplication from '../../../training-plan/mainstage/reports/global-survey-application';
import React from 'react';
import lodashGet from 'lodash.get';

export default (props) => {
  const [tpIid, setTpIid] = React.useState('');
  const [epIid, setEpIid] = React.useState('');

  const { groups, formValues } = props;
  let { submitButton } = props;
  React.useEffect(
    () => {
      setTpIid(lodashGet(formValues, 'item_iid', ''));
      setEpIid(lodashGet(formValues, 'enrolment_plan_iid', ''));
    },
    [formValues, setTpIid, setEpIid],
  );
  return (
    <>
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className="col-md-12">{groups.id.fieldNames.item_iid}</div>
        </div>
        {tpIid && (
          <GlobalSurveyApplication
            trainingPlan={{
              iid: tpIid,
              ntype: 'training_plan',
            }}
            enrolmentPlan={{
              iid: epIid,
              ntype: 'enrolment_plan',
            }}
            hideSearchForm
          />
        )}
      </div>
    </>
  );
};
