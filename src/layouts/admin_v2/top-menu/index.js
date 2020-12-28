import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import get from 'lodash.get';
import Layout from 'antd/lib/layout';
import { t1 } from 'translate';
import Button from 'antd/lib/button';
// import Menu from 'components/common/views/ant-menu';
import LoginedUser from 'components/common/views/login-user';
import { getUrl } from 'routes/links/common';
// import WorkingMode from 'components/common/views/working-mode';
import { openLeftMenu } from 'utils/Util';
import smallLogoDefault from '../menu-left/lotuslms_logo_small.png';
import { getCurrentSemester } from 'common/k12/index';
import withUserOrganizations from 'common/hoc/withUserOrganizations';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import BadgeContainer from 'layouts/evn-theme/top/badge';
// import menuSchema from './menu-schema';
// const menuSchema = []; //TODO we don't know what to put here so hide it for now. 06 Nov 2018
const { Header } = Layout;

class AdminTopMenu extends React.Component {
  render() {
    const {
      dispatch,
      logo,
      isRoot,
      semester,
      isK12,
      isSeabank,
      organizations,
    } = this.props;

    const sLogo = logo || smallLogoDefault;

    return (
      <Header className="ui-header-admin">
        <div className="flex-center m-r-10">
          <Link to="/admin" onClick={openLeftMenu(dispatch)}>
            <img className="logo" alt="logo" src={sLogo} />
          </Link>
        </div>

        <div className="flex-grow-1  m-r-10"> </div>
        {/*
        <div className="flex-center m-r-10">
          <Menu
            theme="light"
            mode="horizontal"
            className="ui-header-menu "
            defaultSelectedKeys={['abcdef', '12312']}
            style={{ lineHeight: '64px' }}
            schema={menuSchema}
          />
        </div>
        <div className="flex-center m-r-10">
          <WorkingMode />
        </div>
        */}

        {!!isK12 && (
          <div className="flex-center m-r-10">
            {
              <span>
                {semester && semester.iid
                  ? `${semester.name} - ${semester.schoolYear}`
                  : t1('no_active_semester')}
              </span>
            }
          </div>
        )}
        {process.env.NODE_ENV !== 'production' && (
          <div className="flex-center m-r-10">
            <Button
              title={t1('dev_components')}
              href={getUrl('dev')}
              icon="codepen"
            />
          </div>
        )}
        <div className="flex-center m-r-20">
          <Link to={'/'}>{t1('home')}</Link>
        </div>
        <div className="flex-center m-r-20">
          <Link to={'/admin'}>{t1('admin_home')}</Link>
        </div>
        <div className="flex-center m-r-20">
          <Link to={getUrl('file-manager')}>{t1('file_manager')}</Link>
        </div>

        {!!isSeabank && (
          <div className="flex-center m-r-20">
            <Link to={getUrl('help')}>{t1('help')}</Link>
          </div>
        )}
        {isRoot ? (
          <div className="flex-center m-r-20">
            <Link to={getUrl('settings')}>{t1('settings')}</Link>
          </div>
        ) : (
          ''
        )}
        <div className="flex-center m-r-20">
          <Link to={getUrl('notifications')}>
            <BadgeContainer />
          </Link>
        </div>
        <div className="flex-center">
          <LoginedUser />
        </div>
      </Header>
    );
  }
}

const mapStateToProps = (state) => ({
  layoutContext: state.layoutContext,
  domain: get(state, 'domainInfo.domain'),
  isRoot: get(state, 'domainInfo.isRoot'),
  // old logic when we had 1 left menu displaying many different submenu items as well
  //  menuAvailable: get(state, 'domainInfo.school.admin_menu_nav'),
  logo: get(state, 'domainInfo.school.theme.logo'),
  smallLogo: get(state, 'domainInfo.school.theme.mobile_logo'),

  semester: getCurrentSemester(state),
});

export default withRouter(
  connect(mapStateToProps)(
    withSchoolConfigs(withUserOrganizations(AdminTopMenu)),
  ),
);
