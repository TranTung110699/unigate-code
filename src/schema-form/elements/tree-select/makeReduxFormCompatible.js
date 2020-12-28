import React from 'react';
import PropTypes from 'prop-types';

const makeReduxFormCompatible = (TreeSelect) => {
  class TreeSelectWrapper extends React.Component {
    render() {
      const {
        errorText,
        onChange,
        onBlur,
        onDragStart,
        onDrop,
        onFocus,
        selections,
        input,
        meta,
        ...custom
      } = this.props;

      return (
        <TreeSelect
          {...custom}
          errorText={errorText || (meta && meta.touched && meta.error)}
          selections={selections || (input && input.value)}
          onChange={onChange || (input && input.onChange)}
          onBlur={onBlur || (input && input.onBlur)}
          onDragStart={onDragStart || (input && input.onDragStart)}
          onDrop={onDrop || (input && input.onDrop)}
          onFocus={onFocus || (input && input.onFocus)}
        />
      );
    }
  }

  TreeSelectWrapper.propTypes = {
    errorText: PropTypes.string,
    input: PropTypes.shape(),
    meta: PropTypes.shape(),
    onChange: PropTypes.func,
    selections: PropTypes.arrayOf(PropTypes.any),
    treeData: PropTypes.arrayOf(PropTypes.shape()),
  };

  TreeSelectWrapper.defaultProps = {
    errorText: '',
    input: null,
    meta: null,
    onChange: null,
    selections: null,
    treeData: [],
  };

  return TreeSelectWrapper;
};

export default makeReduxFormCompatible;
