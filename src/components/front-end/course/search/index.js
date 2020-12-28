import React, { Component } from 'react';
import apiUrls from 'api-endpoints';
import ImageBackGround from 'components/common/views/image-background';
import FlyPanel from 'components/common/views/fly-panel';
import Menu from 'components/common/views/menu';
import LayoutHelper from 'layouts/LayoutHelper';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import Breadcrumbs from 'components/front-end/path/menu/breadcrumbs';
import OtherPaths from 'layouts/ggg-theme/body/topic';
import CourseItem from 'components/front-end/course/in-grid';
import { DefinedUrlParams } from 'routes/links/common';
import { t1 } from 'translate';

import './stylesheet.scss';

class Layout extends Component {
  componentDidMount() {
    LayoutHelper.setLayout(this);

    this.searchCourses(this.props);
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    const { searchKey } = this.props;
    if (nextProps && nextProps.searchKey && nextProps.searchKey !== searchKey) {
      this.searchCourses(nextProps);
    }
  }

  searchCourses = (props) => {
    const { dispatch, keyState, searchKey } = props;
    const url = apiUrls.search_home_courses;

    if (searchKey) {
      dispatch(sagaActions.getDataRequest({ url, keyState }, { q: searchKey }));
    }
  };

  render() {
    const { screenSize, searchedCourses, searchKey } = this.props;

    return (
      <div className="search-courses-wrapper">
        <FlyPanel breakPoint={250}>
          <Menu type="fly" />
        </FlyPanel>
        <ImageBackGround width={screenSize.width} height={250} src={''}>
          <Menu />
        </ImageBackGround>
        <div>
          <div className="container">
            <div className="row">
              <Breadcrumbs menuText={t1('search_courses')} />
              <h3 className="text-transform text-center course-title">
                {t1('search_courses_with_key')}: {searchKey}
              </h3>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {searchedCourses &&
              searchedCourses.length > 0 &&
              searchedCourses.map((item) => (
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <CourseItem item={item} rootPathIid="" />
                </div>
              ))}
            {(!searchedCourses || searchedCourses.length === 0) && (
              <div className="col-md-12">
                <p className="text-center">{t1('there_are_no_courses_yet')}.</p>
              </div>
            )}
          </div>
        </div>
        <OtherPaths />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const keyState = 'searchedCourses';
  const searchedCourses = state.dataApiResults[keyState] || [];

  let { match } = props;
  match = match || {};
  const params = match.params || {};
  const searchKey = params[DefinedUrlParams.SEARCH_KEY];

  return {
    keyState,
    searchedCourses,
    searchKey,
    screenSize: state.common.screenSize,
  };
}

export default connect(mapStateToProps)(Layout);
