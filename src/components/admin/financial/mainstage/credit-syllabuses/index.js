import React from 'react';
import PropTypes from 'prop-types';

class CreditSyllabuses extends React.Component {
  render() {
    const { className } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div className={componentClassName}>
        <h1>CreditSyllabuses</h1>
      </div>
    );
  }
}

CreditSyllabuses.propTypes = {
  className: PropTypes.string,
};

CreditSyllabuses.defaultProps = {
  className: '',
};

export default CreditSyllabuses;
