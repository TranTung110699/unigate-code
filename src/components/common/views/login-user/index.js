import React from 'react';
import { connect } from 'react-redux';
import Icon from 'antd/lib/icon';
import Avatar from 'antd/lib/avatar';
import Popover from 'antd/lib/popover';
import lodashGet from 'lodash.get';
import { t, t1, t3 } from 'translate';
import { logout } from 'actions/auth';
import ActionSelect from 'components/common/select/ActionSelect';
import { enableWorkingMode as enableWorkingModeFunc } from 'common/conf';
import userLinks from 'routes/links/user';

import './stylesheet.scss';
import { Link } from 'react-router-dom';

class LoginUser extends React.Component {
  updateWorkingModeToStoreAndRedirectToAdmin(dispatch, workingMode) {
    // not really necessary as we always redirect to /admin anyway
    // dispatch(changeUserWorkingMode(workingMode));
    window.location.assign('/admin');
  }

  render() {
    const {
      dispatch,
      userInfo,
      enableWorkingMode,
      applicableWorkingModes,
    } = this.props;
    let selectWorkingMode;

    if (enableWorkingMode && applicableWorkingModes) {
      const dataSet = [];
      applicableWorkingModes.forEach((i) => {
        dataSet.push({
          value: i,
          label: t3(i),
        });
      });

      dataSet.push({
        value: '',
        label: t('all_the_roles'),
      });

      // TODO: what to do on success
      selectWorkingMode = (
        <div>
          {t1('select_working_mode')}
          <ActionSelect
            name="working_mode"
            value={userInfo && userInfo.working_mode}
            baseURL={`/user/update?id=${userInfo.id}&_sand_step=working_mode`}
            dataSet={dataSet}
            type="radio"
            handleChange={(result, value) => {
              this.updateWorkingModeToStoreAndRedirectToAdmin(dispatch, value);
            }}
          />
        </div>
      );
    }

    const content = userInfo.iid ? (
      <div>
        {selectWorkingMode && (
          <React.Fragment>
            {selectWorkingMode}
            <hr />
          </React.Fragment>
        )}
        <Link to={userLinks.update_profile_info}>{t1('profile')}</Link>
        <hr />
        <a
          onClick={() => {
            dispatch(logout());
          }}
        >
          {t1('sign_out')}
        </a>
      </div>
    ) : null;
    const userAvatar = userInfo.avatar
      ? { src: userInfo.avatar }
      : { icon: 'user' };
    return (
      <Popover content={content} placement="bottomRight" trigger="click">
        <div className="ui-user-avatar">
          <div className="avatar">
            <Avatar {...userAvatar} />
          </div>
          <div className="info">
            <div className="display-name">
              {userInfo.name}{' '}
              {enableWorkingMode && userInfo.working_mode
                ? `[${t(`${userInfo.working_mode}`)}]`
                : ''}{' '}
              <Icon style={{ fontSize: '10px' }} type="down" />
            </div>
          </div>
        </div>
      </Popover>
    );
  }
}

const mapStateToProps = (state) => {
  const applicableWorkingModes = lodashGet(
    state,
    'layoutContext.applicableWorkingModes',
  );
  return {
    enableWorkingMode:
      enableWorkingModeFunc(state.domainInfo) && applicableWorkingModes,
    userInfo: lodashGet(state, 'user.info'),
    applicableWorkingModes,
  };
};

export default connect(mapStateToProps)(LoginUser);
