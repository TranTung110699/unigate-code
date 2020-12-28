import React from 'react';
import PropTypes from 'prop-types';
import UpdateForm from '../../new/Form';

class GoalInfo extends React.Component {
  cssClass = 'admin-goal-info';

  render() {
    const { className, node } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <UpdateForm
          mode="edit"
          node={node}
          alternativeApi="/cost-manage/update"
          formid="edit_cost"
        />
      </div>
    );
  }
}

GoalInfo.propTypes = {
  className: PropTypes.string,
};

GoalInfo.defaultProps = {
  className: '',
};

export default GoalInfo;
