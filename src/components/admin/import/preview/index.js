/* eslint-disable no-undef,quotes,react/prop-types,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import sagaActions from 'actions/saga-creators';
import { getThemeConfig } from 'utils/selectors';
import NodeNew from 'components/admin/node/new';
import Tabs from 'components/common/tabs';
import Paper from 'material-ui/Paper';
import RaisedButton from 'components/common/mui/RaisedButton';
import 'components/admin/import/styles/import.scss';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 1,
    };
  }

  getExtraForm = () => {
    const {
      metadata,
      formid,
      showHidePagination,
      requestSuccessful,
      confirmForm,
      // TODO WTF: why validate_organization here?????
      validate_organization,
      validate_job_position,
      validate_skills,
      onlyPreviewScreen,
      confirmImportUrl,
      confirmImportParams,
    } = this.props;

    showHidePagination(onlyPreviewScreen);

    const submitLabels = {
      submitting: confirmForm.buttonTitle,
      default: confirmForm.buttonTitle,
    };

    let hiddenFields = Object.assign(
      { id: metadata.import_id },
      confirmImportParams || {},
    );

    // when importing questions inside an exercise, the exercise_iid is sent along
    // when importing questions inside a template, the template iid is sent along
    if (confirmForm.hiddenFields)
      // exercise_iid or exam_template
      hiddenFields = Object.assign(hiddenFields, confirmForm.hiddenFields);

    return (
      <div>
        <NodeNew
          title={confirmForm.title}
          formid={formid}
          schema={confirmForm.schema}
          onlyPreviewScreen={onlyPreviewScreen}
          node={metadata}
          submitLabels={submitLabels}
          alternativeApi={confirmImportUrl || confirmForm.apiUrl}
          hiddenFields={hiddenFields}
          confirmImportParams={confirmImportParams}
          requestSuccessful={requestSuccessful}
          hideSubmitButton={metadata.wrong}
          params={{
            validateOrganization: validate_organization,
            validateJobPosition: validate_job_position,
            validateSkills: validate_skills,
          }}
        />
      </div>
    );
  };

  handleClick = () => {
    const {
      dispatch,
      metadata,
      confirmImportUrl,
      confirmImportParams,
    } = this.props;
    const params = Object.assign(
      { id: metadata.import_id },
      confirmImportParams,
    );

    dispatch(sagaActions.confirmImportDataRequest(confirmImportUrl, params));
  };

  render() {
    const {
      metadata,
      renderResult,
      showHidePagination,
      onlyPreviewScreen,
    } = this.props;

    return (
      <div>
        <div>
          {metadata.wrong > 0 ? (
            <h4 className="error">
              {t1('import_file_has_error,_please_correct_the_file_and_retry')}
            </h4>
          ) : null}
          <div>
            {metadata.wrong === 0 ? (
              <div>
                {t1('number_of_records')}:{' '}
                <b style={{ color: 'green' }}>{metadata.total}</b>
              </div>
            ) : (
              <div>
                {t1('number_of_records')}: <b>{metadata.total}</b>.{' '}
                {t1('wrong_format')}:{' '}
                <b style={{ color: 'red' }}>{metadata.wrong}</b>
              </div>
            )}
          </div>
        </div>

        {onlyPreviewScreen ? (
          <div>
            <div className="m-t-10 m-b-10">{this.getExtraForm()}</div>
            {renderResult(this.props)}
          </div>
        ) : (
          <div className="import-tab">
            <Paper style={{ width: '100%' }}>
              <Tabs
                tabs={[
                  {
                    label: t1('import'),
                    content: this.getExtraForm(),
                  },
                  {
                    label: t1('preview'),
                    content: () => {
                      showHidePagination(true);
                      return renderResult(this.props);
                    },
                  },
                ]}
              />
            </Paper>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const importQuestions = state.domainInfo.conf.import_questions || [];

  return {
    themeConfig: getThemeConfig(state),
    form: state.form,
    validate_organization: importQuestions.includes('validate_organization'),
    validate_job_position: importQuestions.includes('validate_job_position'),
    validate_skills: importQuestions.includes('validate_skills'),
  };
}

export default connect(mapStateToProps)(Results);
