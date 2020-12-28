import React, { Component } from 'react';
import { connect } from 'react-redux';
import CacheOrganizationDataForSearching from './CacheOrganizationDataForSearching';
import FixOrganizationPids from './FixOrganizationPids';
import RemoveWrongUserOrganizationsRoles from './RemoveWrongUserOrganizationsRoles';
import SyncUserRoleDataInRedisWithDB from './SyncUserRoleDataInRedisWithDB';
import RemoveCourseSinvitesInATimestamp from './RemoveCourseSinvitesInATimestamp';
import RemoveUsersFromAllCourses from './RemoveUsersFromAllCourses';

class Layout extends Component {
  render() {
    return (
      <div>
        <div className="white-background p-10">
          <CacheOrganizationDataForSearching />
        </div>
        <br />
        <div className="white-background p-10">
          <FixOrganizationPids />
        </div>
        <br />
        <div className="white-background p-10">
          <SyncUserRoleDataInRedisWithDB />
        </div>
        <br />
        <div className="white-background p-10">
          <RemoveWrongUserOrganizationsRoles />
        </div>
        <br />
        <div className="white-background p-10">
          <RemoveCourseSinvitesInATimestamp />
        </div>
        <br />
        <div className="white-background p-10">
          <RemoveUsersFromAllCourses />
        </div>
      </div>
    );
  }
}

export default connect()(Layout);
