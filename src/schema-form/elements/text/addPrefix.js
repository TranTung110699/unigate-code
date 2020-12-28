import React from 'react';
import PropTypes from 'prop-types';

const addPrefix = (TextField) => {
  class WrappedTextField extends React.Component {
    componentDidMount() {
      const { prefix, value, onChange } = this.props;
      if (typeof onChange === 'function') {
        const newValue = this.getValueAfterAddingPrefix(prefix, value);
        if (newValue !== value) {
          onChange(newValue);
        }
      }
    }

    getValueAfterAddingPrefix = (prefix, value) => {
      if (!prefix) {
        return value;
      }
      if (!value || prefix.includes(value)) {
        return prefix;
      }

      return value.includes(prefix) ? value : `${prefix}${value}`;
    };

    handleChange = (event, newValue) => {
      const { prefix, onChange } = this.props;
      if (typeof onChange === 'function') {
        onChange(this.getValueAfterAddingPrefix(prefix, newValue));
      }
    };

    render() {
      return <TextField {...this.props} onChange={this.handleChange} />;
    }
  }

  WrappedTextField.propTypes = {
    onChange: PropTypes.func,
    prefix: PropTypes.string,
    value: PropTypes.string,
  };

  WrappedTextField.defaultProps = {
    onChange: null,
    prefix: '',
    value: '',
  };

  return WrappedTextField;
};

export default addPrefix;
