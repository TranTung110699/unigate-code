import React from 'react';
import PropTypes from 'prop-types';

class FeeTransactions extends React.Component {
  render() {
    const { className } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div className={componentClassName}>
        <h1>FeeTransactions</h1>
      </div>
    );
  }
}

FeeTransactions.propTypes = {
  className: PropTypes.string,
};

FeeTransactions.defaultProps = {
  className: '',
};

export default FeeTransactions;
