import React from 'react';
import VarDump from 'components/common/VarDump';
import { getFormValues } from 'redux-form'; // ES6
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import get from 'lodash.get';

class FooSchemaFormLayout extends React.PureComponent {
  render() {
    const {
      groups,
      groupsMetadata,
      // isTesting,
      readOnly,
      hideSubmitButton,
    } = this.props;
    const { formValues, formErrors } = this.props;

    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    const dumpHeight = '600px';
    const style = {
      height: dumpHeight,
      maxHeight: dumpHeight,
      overflowY: 'scroll',
    };

    const controlsHeight = '400px';
    const controlsStyle = {
      height: controlsHeight,
      maxHeight: controlsHeight,
      overflowY: 'scroll',
    };

    const showDump = formValues && formValues.show_vardump;

    const otherGroups = ['select_image', 'controls', 'target_group', 'dump'];

    return (
      <div className="row">
        {showDump && (
          <div className="col-md-3">
            <div style={style}>
              {formValues.show_vardump && <VarDump data={formValues} />}
            </div>
          </div>
        )}

        <div className={`col-md-${showDump ? '6' : '9'}`}>
          {groupsMetadata.map((g) => {
            return !otherGroups.includes(g.id) ? groups[g.id] : '';
          })}

          {groups.select_image}
        </div>

        <div className="col-md-3">
          {formValues && formValues.show_errors && (
            <div>
              Errors
              <VarDump data={formErrors} />
            </div>
          )}

          {!hideSubmitButton && submitButton}
          {groups.dump}
          <div style={controlsStyle}>{groups.controls}</div>
        </div>
      </div>
    );
  }
}

const formValuesSelector = (state, props) => getFormValues(props.formid)(state);
const formErrorsSelector = (state, props) =>
  get(state, `form.${props.formid}.syncErrors`);

const schemaFormSelector = () =>
  createSelector(
    formValuesSelector,
    formErrorsSelector,
    (formValues, formErrors) => ({
      formValues,
      formErrors,
    }),
  );

const mapStateToProps = () => {
  const getState = schemaFormSelector();
  return (state, props) => getState(state, props);
};

export default connect(mapStateToProps)(FooSchemaFormLayout);

// export default Left;
