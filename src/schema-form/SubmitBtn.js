import React from 'react';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import {
  getFormMeta,
  getFormSubmitErrors,
  getFormSyncErrors,
  getFormValues,
  isSubmitting,
} from 'redux-form';
import lodashGet from 'lodash.get';
import Button from 'antd/lib/button';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import NewButton from 'components/common/primary-button';
import Icon from 'antd/lib/icon';

class SubmitBtn extends React.PureComponent {
  divStyle = { color: 'red' };
  ulStyle = {
    listStyleType: 'none',
  };

  handleClick = () => {
    const { onSubmit, values, params } = this.props;
    if (onSubmit) {
      onSubmit(values, params);
    }
  };

  render() {
    const {
      submitting,
      mode,
      syncErrors,
      submitErrors,
      errorMessage,
      controls,
      onSubmit,
      notShowErrorMessage,
      labels,
      isSearch,
      formMeta,
      className,
      isFeatureEnabled,
      oldButton,
    } = this.props;

    let label;

    if (submitting) {
      label =
        labels && labels.submitting ? labels.submitting : t1('working...');
    } else {
      if (this.props.label) label = this.props.label;
      else if (labels && labels.default) label = labels.default;
      else if (mode === 'new') {
        label = labels && labels.new ? labels.new : t1('create');
      } else {
        label = labels && labels.edit ? labels.edit : t1('update');
      }
    }

    const doesAnyTouchedFieldHaveSyncError =
      syncErrors &&
      Object.keys(syncErrors).some((keyThatHasSyncError) =>
        lodashGet(formMeta, `${keyThatHasSyncError}.touched`),
      );

    const doesAnyFieldHaveSubmitError =
      submitErrors &&
      Object.keys(submitErrors).some((keyThatHasSubmitError) =>
        lodashGet(formMeta, keyThatHasSubmitError),
      );

    const doesAnyTouchedFieldHaveError =
      doesAnyTouchedFieldHaveSyncError || doesAnyFieldHaveSubmitError;

    const icon = isSearch ? 'search' : 'check-circle';

    const btn =
      isFeatureEnabled(features.NEW_UI_JULY_2019) && !oldButton ? (
        onSubmit ? (
          <NewButton
            primary
            disabled={submitting || doesAnyTouchedFieldHaveError}
            label={label}
            onClick={this.handleClick}
            icon={<Icon type={icon} />}
          />
        ) : (
          <NewButton
            primary
            loading={submitting}
            disabled={submitting || doesAnyTouchedFieldHaveError}
            label={label}
            type="submit"
            icon={<Icon type={icon} />}
            htmlType="submit"
          />
        )
      ) : (
        <Button
          type="primary"
          icon={icon}
          loading={submitting}
          disabled={submitting || doesAnyTouchedFieldHaveError}
          onClick={this.handleClick}
          htmlType={!onSubmit ? 'submit' : undefined}
          className={`${className} ant-submit-btn`}
        >
          {label}
        </Button>
      );

    return (
      <div className="ui-form-control">
        {!notShowErrorMessage &&
          (errorMessage || doesAnyTouchedFieldHaveError) && (
            <div style={this.divStyle}>
              {Array.isArray(errorMessage) ? (
                <ul style={this.ulStyle}>
                  {errorMessage.map((e, idx) => (
                    <li key={`err-${idx}`}>{e}</li>
                  ))}
                </ul>
              ) : (
                <span>* {errorMessage || t1('please_check_form_errors')}</span>
              )}
            </div>
          )}

        {(!controls || !controls.length) && btn}
        {/* put btn in a ul list */}
        {controls && controls.length && (
          <ul className="item-control">
            <li className="item">{btn}</li>
            {controls &&
              controls.map((control, index) => (
                <li className="item" key={`controls-${index}`}>
                  {control}
                </li>
              ))}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { formid } = props;
  const syncErrors = getFormSyncErrors(formid)(state);
  return {
    values: getFormValues(formid)(state),
    submitting: isSubmitting(formid)(state),
    syncErrors,
    errorMessage: state.form[formid] && state.form[formid].error,
    submitErrors: getFormSubmitErrors(formid)(state),
    formMeta: getFormMeta(formid)(state),
  };
};

export default connect(mapStateToProps)(withFeatureFlags()(SubmitBtn));
