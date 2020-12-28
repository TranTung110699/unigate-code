import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';
import LeftMenu from './leftMenu/index';
import CategoriesCoursesList from './categoriesCourse/CategoriesCoursesList';

const cssClass = 'gj-home-page__categories-courses';

class Wrapper extends Component {
  style = {
    padding: '0 20px',
    margin: '0 auto',
    maxWidth: '1300px',
    width: '100%',
  };

  render() {
    const { dashboardType, themeConfig, iid, page, slug } = this.props;
    return (
      <div className="container" style={this.style}>
        <div className="row">
          <div
            className={`col-lg-3 col-md-3 col-sm-4 col-xs-12 ${cssClass}__left-menu`}
          >
            <LeftMenu
              collapsedMenu
              activatedMenu={dashboardType}
              {...this.props}
              {...page}
            />
          </div>
          <div
            className={`col-lg-9 col-md-9 col-sm-8 col-xs-12 ${cssClass}__categories-course-list`}
          >
            <CategoriesCoursesList categoryIid={iid} slug={slug} />
          </div>
        </div>
      </div>
    );
  }
}

Wrapper.defaultProps = {
  dashboardType: '',
  iid: '',
};

Wrapper.propTypes = {};

const mapStateToProps = (state, props) => {
  const { type } = props;
  const userInfo = state.user.info;
  let dashboardType = type;
  if (!dashboardType) {
    dashboardType = 'in-progress-courses';
  }

  return {
    dashboardType,
    userInfo,
    themeConfig: getThemeConfig(state),
  };
};

export default connect(mapStateToProps)(Wrapper);
