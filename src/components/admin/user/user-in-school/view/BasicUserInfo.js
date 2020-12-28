import React, { Component } from 'react';
import { t1 } from 'translate';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';
import Positions from 'components/admin/group/edit/member/search-results/Positions';
import AcademicCategories from 'components/admin/group/common/AcademicCategories';

class BasicUserInfo extends Component {
  render() {
    const { user, hiddenItem } = this.props;

    return (
      <div className="break-word">
        {user.code && (
          <div>
            {t1('code')}: <b>{user.code}</b>
          </div>
        )}

        {user.name && (
          <div>
            {t1('name')}: <b>{user.name}</b>
          </div>
        )}

        {user.lname && (
          <div>
            {t1('login_name')}:{' '}
            <b>{user.original_lname ? user.original_lname : user.lname}</b>
          </div>
        )}

        {user.mail && (
          <div>
            {t1('email')}: <b>{user.mail}</b>
          </div>
        )}
        {user.phone && (
          <div>
            {t1('phone')}: <b>{user.phone}</b>
          </div>
        )}
        {user.nationality && (
          <div>
            {t1('nationality')}: <b>{user.nationality}</b>
          </div>
        )}
        {user.ethnicity && (
          <div>
            {t1('ethnicity')}: <b>{user.ethnicity}</b>
          </div>
        )}
        {user.address ? (
          <div>
            {t1('address')}: <b>{user.address}</b>
          </div>
        ) : null}

        {user &&
          user.__expand && [
            <div>
              {user.__expand &&
                user.__expand.user_organizations && [
                  <div className={'pull-left'}>
                    {t1('organizations')}
                    :&nbsp;
                  </div>,
                  <b>
                    <OrganizationsOrPhongBan
                      item={user}
                      attr={'user_organizations'}
                    />
                  </b>,
                ]}
            </div>,
            <div>
              {user.__expand &&
                user.__expand.phongbans && [
                  <div className={'pull-left'}>
                    {t1('phongban')}
                    :&nbsp;
                  </div>,
                  <div>
                    <b>
                      <OrganizationsOrPhongBan item={user} attr={'phongbans'} />
                    </b>
                  </div>,
                ]}
            </div>,
            <div>
              {user.__expand &&
                user.__expand.positions &&
                hiddenItem &&
                !hiddenItem.includes('positions') && [
                  <div className={'pull-left'}>
                    {t1('positions')}
                    :&nbsp;
                  </div>,
                  <b>
                    <Positions item={user} showEquivalentJobPositionSystem />
                  </b>,
                ]}
            </div>,
            <div>
              {user.__expand &&
                user.__expand.academic_categories && [
                  <div className={'pull-left'}>
                    {t1('academic_categories')}
                    :&nbsp;
                  </div>,
                  <b>
                    <AcademicCategories item={user} noLink />
                  </b>,
                ]}
            </div>,
          ]}
      </div>
    );
  }
}

export default BasicUserInfo;
