import React from 'react';
import Layout from 'antd/lib/layout';
import { connect } from 'react-redux';
import AdminTopMenu from './top-menu';
import AdminLeftMenu from './menu-left';
import AdminSubMenuTop from './sub-menu-top';
import AdminSubMenuLeft from './sub-menu-left';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import getLodash from 'lodash.get';

import './stylesheet.scss';

const { Header, Content, Footer, Sider } = Layout;

class AdminLayout extends React.Component {
  render() {
    const layoutContext = this.props.layoutContext || {};
    const isFeatureEnabled_NEW_UI_JULY_2019 = this.props.isFeatureEnabled(
      features.NEW_UI_JULY_2019,
    );
    return (
      <Layout
        className={`ui-admin-layout ${
          isFeatureEnabled_NEW_UI_JULY_2019 ? 'ui-admin-layout-dark' : ''
        }`}
      >
        <AdminTopMenu />
        <Layout>
          <AdminLeftMenu />
          <Layout
            className={
              isFeatureEnabled_NEW_UI_JULY_2019 &&
              'NEW_UI_JULY_2019-dark-background-primary'
            }
          >
            <AdminSubMenuTop />

            <Content>
              <div>
                <AdminSubMenuLeft />

                <div
                  className={
                    isFeatureEnabled_NEW_UI_JULY_2019 ? 'm-45' : 'm-20'
                  }
                >
                  {this.props.children}
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  layoutContext: state.layoutContext,
});

export default connect(mapStateToProps)(withFeatureFlags()(AdminLayout));
