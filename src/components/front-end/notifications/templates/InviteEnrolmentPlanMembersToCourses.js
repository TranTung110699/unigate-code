import React, { Component } from 'react';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';

class InviteEnrolmentPlanMembersToCourses extends Component {
  render() {
    const { item } = this.props;

    return (
      <div key={`notification-${lodashGet(item.id)}`}>
        {t1('you_are_invited_to_learn')}:{' '}
        <b>{item && item.params && item.params.enrolmentPlan.name}</b>
      </div>
    );
  }
}

InviteEnrolmentPlanMembersToCourses.propTypes = {};

export default InviteEnrolmentPlanMembersToCourses;
