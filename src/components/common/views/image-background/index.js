import React from 'react';
import GggTop from 'layouts/ggg-theme/top/menu';
import { layouts } from 'configs/constants';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 20/05/2017
 * */
class VideoBackGround extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { width, src, className, themeConfig } = this.props;
    const height = [layouts.EVN, layouts.SEABANK, layouts.MSI].includes(
      themeConfig.layout,
    )
      ? 350
      : this.props.height;
    return (
      <div>
        {themeConfig.layout === layouts.ETEC ? (
          <div />
        ) : (
          <div
            className={`ui-img-banner ${className}`}
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            <div className="video-panel">
              <img src={src} className="fullscreen" />
            </div>
            <div
              className="text-panel"
              style={{ width: `${width}px`, height: `${height}px` }}
            >
              {this.props.children}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProp = (state) => ({
  themeConfig: getThemeConfig(state),
});

export default connect(mapStateToProp)(VideoBackGround);
