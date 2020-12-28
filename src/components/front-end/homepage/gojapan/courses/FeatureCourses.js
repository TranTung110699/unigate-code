import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import CategoryCourseItem from './CategoryCourseItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import NextArrow from 'layouts/ggg-theme/common/next-arrow';
import PrevArrow from 'layouts/ggg-theme/common/prev-arrow';
import { t1 } from 'translate';
import ComponentWithoutContent from './ComponentWithoutContent';

const FEATURED_COURSES = 'featuredCourses';

class FeatureCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchPageByCategory();
  }

  fetchPageByCategory() {
    const { dispatch } = this.props;

    const itemsPerPage = 4;
    const url = apiUrls.dashboard_configs(FEATURED_COURSES, itemsPerPage);

    dispatch(
      sagaActions.getDataRequest({ url, keyState: FEATURED_COURSES }, {}),
    );
  }

  cssClass = 'gj-home-page__feature-courses';

  render() {
    const { pageListByGroup } = this.props;
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      autoplay: true,
      autoplaySpeed: 4000,
      arrow: false,
      nextArrow: <NextArrow {...this.props} />,
      prevArrow: <PrevArrow {...this.props} />,
      responsive: [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
            infinite: true,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div className={`${this.cssClass}`}>
        <div className={`container ${this.cssClass}__wrapper`}>
          <p className={`${this.cssClass}__title no-margin`}>
            {t1('popular_courses')}
          </p>
          {!pageListByGroup || pageListByGroup.length === 0 ? (
            <ComponentWithoutContent content="feature_courses" />
          ) : (
            <div>
              <hr />
              <div className={`${this.cssClass}__container no-margin row`}>
                <div className="col-xs-12 col-md-12 col-md-12 col-md-12 no-margin no-padding">
                  <div id="slick-image" className="clearfix">
                    <div className="row">
                      {pageListByGroup && pageListByGroup.length && (
                        <Slider {...settings}>
                          {pageListByGroup.map((item, itemIndex) => (
                            <div
                              className="col-lg-3 col-md-4 col-sm-6 col-xs-12"
                              key={itemIndex}
                            >
                              <CategoryCourseItem
                                item={item}
                                rootPathIid=""
                                mode="in-progress"
                              />
                            </div>
                          ))}
                        </Slider>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const pageListByGroup = state.dataApiResults[FEATURED_COURSES] || [];
  return {
    pageListByGroup,
  };
};
//
// FeatureCourses.propTypes = {
//   pageListByGroup: PropTypes.arrayOf,
// };
//
// FeatureCourses.defaultProps = {
//   pageListByGroup: [],
// };

export default connect(mapStateToProps)(FeatureCourses);
