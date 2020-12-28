import React from 'react';
import Layout from 'antd/lib/layout';
import { connect } from 'react-redux';
import AdminTopMenu from './top-menu';
import AdminLeftMenu from './menu-left';
import AdminSubMenuTop from './sub-menu-top';
import SubMenuLeftPresenter from './sub-menu-left/SubMenuLeftPresenter';
// import './stylesheet.scss';

const { Header, Content, Footer, Sider } = Layout;

class AdminLayoutMainstage extends React.Component {
  render() {
    const { subMenuLeft } = this.props;
    // console.log({subMenuLeft});
    return (
      <div style={{ minHeight: 'calc(100vh)' }}>
        {/*<AdminTopMenu />
        <AdminSubMenuTop />
        */}
        <div>
          {subMenuLeft && subMenuLeft.schema && (
            <div className="ui-sub-menu">
              <SubMenuLeftPresenter
                {...subMenuLeft}
                mode={this.props.isHashbang ? 'horizontal' : ''}
              />
            </div>
          )}
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default AdminLayoutMainstage;
