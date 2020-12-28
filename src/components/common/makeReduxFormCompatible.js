import React from 'react';
import PropTypes from 'prop-types';

const makeReduxFormCompatible = ({ valueProp }) => (Component) => {
  class Wrapper extends React.Component {
    render() {
      const {
        errorText,
        onChange,
        onBlur,
        onDragStart,
        onDrop,
        onFocus,
        input,
        meta,
        ...custom
      } = this.props;

      let realValueProp = valueProp || 'value';

      let realValue = this.props[realValueProp];
      realValue =
        typeof realValue !== 'undefined' ? realValue : input && input.value;

      let configurableProps = {
        [realValueProp]: realValue,
      };

      return (
        <Component
          {...custom}
          {...configurableProps}
          errorText={errorText || (meta && meta.touched && meta.error)}
          onChange={onChange || (input && input.onChange)}
          onBlur={onBlur || (input && input.onBlur)}
          onDragStart={onDragStart || (input && input.onDragStart)}
          onDrop={onDrop || (input && input.onDrop)}
          onFocus={onFocus || (input && input.onFocus)}
        />
      );
    }
  }

  Wrapper.propTypes = {
    errorText: PropTypes.string,
    input: PropTypes.shape(),
    meta: PropTypes.shape(),
    onChange: PropTypes.func,
    selections: PropTypes.arrayOf(PropTypes.any),
    treeData: PropTypes.arrayOf(PropTypes.shape()),
  };

  Wrapper.defaultProps = {
    errorText: '',
    input: null,
    meta: null,
    onChange: null,
    selections: null,
    treeData: [],
  };

  return Wrapper;
};

export default makeReduxFormCompatible;
