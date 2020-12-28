import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import { t1 } from 'translate';
import DetailOnDialog from 'components/common/detail-on-dialog';
import RaisedButton from 'components/common/mui/RaisedButton';
import Icon from 'components/common/Icon';
import Warning from 'components/common/Warning';
import NodeNew from 'components/admin/node/new';
import { required } from 'common/validators';
import { getTimestampTheStartADay } from 'common/utils/Date';
import lodashGet from 'lodash.get';
import DatePicker from 'schema-form/elements/date-picker';

const createTakesFormSchema = {
  schema: (formid, values, step) => ({
    survey_date: {
      type: DatePicker,
      getStartDate: true,
      floatingLabelText: t1('feedback_for_date'),
      fullWidth: true,
      validate: [required()],
      defaultValue: getTimestampTheStartADay(),
    },
  }),
  ui: (step) => {
    return [
      {
        id: 'default',
        fields: ['survey_date'],
      },
    ];
  },
  layout: {
    new: '',
  },
};

const CreateSurveyTakesForm = ({
  formid = 'new_survey_take_for_feedback_users_in_group',
  params,
  requestSuccessful,
  searchFormId,
  surveyIid,
  group,
}) => (
  <div>
    {!surveyIid ? (
      <Warning>{t1('please_select_survey_first')}</Warning>
    ) : (
      <NodeNew
        schema={createTakesFormSchema}
        formid={formid}
        searchFormId={searchFormId}
        alternativeApi={sApiUrls.new_survey_take_for_feedback_users_in_group}
        hiddenFields={{
          survey_iid: surveyIid,
          group_iid: lodashGet(group, 'iid'),
        }}
        params={params}
        requestSuccessful={requestSuccessful}
      />
    )}
  </div>
);

class ButtonAddSurveyTakeToFeedbackGroupUsers extends React.Component {
  dialogOptionsProperties = () => ({
    handleClose: true,

    title: t1('create_new_feedback_for_users_of_group'),
    modal: true,
  });

  renderPreview = ({ showFull }) => (
    <RaisedButton
      primary
      name="submit"
      type="submit"
      icon={<Icon icon="plus" />}
      label={t1('create_new_feedback_for_users_of_group')}
      onClick={showFull}
    />
  );

  renderFull = ({ closeDialog }) => {
    const {
      node,
      surveyIid,
      group,
      requestSuccessful,
      searchFormId,
    } = this.props;
    return (
      <CreateSurveyTakesForm
        node={node}
        surveyIid={surveyIid}
        group={group}
        requestSuccessful={requestSuccessful}
        searchFormId={searchFormId}
      />
    );
  };

  render() {
    return (
      <DetailOnDialog
        {...this.props}
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
        dialogOptionsProperties={this.dialogOptionsProperties()}
      />
    );
  }
}

const mapStateToProps = (state, { searchFormId }) => {
  const selectedSurveyIidInSearchForm = formValueSelector(searchFormId)(
    state,
    'survey_iid',
  );
  return {
    surveyIid: selectedSurveyIidInSearchForm,
  };
};

export default connect(mapStateToProps)(
  ButtonAddSurveyTakeToFeedbackGroupUsers,
);
