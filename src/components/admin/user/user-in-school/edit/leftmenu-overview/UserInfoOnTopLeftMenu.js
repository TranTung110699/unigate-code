import React, { Component } from 'react';
import { t1 } from 'translate';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import UserAvatar from '../avatar';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import { connect } from 'react-redux';
import './style.scss';

const style = {
  wordWrap: 'break-word',
};

class UserInfoOnTopLeftMenu extends Component {
  render() {
    const { user, isK12, roleUser, isFeatureEnabled } = this.props;

    return (
      <div className="m-b-20">
        <div className="text-center m-b-10">
          <UserAvatar user={user} roleUser={roleUser} />
        </div>

        <div
          style={style}
          className={`p-l-20 row ${
            isFeatureEnabled(features.NEW_UI_JULY_2019)
              ? 'NEW_UI_JULY_2019-user-info-top-left'
              : ''
          }`}
        >
          {user.name && (
            <div className="row">
              {t1('user_name')}:<br />
              <strong>{user.name}</strong>
            </div>
          )}
          {user.lname && (
            <div className="row">
              {t1('username')}:<br />
              <strong>{user.lname}</strong>
            </div>
          )}
          {user.code && (
            <div className="row">
              {t1('user_code')}:<br />
              <strong>{user.code}</strong>
            </div>
          )}
          {user.mail && (
            <div className="row">
              {t1('mail')}:<br />
              <strong>{user.mail}</strong>
            </div>
          )}
          {user.phone && (
            <div className="row">
              {t1('phone')}:<br />
              <strong>{user.phone}</strong>
            </div>
          )}
        </div>

        {isK12 ? (
          <div>
            <div>
              {user && user.school && user.school.grade && (
                <span>
                  {t1('grade_of_school')}:<br />
                  {user.school.grade}
                </span>
              )}
            </div>
            <div>
              {user && user.school && user.school.grade_name && (
                <span>
                  {t1('grade_name_of_school')}: <br />
                  {user.school.grade_name}
                </span>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect()(
  withSchoolConfigs(withFeatureFlags()(UserInfoOnTopLeftMenu)),
);
