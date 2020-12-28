import React from 'react';
import PropTypes from 'prop-types';

const addPrefix = (InputText) => {
  class WrappedInputText extends React.Component {
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

    /**
     * Handle change for input text, number, phone, password
     *
     * @param eventOrValue (= value if type of input is number (InputNumber), = event if input is not number (something like phone, password, ..) )
     */
    handleChange = (eventOrValue) => {
      const { prefix, onChange, type } = this.props;

      const newValue =
        type === 'number'
          ? eventOrValue
          : eventOrValue && eventOrValue.target && eventOrValue.target.value;

      if (typeof onChange === 'function') {
        onChange(this.getValueAfterAddingPrefix(prefix, newValue));
      }
    };

    render() {
      return <InputText {...this.props} onChange={this.handleChange} />;
    }
  }

  WrappedInputText.propTypes = {
    onChange: PropTypes.func,
    prefix: PropTypes.string,
    value: PropTypes.string,
  };

  WrappedInputText.defaultProps = {
    onChange: null,
    prefix: '',
    value: '',
  };

  return WrappedInputText;
};

export default addPrefix;
