import React, { Component } from 'react';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import { Link } from 'react-router-dom';
import { getFrontendUrl } from 'routes/links/common';
import Item from './item/index';
import './stylesheet.scss';

class Tip extends Component {
  linkStyle = { display: 'block' };

  componentDidMount() {
    this.fetchPageByCategory();
  }

  fetchPageByCategory() {
    const { dispatch } = this.props;
    const url = apiUrls.children_category;

    dispatch(
      sagaActions.getDataRequest(
        { url, keyState: 'daily_toeic_tips' },
        { parent_code: 'etec', status: 'approved' },
      ),
    );
  }

  render() {
    const { dailyTips } = this.props;

    if (!dailyTips) return <div />;

    return (
      <div className="row etec-tip">
        <div className="col-md-4">
          {dailyTips.length >= 1 && <Item dailyTip={dailyTips[0]} />}
        </div>
        <div className="col-md-4">
          {dailyTips.length >= 2 && <Item dailyTip={dailyTips[1]} type={1} />}
          {dailyTips.length >= 3 && <Item dailyTip={dailyTips[2]} type={1} />}
        </div>
        <div className="col-md-4">
          {dailyTips.length >= 4 && <Item dailyTip={dailyTips[3]} />}
          <Link style={this.linkStyle} to={getFrontendUrl('blog')}>
            <button className="button-view-more">XEM CÁC TIPS KHÁC</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const dailyTips = state.dataApiResults.daily_toeic_tips || [];

  return {
    dailyTips,
  };
};

export default connect(mapStateToProps)(Tip);
