import React from 'react';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import Slider from 'react-slick';
import NextArrow from './../../common/next-arrow';
import PrevArrow from './../../common/prev-arrow';
import Image from './images/bg.png';
import './stylesheet.scss';

class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchPageByCategory();
  }

  fetchPageByCategory() {
    const { dispatch } = this.props;
    const url = apiUrls.search_teacher_by_visible;

    dispatch(sagaActions.getDataRequest({ url, keyState: 'staff' }, {}));
  }

  render() {
    const { teacherList } = this.props;
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      nextArrow: <NextArrow {...this.props} />,
      prevArrow: <PrevArrow {...this.props} />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
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
      <div className="section teacher-wrapper">
        <div className="container">
          <div className="row">
            <div className="teacher">
              <div className="banner">
                <div className="layer" />
                <div className="teacher-content">
                  <h3 className="text-transform text-center">giảng viên</h3>
                  <div className="row teacher-list">
                    <div className="teacher-list-inner">
                      {teacherList && teacherList.length && (
                        <Slider {...settings}>
                          {teacherList.map((item, index) => (
                            <div
                              key={`teacher-${index}`}
                              className="col-md-4 col-lg-4 col-xs-12 col-sm-12 content-box text-center"
                            >
                              {item.avatar ? (
                                <img src={item.avatar} alt="" />
                              ) : (
                                <img src={Image} alt="" />
                              )}
                              <div className="teacher-description">
                                <h4 className="text-transform">{item.name}</h4>
                                <p>{item.position}</p>
                              </div>
                            </div>
                          ))}
                        </Slider>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const teacherList = state.dataApiResults.staff || [];

  return {
    teacherList,
  };
};

export default connect(mapStateToProps)(Teacher);
