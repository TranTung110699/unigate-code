import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Tab, Tabs } from 'material-ui/Tabs';
import { connect } from 'react-redux';
import { t4 } from 'translate';
import { setShowQuickViewStatus } from './actions';
import DownloadForm from './forms/Download';
import ShareForm from './forms/Share';
import RejectForm from './forms/Reject';
import './stylesheet.scss';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

/**
 * Created by Trung Anh
 * created date 23/04/2017
 **/
class QuickView extends React.Component {
  tabsInkBarStyle = { backgroundColor: '#eb7374' };

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      showClass: '',
    };
    this.onHide = this.onHide.bind(this);
  }

  onTabChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  onHide() {
    const { dispatch } = this.props;
    dispatch(setShowQuickViewStatus(false));
  }

  render() {
    const { showQuickView, bodyScreenSize } = this.props;
    const showingClass = showQuickView ? 'show' : '';
    return (
      <div className={`ui-quick-view ${showingClass}`}>
        <div className="tabs-view-header">
          <Tabs
            onChange={this.onTabChange}
            value={this.state.slideIndex}
            className="tab-quick-view"
            inkBarStyle={this.tabsInkBarStyle}
          >
            <Tab label={t4('download')} value={0} />
            <Tab label={t4('share')} value={1} />
            <Tab label={t4('reject')} value={2} />
          </Tabs>
          <a className="close" onClick={this.onHide}>
            <i className="mi mi-close" />
          </a>
        </div>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.onTabChange}
        >
          <DownloadForm bodyScreenSize={bodyScreenSize} />
          <ShareForm bodyScreenSize={bodyScreenSize} />
          <RejectForm bodyScreenSize={bodyScreenSize} />
        </SwipeableViews>
        <div />
      </div>
    );
  }
}

const mapPropsToState = (state) => ({
  bodyScreenSize: state.common.bodyScreenSize,
  showQuickView: state.common.showQuickView,
});
export default connect(mapPropsToState)(QuickView);
