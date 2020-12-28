import React from 'react';
import screenfull from 'screenfull';
import { findDOMNode } from 'react-dom';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import './stylesheet.scss';

class FullScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFullscreen: false,
    };
    // if (screenfull && screenfull.enabled) {
    //   screenfull.on('change', () => {
    //     this.setState({
    //       isFullscreen: screenfull.isFullscreen,
    //     });
    //   });
    // }
  }

  fullscreen = () => {
    if (screenfull && screenfull.enabled) {
      screenfull.request(findDOMNode(this));
      screenfull.on('change', () => {
        this.setState({
          isFullscreen: !this.state.isFullscreen && screenfull.isFullscreen,
        });
      });
    }
  };

  exitFullscreen = () => {
    if (screenfull && screenfull.enabled) {
      screenfull.exit();
      screenfull.on('change', () => {
        this.setState({
          isFullscreen: !this.state.isFullscreen && screenfull.isFullscreen,
        });
      });
    }
  };

  render() {
    const { className, renderContent, style } = this.props;
    const { isFullscreen } = this.state;

    return (
      <div
        style={style}
        className={`full-screen-component\
          ${isFullscreen ? 'full-screen-component--fullscreen' : ''}\
          ${className || ''}`}
        ref={(el) => {
          this.lecturePdf = el;
        }}
      >
        <button
          className="full-screen-component__fullscreen-button"
          onClick={isFullscreen ? this.exitFullscreen : this.fullscreen}
        >
          {isFullscreen ? (
            <Icon icon="fullscreen-exit" title={t1('exit_fullscreen')} />
          ) : (
            <Icon icon="fullscreen" title={t1('view_fullscreen')} />
          )}
        </button>
        {renderContent()}
      </div>
    );
  }
}

export default FullScreen;
