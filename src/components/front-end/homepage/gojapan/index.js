import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DefinedUrlParams, getDashboardUrl } from 'routes/links/common';
import { createSelector } from 'reselect';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import Perm from 'common/utils/Perm';
import Store from 'store';
import { getThemeConfig } from 'utils/selectors';
import CategoriesCourseWrapper from './courses/categoriesCourseWrapper';
import FeatureCourses from './courses/FeatureCourses';
import Header from './header';
import './stylesheet.scss';
import { layouts } from '../../../../configs/constants';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  cssClass = 'gj-home-page';

  render() {
    const { iid } = this.props;
    const themeConfig = getThemeConfig(Store.getState());
    if (
      (themeConfig.layout === 'evn' ||
        themeConfig.layout === 'vt' ||
        themeConfig.layout === 'blue' ||
        themeConfig.layout === 'hpu2') &&
      !Perm.isGuest()
    )
      return <Redirect to={getDashboardUrl('home')} />;

    if (window.isGoJapan) {
      return <Redirect to={getDashboardUrl('courses')} />;
    }

    return (
      <div className={`${this.cssClass}`}>
        <Header />
        <FeatureCourses className={`${this.cssClass}__feature-courses`} />
        <div className={`${this.cssClass}__categories-courses`}>
          <CategoriesCourseWrapper
            className={`${this.cssClass}__categories-course-wrapper`}
            type={'academic-categories'}
            iid={iid}
            page={'home'}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  (state, props) => props.match && props.match.params,
  (params) => ({
    iid: params && params[DefinedUrlParams.IID],
  }),
);

Homepage.defaultProps = {
  iid: '',
};

Homepage.propTypes = {
  iid: PropTypes.number,
};

export default withRouter(connect(mapStateToProps)(Homepage));
