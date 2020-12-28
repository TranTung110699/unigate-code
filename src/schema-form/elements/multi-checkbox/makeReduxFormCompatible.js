import React from 'react';
import PropTypes from 'prop-types';

const makeReduxFormCompatible = (MultiCheckbox) => {
  class MultiCheckboxWrapper extends React.Component {
    render() {
      const { errorText, onChange, value, input, meta, ...custom } = this.props;

      return (
        <MultiCheckbox
          {...custom}
          errorText={errorText || (meta && meta.touched && meta.error)}
          value={value || (input && input.value)}
          onChange={onChange || (input && input.onChange)}
        />
      );
    }
  }

  MultiCheckboxWrapper.propTypes = {
    errorText: PropTypes.string,
    input: PropTypes.shape(),
    meta: PropTypes.shape(),
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.any),
    treeData: PropTypes.arrayOf(PropTypes.shape()),
  };

  MultiCheckboxWrapper.defaultProps = {
    errorText: '',
    input: null,
    meta: null,
    onChange: null,
    value: null,
    treeData: [],
  };

  return MultiCheckboxWrapper;
};

export default makeReduxFormCompatible;
