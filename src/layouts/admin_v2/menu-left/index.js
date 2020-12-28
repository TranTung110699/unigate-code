import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Layout from 'antd/lib/layout';
import get from 'lodash.get';

import Perm from 'common/utils/Perm';
// import { openLeftMenu } from 'utils/Util';
import Menu from 'components/common/views/ant-menu';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import { adminMenuItemsStoreKey } from 'store';
import userLinks from 'routes/links/user';

import menuSchema from './menu-schema/index';
import layoutContextAction from 'actions/layout-context';
import { enableWorkingMode as enableWorkingModeFunc } from 'common/conf';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import './style.scss';
import withUserInfo from 'common/hoc/withUserInfo';

const { Sider } = Layout;

class LeftAdminMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readyToDrawMenu: false,
      menuAvailable: null,
    };
  }

  componentWillMount() {
    this.fetchMenuItems(this.props);
  }

  componentDidMount() {
    this.checkIsGuest();
  }

  checkIsGuest = () => {
    if (Perm.isGuest()) {
      this.props.history.push(userLinks.login);
    }
  };

  fetchMenuItems(params) {
    const { dispatch } = params;
    if (!this.state.menuAvailable) {
      const url = apiUrls.menu_configs('admin');

      dispatch(
        sagaActions.getDataRequest({
          url,
          keyState: adminMenuItemsStoreKey('admin'),
          executeOnSuccess: ({ applicableWorkingModes, menuAvailable }) => {
            dispatch(
              layoutContextAction.setApplicableWorkingModes(
                applicableWorkingModes,
              ),
            );
            this.setState({ menuAvailable, readyToDrawMenu: true });
          },
          executeOnFailure: () => {
            this.setState({ readyToDrawMenu: true });
          },
        }),
      );
    }
  }

  render() {
    const {
      layoutContext,
      logo,
      smallLogo,
      schoolType,
      isFeatureEnabled,
      dispatch,
      userInfo,
    } = this.props;

    const menuItems = menuSchema({
      domain: this.props.domain,
      menuAvailable: this.state.menuAvailable,
      enableWorkingMode: this.props.enableWorkingMode,
      workingMode: this.props.workingMode,
      schoolType,
      isStaff: Perm.hasPerm('staff', this.props.domain, userInfo),
    });

    return (
      <Sider
        width={250}
        collapsed={!layoutContext.isOpenLeftMenu}
        className={`ui-admin-left-menu-panel ant-layout-sider
          ${
            isFeatureEnabled(features.NEW_UI_JULY_2019)
              ? 'NEW_UI_JULY_2019-left-menu'
              : 'left-menu-container'
          }
        `}
        style={{ background: '#fff' }}
        collapsible
        onCollapse={() =>
          dispatch(
            layoutContextAction.setStateOfLeftMenu(
              !layoutContext.isOpenLeftMenu,
            ),
          )
        }
      >
        {this.state.readyToDrawMenu && (
          <Menu
            openSubMenuByDefault
            className="ui-admin-left-menu"
            mode="inline"
            schema={menuItems}
          />
        )}
      </Sider>
    );
  }
}

const mapStateToProps = (state) => ({
  layoutContext: state.layoutContext,
  domain: get(state, 'domainInfo.domain'),
  // old logic when we had 1 left menu displaying many different submenu items as well
  //  menuAvailable: get(state, 'domainInfo.school.admin_menu_nav'),
  logo: get(state, 'domainInfo.school.theme.logo'),
  schoolType: get(state, 'domainInfo.school.type'),
  smallLogo: get(state, 'domainInfo.school.theme.mobile_logo'),
  enableWorkingMode: enableWorkingModeFunc(state.domainInfo),
  workingMode: get(state, 'user.info.working_mode'),
});

export default withRouter(
  connect(mapStateToProps)(withFeatureFlags()(withUserInfo(LeftAdminMenu))),
);
