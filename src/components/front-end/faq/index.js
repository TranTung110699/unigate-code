import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutHelper from 'layouts/LayoutHelper';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import { getThemeConfig } from 'utils/selectors';
import { t1 } from 'translate';
import Overview from 'components/front-end/homepage/etec/overview';
import QA from './item';
import Search from './Search';
import Alert from 'antd/lib/alert';

const KEY_STATE = 'FAQ';

class Index extends Component {
  overviewStyle = { padding: '50px' };

  componentWillMount() {
    this.onFetchOpenPaths(this.props);
  }

  componentDidMount() {
    LayoutHelper.setLayout(this);
  }

  onFetchOpenPaths = (props) => {
    const { dispatch } = props;
    const params = {
      status: ['approved'],
    };
    const url = apiUrls.faq_search;
    dispatch(sagaActions.getDataRequest({ url, keyState: KEY_STATE }, params));
  };

  getHeaderData = () => {
    const { themeConfig } = this.props;

    return {
      title: t1('faq'),
      content: t1(
        'find_answers_and_general_information_quickly_about_this_page',
      ),
    };
  };

  render() {
    const { items, themeConfig, isLogin } = this.props;
    const header = this.getHeaderData();
    return (
      <div>
        <div
          className={isLogin ? '' : 'container'}
          style={{
            marginBottom: '20px',
          }}
        >
          {!isLogin && (
            <Overview
              style={this.overviewStyle}
              title={header.title}
              content={header.content}
            />
          )}
          {window.isETEP ? <Search className="m-b-20" /> : null}
          <div>
            {Array.isArray(items) && items ? (
              items.map((item) => <QA key={item.iid} item={item} />)
            ) : (
              <Alert message={t1('there_are_no_questions_yet')} type="info" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapPropsToState = (state) => ({
  userInfo: state.user.info,
  items: state.dataApiResults[KEY_STATE],
  screenSize: state.common.screenSize,
  themeConfig: getThemeConfig(state),
});

export default connect(mapPropsToState)(Index);
