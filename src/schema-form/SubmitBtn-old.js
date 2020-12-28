import React from 'react';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import { connect } from 'react-redux';
import {
  getFormMeta,
  getFormSubmitErrors,
  getFormSyncErrors,
  getFormValues,
  isSubmitting,
} from 'redux-form'; // ES6
// ES6
import lodashGet from 'lodash.get';
import RaisedButton from 'components/common/mui/RaisedButton';

class SubmitBtn extends React.PureComponent {
  divStyle = { color: 'red' };

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

    const icon = isSearch ? 'search' : 'send';

    const btn = onSubmit ? (
      <RaisedButton
        className="mui-button mui-button--primary"
        primary
        disabled={submitting || doesAnyTouchedFieldHaveError}
        label={label}
        onClick={this.handleClick}
        icon={<Icon icon={icon} />}
      />
    ) : (
      <RaisedButton
        className="mui-button mui-button--primary"
        primary
        disabled={submitting || doesAnyTouchedFieldHaveError}
        label={label}
        type="submit"
        icon={<Icon icon={icon} />}
      />
    );

    return (
      <div className="ui-form-control">
        {!notShowErrorMessage &&
          (errorMessage || doesAnyTouchedFieldHaveError) && (
            <div style={this.divStyle}>
              * {errorMessage || t1('please_check_form_errors')}
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

export default connect(mapStateToProps)(SubmitBtn);
