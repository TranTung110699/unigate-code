import React from 'react';
import Html from 'components/common/html';
import { connect } from 'react-redux';
import apiUrls from 'api-endpoints';
import pageApiUrls from 'components/admin/cms/page/endpoints';

import sagaActions from 'actions/node/saga-creators';
import { timestampToDateString } from 'common/utils/Date';
import ImageDefault from './images/title-default.png';
import './stylesheet.scss';

class News extends React.Component {
  componentWillMount() {
    this.fetchMenuItems(this.props);
  }

  fetchMenuItems(params) {
    const { dispatch } = params;
    const url = pageApiUrls.newest_featured_news_blogs_ggg;
    dispatch(sagaActions.getDataRequest({ url, keyState: 'blogs' }, {}));
  }

  render() {
    const { blogsList } = this.props;

    return (
      <div className="section">
        <div className="news">
          <h3 className="text-transform text-center">tin tức</h3>
          <div className="container">
            <div className="row">
              {blogsList &&
                blogsList.map((item) => (
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-4">
                        {item.medias &&
                          item.medias.map((image) =>
                            image ? (
                              <img src={image.path} alt="" />
                            ) : (
                              <img src={ImageDefault} alt="" />
                            ),
                          )}
                      </div>
                      <div className="col-md-8">
                        <div className="news-content">
                          <h4>{item.name}</h4>
                          <label>{timestampToDateString(item.ts)}</label>
                          <p>
                            <Html content={item.summary} />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const mode = 'blogs';
  const blogsList = state.dataApiResults[mode] || [];

  return {
    blogsList,
  };
};

export default connect(mapStateToProps)(News);
