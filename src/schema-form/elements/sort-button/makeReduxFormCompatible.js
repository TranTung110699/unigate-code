import React from 'react';
import PropTypes from 'prop-types';

const makeReduxFormCompatible = (SortButton) => {
  class Wrapped extends React.Component {
    cssClass = '';

    handleClick = (...params) => {
      const { input } = this.props;
      const sortOrder = input.value;
      const newSortOrder = sortOrder !== -1 ? -1 : 1;
      input.onChange(newSortOrder, ...params);
    };

    render() {
      const { className, input } = this.props;
      return (
        <SortButton
          {...input}
          onClick={this.handleClick}
          sortOrder={input.value}
        />
      );
    }
  }

  Wrapped.propTypes = {
    className: PropTypes.string,
  };

  Wrapped.defaultProps = {
    className: '',
  };

  return Wrapped;
};

export default makeReduxFormCompatible;
