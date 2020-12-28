import React from 'react';
import PropTypes from 'prop-types';

class DashBoard extends React.Component {
  render() {
    const { className } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div className={componentClassName}>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

DashBoard.propTypes = {
  className: PropTypes.string,
};

DashBoard.defaultProps = {
  className: '',
};

export default DashBoard;
