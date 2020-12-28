import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Request from 'common/network/http/Request';
import actions from 'actions/node/creators';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import { RIEInput } from 'riek';
import {
  change,
  Field,
  getFormValues,
  propTypes as reduxFormPropTypes,
  reduxForm,
} from 'redux-form';
import TextField from './TextField';
import './Editable.scss';

class Editable extends React.Component {
  popoverAnchorOrigin = { horizontal: 'left', vertical: 'bottom' };
  popoverTargetOrigin = { horizontal: 'left', vertical: 'top' };

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      label: null,
    };
  }

  componentWillMount() {
    this.setLabelEditer(this.props.initialValue);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps &&
      nextProps.initialValue &&
      nextProps.initialValue !== this.props.initialValue
    ) {
      this.setLabelEditer(nextProps.initialValue);
    }
  }

  setLabelEditer = (value) => {
    const { maxLabelLength } = this.props;
    const initialValue = typeof value !== 'undefined' ? value : '...';
    let label = this.props.label || initialValue.toString();
    if (maxLabelLength && label.length > maxLabelLength) {
      label = `${label.slice(0, maxLabelLength)}...`;
    }
    this.setState({ label });
  };

  handleOnKeyDown = (event) => {
    switch (event.key) {
      case 'Enter': {
        if (!event.shiftKey) {
          event.preventDefault();
          this.handleSaveValue();
        }
        break;
      }
      default: {
        break;
      }
    }
  };

  handleStartEditing = (event) => {
    const { form, dispatch, name, initialValue } = this.props;
    this.setState(
      {
        isEditing: true,
        anchorEl: event.currentTarget,
      },
      () => {
        dispatch(change(form, name, initialValue));
      },
    );
  };

  handleCancelEditing = (updateSuccess = false) => {
    if (!updateSuccess) {
      const { initialValue } = this.props;
      this.setLabelEditer(initialValue);
    }
    this.setState({
      isEditing: false,
    });
  };

  handleSubmit = (event) => {
    const { formValue, url, dispatch, name } = this.props;
    Request.post(url, formValue).then((res) => {
      if (res.success) {
        this.setLabelEditer(formValue[name]);
        this.handleCancelEditing(true);
        if (
          this.props.onRequestSuccessful &&
          typeof this.props.onRequestSuccessful == 'function'
        ) {
          this.props.onRequestSuccessful(formValue);
        }
      }
      dispatch(actions.snackbar(true, res.message));
    });
  };

  handleSaveValue = (event) => {
    const { url, handleSubmit, invalid } = this.props;
    if (invalid) {
      return;
    }
    if (url) {
      this.handleSubmit(event);
      return;
    } else if (handleSubmit) {
      this.props.handleSubmit(event);
    }
    this.handleCancelEditing();
  };

  render() {
    // TODO: fix api, text align left, no auto upper-case, saga->accept API with ID/Name
    const { name, invalid, type, disabled, inputInline } = this.props;
    const { isEditing, anchorEl, label } = this.state;

    if (inputInline) {
      return <RIEInput {...this.props} />;
    }

    return (
      <span
        className={`Editable ${disabled ? 'Editable--disabled' : ''} ${this
          .props.className || ''}`}
      >
        {disabled ? (
          <span
            name={name}
            title={this.props.title}
            className="Editable__anchor Editable__anchor--disabled"
          >
            {label}
          </span>
        ) : (
          <a
            href="javascript:void(0)"
            onClick={this.handleStartEditing}
            name={name}
            className="Editable__anchor"
            title={this.props.title}
          >
            {label}
          </a>
        )}
        <Popover
          className="Editable__popover"
          open={isEditing}
          anchorEl={anchorEl}
          anchorOrigin={this.popoverAnchorOrigin}
          targetOrigin={this.popoverTargetOrigin}
          onRequestClose={this.handleCancelEditing}
        >
          <Field
            component={TextField}
            multiLine={type !== 'number'}
            type={type}
            name={name}
            onKeyDown={this.handleOnKeyDown}
          />
          <div className="Editable__action">
            <IconButton
              disabled={invalid}
              iconClassName="mi mi-done"
              onClick={this.handleSaveValue}
            />
            <IconButton
              iconClassName="mi mi-clear"
              onClick={this.handleCancelEditing}
            />
          </div>
        </Popover>
      </span>
    );
  }
}

Editable.propTypes = {
  ...reduxFormPropTypes,
  inputInline: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

function mapStateToProps(state, props) {
  const { form, url } = props;
  let formValue = [];
  if (url) {
    const editableFormValueSelector = getFormValues(form);
    formValue = editableFormValueSelector(state) || [];
  }
  const isEditing = state.handleEditable.isEditing || false;
  return {
    isEditing,
    formValue,
  };
}

Editable.defaultPropos = {
  maxLabelLength: 10,
  inputInline: false,
};

export default connect(mapStateToProps)(
  reduxForm({
    form: 'editable',
  })(Editable),
);
