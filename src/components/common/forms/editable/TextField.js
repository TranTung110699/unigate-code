import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class TextFieldEditable extends React.Component {
  cssClass = 'Editable-text-field';

  componentDidMount() {
    this.textInput.focus();
  }

  render() {
    const {
      className,
      input,
      label,
      meta: { touched, error },
      ...custom
    } = this.props;
    return (
      <TextField
        className={`${className || ''} ${this.cssClass}`}
        hintText={label}
        ref={(textInput) => {
          this.textInput = textInput;
        }}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    );
  }
}

TextFieldEditable.propTypes = {
  className: PropTypes.string,
};

TextFieldEditable.defaultProps = {
  className: '',
};

export default TextFieldEditable;
