import React from 'react';
import PropTypes from 'prop-types';
import UpdateForm from '../../new/Form';

class JobPositionInfo extends React.Component {
  cssClass = 'admin-job-position-info';

  render() {
    const { className, node } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <UpdateForm
          mode="edit"
          node={node}
          step="job_position"
          alternativeApi="/category/index/update?type=job_position"
          formid="edit_job_position"
        />
      </div>
    );
  }
}

JobPositionInfo.propTypes = {
  className: PropTypes.string,
};

JobPositionInfo.defaultProps = {
  className: '',
};

export default JobPositionInfo;
