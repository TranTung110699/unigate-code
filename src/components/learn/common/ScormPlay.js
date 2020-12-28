import React from 'react';
import PropTypes from 'prop-types';
import FullScreen from 'components/common/full-screen';
import { scormPlayerLink } from 'components/admin/scorm/scorm';
import { isMobileBrowser } from 'common';
import Warning from '../../common/Warning';
import { t1 } from 'translate';

class ScormPlayer extends React.PureComponent {
  /*
  constructor(props) {
    super(props);
    this.state = {
      scormManifestUrlToBeSet: null,
      playerLoaded: false,
    };
  }

  setScormManifest = (scormManifestUrl) => {
    if (this.state.playerLoaded && this.player) {
      const playerDOMNode = findDOMNode(this.player);
      if (playerDOMNode) {
        playerDOMNode.contentWindow.postMessage(
          {
            type: 'SET_MANIFEST_URL',
            value: scormManifestUrl,
          },
          '*',
        );
      }
    } else {
      this.setState({
        scormManifestUrlToBeSet: scormManifestUrl,
      });
    }
  };

  handlePlayerLoaded = () => {
    const { scormManifestUrlToBeSet } = this.state;
    this.setState(
      {
        playerLoaded: true,
        scormManifestUrlToBeSet: null,
      },
      () => {
        if (scormManifestUrlToBeSet) {
          this.setScormManifest(scormManifestUrlToBeSet);
        }
      },
    );
    console.log({scormManifestUrlToBeSet});
  };

  componentDidMount() {
    const { scormDirectoryUrl } = this.props;
    this.setScormManifest(getScormManifestUrlByDirectoryUrl(scormDirectoryUrl));
  }

  componentDidUpdate(prevProps) {
    const { scormDirectoryUrl } = this.props;
    const { scormDirectoryUrl: prevScormDirectoryUrl } = prevProps;
    if (
      getScormManifestUrlByDirectoryUrl(scormDirectoryUrl) !==
      getScormManifestUrlByDirectoryUrl(prevScormDirectoryUrl)
    ) {
      this.setScormManifest(
        getScormManifestUrlByDirectoryUrl(scormDirectoryUrl),
      );
    }
  }
  */

  renderContent = () => {
    const { className } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <iframe
        className={componentClassName}
        ref={(el) => {
          this.player = el;
        }}
        style={{
          border: 'solid 1px #ddd',
          background: 'white',
          lineHeight: 1,
        }}
        src={scormPlayerLink(this.props.scormDirectoryUrl)}
        frameBorder="0"
        width="100%"
        height="100%"
      />
    );
  };

  render() {
    const width = this.props.width || '100%';
    const height = this.props.height || 708;

    return (
      <React.Fragment>
        {isMobileBrowser(true) && (
          <Warning>
            {t1(
              'this_is_a_scorm_file._it_might_not_play_on_your_mobile_phone_well._if_you_cannot_view_it,_please_learn_it_on_pc',
            )}
          </Warning>
        )}
        <FullScreen
          style={{
            width,
            height,
          }}
          renderContent={this.renderContent}
        />
      </React.Fragment>
    );
  }
}

ScormPlayer.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  scormDirectoryUrl: PropTypes.string.isRequired,
  width: PropTypes.number,
};

ScormPlayer.defaultProps = {
  className: '',
  height: null,
  scormDirectoryUrl: '',
  width: null,
};

export default ScormPlayer;
