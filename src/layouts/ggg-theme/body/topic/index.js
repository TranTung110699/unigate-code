import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import gggBackground from 'layouts/ggg-theme/top-background/images/background.png';

import './stylesheet.scss';

class Topic extends React.Component {
  componentWillMount() {
    this.getApprovedPaths();
  }

  getApprovedPaths = () => {
    const { dispatch } = this.props;
    const url = apiUrls.open_paths;

    dispatch(
      sagaActions.getDataRequest({ url, keyState: 'home_page_paths' }, {}),
    );
  };

  render() {
    const { approvedPaths } = this.props;
    let i = 0;
    return (
      <div className="section topic-wrapper">
        <div className="container">
          <div className="row">
            <h3 className="text-transform text-center">
              các nhóm chủ đề đào tạo
            </h3>
            <div className="flex-container">
              {approvedPaths &&
                approvedPaths.map((path) => {
                  const pathAvatar = path.avatar ? path.avatar : gggBackground;
                  i += 1;
                  const className =
                    i % 2 === 0 && (i - 1) % 3 !== 0 ? 'col-md-6' : 'col-md-3';
                  return (
                    <div className={`flex-small-item ${className}`}>
                      <Link to={`/learn/course-list/${path.iid}`}>
                        <img src={pathAvatar} alt="" />
                        <div className="description text-transform">
                          <h4>{path.name}</h4>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const approvedPaths = state.dataApiResults.home_page_paths || [];

  return {
    approvedPaths,
  };
}

export default connect(mapStateToProps)(Topic);
