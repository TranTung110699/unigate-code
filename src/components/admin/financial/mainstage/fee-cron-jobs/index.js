import React from 'react';
import PropTypes from 'prop-types';

class FeeCronJobs extends React.Component {
  render() {
    const { className } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div className={componentClassName}>
        <h1>FeeCronJobs</h1>
      </div>
    );
  }
}

FeeCronJobs.propTypes = {
  className: PropTypes.string,
};

FeeCronJobs.defaultProps = {
  className: '',
};

export default FeeCronJobs;
