import React from 'react';
import Slider from 'react-slick';
import FeedBack from './images/feedback.png';
import './stylesheet.scss';

class Feedbacks extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
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
      <div className="feedback-wrapper">
        <div className="background-slider">
          <div className="layer" />
          <div className="slider-feedback">
            <div className="container">
              <Slider {...settings}>
                <div className="slider-content">
                  <div className="row">
                    <div className="col-md-5 col-sm-4">
                      <img src={FeedBack} alt="" />
                    </div>
                    <div className="col-md-7 col-sm-8">
                      <p className="feedback">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Ut wisi enim ad
                        minim veniam, quis nostrud exerci tation ullamcorper
                        suscipit lobortis nisl ut aliquip ex ea commodo
                        consequat. Duis autem vel eum iriure dolor in hendrerit
                        in vulputate velit esse molestie consequat, vel illum
                        dolore eu feugiat nulla facilisis at vero eros et
                        accumsan et iusto odio dignissim qui blandit praesent
                        luptatum zzril delenit augue duis dolore te feugait
                        nulla facilisi.Lorem ipsum dolor sit amet, cons ectetuer
                        adipiscing elit, sed diam
                      </p>
                      <div className="text-right">
                        <h3 className="text-transform">Nguyễn anh thảo</h3>
                        <p>Đầu bếp tại Vuvuzela</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slider-content">
                  <div className="row">
                    <div className="col-md-5">
                      <img src={FeedBack} alt="" />
                    </div>
                    <div className="col-md-7">
                      <p className="feedback">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Ut wisi enim ad
                        minim veniam, quis nostrud exerci tation ullamcorper
                        suscipit lobortis nisl ut aliquip ex ea commodo
                        consequat. Duis autem vel eum iriure dolor in hendrerit
                        in vulputate velit esse molestie consequat, vel illum
                        dolore eu feugiat nulla facilisis at vero eros et
                        accumsan et iusto odio dignissim qui blandit praesent
                        luptatum zzril delenit augue duis dolore te feugait
                        nulla facilisi.Lorem ipsum dolor sit amet, cons ectetuer
                        adipiscing elit, sed diam
                      </p>
                      <div className="text-right">
                        <h3 className="text-transform">Nguyễn anh thảo</h3>
                        <p>Đầu bếp tại Vuvuzela</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slider-content">
                  <div className="row">
                    <div className="col-md-5">
                      <img src={FeedBack} alt="" />
                    </div>
                    <div className="col-md-7">
                      <p className="feedback">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Ut wisi enim ad
                        minim veniam, quis nostrud exerci tation ullamcorper
                        suscipit lobortis nisl ut aliquip ex ea commodo
                        consequat. Duis autem vel eum iriure dolor in hendrerit
                        in vulputate velit esse molestie consequat, vel illum
                        dolore eu feugiat nulla facilisis at vero eros et
                        accumsan et iusto odio dignissim qui blandit praesent
                        luptatum zzril delenit augue duis dolore te feugait
                        nulla facilisi.Lorem ipsum dolor sit amet, cons ectetuer
                        adipiscing elit, sed diam
                      </p>
                      <div className="text-right">
                        <h3 className="text-transform">Nguyễn anh thảo</h3>
                        <p>Đầu bếp tại Vuvuzela</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slider-content">
                  <div className="row">
                    <div className="col-md-5">
                      <img src={FeedBack} alt="" />
                    </div>
                    <div className="col-md-7">
                      <p className="feedback">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Ut wisi enim ad
                        minim veniam, quis nostrud exerci tation ullamcorper
                        suscipit lobortis nisl ut aliquip ex ea commodo
                        consequat. Duis autem vel eum iriure dolor in hendrerit
                        in vulputate velit esse molestie consequat, vel illum
                        dolore eu feugiat nulla facilisis at vero eros et
                        accumsan et iusto odio dignissim qui blandit praesent
                        luptatum zzril delenit augue duis dolore te feugait
                        nulla facilisi.Lorem ipsum dolor sit amet, cons ectetuer
                        adipiscing elit, sed diam
                      </p>
                      <div className="text-right">
                        <h3 className="text-transform">Nguyễn anh thảo</h3>
                        <p>Đầu bếp tại Vuvuzela</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slider-content">
                  <div className="row">
                    <div className="col-md-5">
                      <img src={FeedBack} alt="" />
                    </div>
                    <div className="col-md-7">
                      <p className="feedback">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Ut wisi enim ad
                        minim veniam, quis nostrud exerci tation ullamcorper
                        suscipit lobortis nisl ut aliquip ex ea commodo
                        consequat. Duis autem vel eum iriure dolor in hendrerit
                        in vulputate velit esse molestie consequat, vel illum
                        dolore eu feugiat nulla facilisis at vero eros et
                        accumsan et iusto odio dignissim qui blandit praesent
                        luptatum zzril delenit augue duis dolore te feugait
                        nulla facilisi.Lorem ipsum dolor sit amet, cons ectetuer
                        adipiscing elit, sed diam
                      </p>
                      <div className="text-right">
                        <h3 className="text-transform">Nguyễn anh thảo</h3>
                        <p>Đầu bếp tại Vuvuzela</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feedbacks;
