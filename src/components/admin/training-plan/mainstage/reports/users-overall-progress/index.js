import React from 'react';
import PropTypes from 'prop-types';
import SearchMembers from 'components/admin/enrolment-plan/mainstage/members/search';

class UsersOverallProgress extends React.PureComponent {
  render() {
    const { className, node } = this.props;
    // const componentClassName = `${className || ''}`;

    const hiddenFields = {
      usersOverallProgress: 1,
    };

    return (
      <SearchMembers
        trainingPlan={node}
        hiddenFields={hiddenFields}
        usersOverallProgress
      />
    );
  }
}

UsersOverallProgress.propTypes = {
  className: PropTypes.string,
};

UsersOverallProgress.defaultProps = {
  className: '',
};

export default UsersOverallProgress;
