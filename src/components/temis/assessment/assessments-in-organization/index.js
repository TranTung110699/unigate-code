import React, { Component } from 'react';
import Widget from 'components/common/Widget';
import { t1 } from 'translate';
import ProfileList from './search';
import Overview from './overview';
import Warning from 'components/common/Warning';

class AssessmentsInOrganization extends Component {
  render() {
    return (
      <div>
        <Widget title={t1('overview')}>
          <Overview />
        </Widget>
        <Widget title={t1('list_of_assessments_in_my_organization')}>
          <ProfileList />
        </Widget>
      </div>
    );
  }
}

export default AssessmentsInOrganization;
