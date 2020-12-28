import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import { abacRoleTypes } from 'configs/constants';
import RoleEditor from 'components/admin/user-abac-role/role-editor';
import Perm from 'common/utils/Perm';
import { userPreviewLink } from '../../utils';

class UserInfo extends Component {
  render() {
    const { user, domain } = this.props;
    const isTrainer = Perm.hasPerm('staff', domain, user);

    if (!isTrainer) return <div>{t1('user_is_not_yet_a_training_staff')}</div>;

    return (
      <div>
        {user.organizations && user.organizations.length
          ? user.organizations.map((org) => {
              return (
                <div key={`role-editor-${user.iid}-${org.iid}`}>
                  <div>
                    <b>{org.name}</b>
                  </div>
                  <RoleEditor
                    appliedTarget={org}
                    type={abacRoleTypes.SCHOOL}
                    user={user}
                    editTile={t1('edit_organizational_roles')}
                  />
                </div>
              );
            })
          : t1('user_is_not_attached_to_any_organizations_yet')}

        <br />
        <Link
          to={userPreviewLink(user, 'teacher', 'teacher-roles')}
          title={t1(
            'view_all_roles_in_syllabuses,_courses,_group,_or_contests',
          )}
        >
          <b>{t1('view_all_teacher_roles')}</b>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const domainInfo = state.domainInfo;
  return {
    domain: domainInfo && domainInfo.domain,
  };
};

export default connect(mapStateToProps)(UserInfo);
