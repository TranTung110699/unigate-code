/**
 * Created by DVN on 10/27/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Perm from 'common/utils/Perm';
import LayoutHelper from 'layouts/LayoutHelper';
import UpcomingEventBlogs from 'components/front-end/dashboard/ums/upcoming-event-blogs/index';
import LeftMenu from './left-menu';
import { getComponent } from './left-menu/config';
import './stylesheet.scss';

const style = {
  background: '#f6f6f6',
};
const wrapperStyle = {
  background: '#fff',
};

class Layout extends Component {
  style = { minHeight: 'calc(100vh - 335px)', paddingBottom: '50px' };

  constructor(props) {
    super(props);
    this.state = { openMenu: false };
  }

  componentDidMount() {
    LayoutHelper.setLayout(this);
  }

  render() {
    const {
      userInfo,
      availableStudentMenus,
      availableMainstageTopMenus,
      params,
    } = this.props;
    const isTeacher = Perm.hasPerm('teacher');
    const availableMenus = isTeacher
      ? availableMainstageTopMenus
      : availableStudentMenus;
    const rootUrl = isTeacher ? 'teach' : 'learn';
    const action = this.props.action;
    const type =
      action === 'request'
        ? action
        : this.props.type ||
          (availableMenus && availableMenus.length > 0 && availableMenus[0]);

    return (
      <div style={wrapperStyle}>
        <div className={'ums-dashboard-event'}>
          <div className="container">
            <div className="row">
              <div className={'upcoming-events'}>
                <UpcomingEventBlogs userInfo={userInfo} />
              </div>
            </div>
          </div>
        </div>
        <div className="ums-dashboard-wrapper container" style={this.style}>
          <div className="row dashboard-show-by-tab-wrapper">
            <div className="col-md-3 col-sm-4 col-xs-12 ums-menu-left hidden-xs visible-sm">
              <div
                className={`nav-menu-content ${
                  this.state.openMenu ? 'show-nav-menu-content' : ''
                }`}
              >
                <LeftMenu
                  type={type}
                  handleMenuClick={() => {
                    this.setState({ openMenu: !this.state.openMenu });
                  }}
                  availableMenus={availableMenus}
                  rootUrl={rootUrl}
                />
                <div
                  className="nav-menu"
                  onClick={() => {
                    this.setState({ openMenu: !this.state.openMenu });
                  }}
                >
                  <i className="material-icons">keyboard_arrow_right</i>
                </div>
              </div>
            </div>
            <div className="container col-md-9 col-sm-8 col-xs-12 content">
              {availableMenus &&
                availableMenus.includes(type) &&
                getComponent(type, params)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const school = state.domainInfo && state.domainInfo.school;
  return {
    availableStudentMenus: school && school.student_dashboard_menus,
    availableMainstageTopMenus: school && school.teacher_dashboard_menus,
    userInfo: state.user.info,
  };
};

export default connect(mapStateToProps)(Layout);
