import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import { isMobileBrowser } from 'common';
import './stylesheet.scss';
import config from './config';
import { withRouter } from 'react-router';
import { buyPackageUrl } from 'routes/root-url';

class HomepageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  onSliderChange = (newIndex) => {
    this.setState({ index: newIndex });
  };

  render() {
    const { homepageSlider, history } = this.props;
    const banners = config(homepageSlider);

    const currentSlider = get(homepageSlider, `${this.state.index}`, {});
    const { url, url_type } = currentSlider;
    const clickableSlider = url_type !== 'none';

    const onClick = clickableSlider
      ? {
          onClick: () => {
            !!url && url_type === 'url'
              ? (window.location = url)
              : history.push(buyPackageUrl);
          },
        }
      : {};

    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      afterChange: this.onSliderChange,
    };

    if (typeof banners === 'undefined' || banners.length <= 0) {
      return '';
    }

    if (typeof banners !== 'undefined' && banners.length === 1) {
      settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 0,
        slidesToScroll: 0,
        initialSlide: 0,
        arrows: false,
      };
    }

    const setBackgroundStyle = (item) => {
      let backgroundStyle = {
        backgroundImage: `url(${get(item, 'avatar', '')})`,
      };
      if (isMobileBrowser()) {
        backgroundStyle = {
          backgroundImage: `url(${get(item, 'mobile_avatar', '')})`,
        };
      }
      return backgroundStyle;
    };

    return (
      <div className="gj-home-page__header">
        <div
          id="slick-image"
          className={`clearfix ${clickableSlider ? 'cursor-pointer' : ''}`}
          {...onClick}
        >
          <div className="row no-margin">
            <Slider {...settings}>
              {banners &&
                banners.map((item) => (
                  <div
                    className="col-xs-12 gj-home-page__header__slide-item"
                    style={setBackgroundStyle(item)}
                  >
                    <div className="background-filter" />
                    <div className="title-wrapper">
                      <h2>{get(item, 'title', '')}</h2>
                      <p>{get(item, 'subtitle', '')}</p>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  homepageSlider: get(state, 'domainInfo.school.homepage_slider', []),
});

HomepageHeader.propTypes = {
  homepageSlider: PropTypes.arrayOf(PropTypes.any),
};

HomepageHeader.defaultProps = {
  homepageSlider: [],
};

export default connect(mapStateToProps)(withRouter(HomepageHeader));
