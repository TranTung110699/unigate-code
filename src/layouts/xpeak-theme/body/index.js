import React from 'react';
import Html from 'components/common/html';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import pageApiUrls from 'components/admin/cms/page/endpoints';
import { timestampToDateString } from 'common/utils/Date';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import { getFrontendUrl } from 'routes/links/common';
import imageDefault from 'layouts/xpeak-theme/body/images/giao-vien-dien-tu.png';

import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 20/05/2017
 * */
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchPageByCategory();
  }

  fetchPageByCategory() {
    const { dispatch } = this.props;
    const url = pageApiUrls.get_page_by_category_api;

    dispatch(
      sagaActions.getDataRequest({ url, keyState: 'xpeak' }, { code: 'xpeak' }),
    );
  }

  render() {
    const { pageListByGroup } = this.props;
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
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
      <div className="xpeak-body">
        <div className="xpeak-connection row">
          <div className=" xpeak-connection-background">
            <h1>Xpeak với truyền thông</h1>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div id="slick-image" className="clearfix">
                    <div className="row">
                      {pageListByGroup && pageListByGroup.length > 0 && (
                        <Slider {...settings}>
                          {pageListByGroup.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="col-md-4 col-lg-4 col-xs-12 col-sm-12 content-box"
                            >
                              <div className="content-image">
                                {item.medias &&
                                  item.medias.map((image, imageIndex) =>
                                    image ? (
                                      <img
                                        key={imageIndex}
                                        src={
                                          image.link ||
                                          image.path ||
                                          imageDefault
                                        }
                                        alt="xpeak_blogs"
                                      />
                                    ) : null,
                                  )}
                                <div className="middle">
                                  <Html content={item.summary} />
                                  <a
                                    href={
                                      item.url ||
                                      getFrontendUrl('blog', {
                                        slug: item.slug,
                                      })
                                    }
                                    className="text"
                                  >
                                    Xem thêm
                                  </a>
                                </div>
                              </div>
                              <div className="content">
                                <p>{timestampToDateString(item.ts)}</p>
                                <p>{item.name}</p>
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
  const pageListByGroup = state.dataApiResults.xpeak || [];

  return {
    pageListByGroup,
  };
};

export default connect(mapStateToProps)(index);
