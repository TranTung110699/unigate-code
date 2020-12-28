import React from 'react';
import get from 'lodash.get';
import { change } from 'redux-form';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';

class FormLayoutFreestyle extends React.PureComponent {
  constructor(props) {
    super(props);

    this.firstTimeLoading = true;
  }

  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };
  centerAlign = { textAlign: 'center' };
  paddingTop30px = { paddingTop: '30px' };

  observedFields = ['tpl_action', 'method', 'language'];

  getValueOf(field, props) {
    return get(props, ['formValues', field]);
  }

  areFilled(fields) {
    return fields.every((field) => this.getValueOf(field, this.props));
  }

  // Used to determine if there are any changes with the given fields in the form
  areChanged(fields, prevProps) {
    return fields.some(
      (field) =>
        this.getValueOf(field, this.props) !==
        this.getValueOf(field, prevProps),
    );
  }

  componentDidUpdate(prevProps) {
    const { formid, mode, dispatch } = this.props;

    if (mode === 'edit') {
      // Prevent loading default template when EDIT form is loaded for the first time
      if (this.firstTimeLoading) {
        this.firstTimeLoading = false;

        return;
      }
    }

    if (
      this.areFilled(this.observedFields) &&
      this.areChanged(this.observedFields, prevProps)
    ) {
      const searchParams = this.observedFields.map((field) =>
        this.getValueOf(field, this.props),
      );

      // Load default template
      dispatch(
        sagaActions.getDataRequest({
          url: apiUrls.default_message_template_search(...searchParams),
          keyState: 'message-template-default-content',
          executeOnSuccess: (data) => {
            dispatch(change(formid, 'content', data));
          },
        }),
      );

      // Load template params
      dispatch(
        sagaActions.getDataRequest({
          url: apiUrls.message_template_params_search(...searchParams),
          keyState: 'message-template-params',
          executeOnSuccess: (data) => {
            dispatch(change(formid, 'params', data));
          },
        }),
      );
    }
  }

  render() {
    const {
      mode,
      groups: {
        default: {
          fieldNames: {
            code,
            title,
            tpl_action: action,
            language,
            method,
            content,
            content_preview,
            params,
            status,
          },
        },
      },
      message,
      readOnly,
    } = this.props;

    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid elementGroup">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          <div className="col-md-3">{code}</div>
          <div className="col-md-6">{title}</div>
          <div className="col-md-3">{status}</div>
        </div>
        <div className="row">
          <div className="col-md-6">{action}</div>
          <div className="col-md-3">{language}</div>
          <div className="col-md-3">{method}</div>
        </div>
        {(this.areFilled(this.observedFields) || mode === 'preview') && (
          <div className="row">
            <div className="col-md-4">{params}</div>
            <div className="col-md-4">{content}</div>
            <div className="col-md-4">{content_preview}</div>
          </div>
        )}
        <div
          className="row"
          style={{ ...this.centerAlign, ...this.paddingTop30px }}
        >
          {submitButton}
        </div>
      </div>
    );
  }
}

export default FormLayoutFreestyle;
