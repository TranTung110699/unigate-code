import React from 'react';
import VideoPlayer from 'components/common/media-player/video';
import { getMediaPlayerId } from 'components/common/media-player/common';

class PhoneticDiff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      selectecItemChild: null,
      videoPlayerId: null,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const { selectedItemChild } = nextState;
    if (
      this.state.selectedItemChild !== selectedItemChild &&
      selectedItemChild
    ) {
      this.setState({
        videoPlayerId: getMediaPlayerId(selectedItemChild.vid),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { anotherVideoPlaying, onItemChildSelected } = this.props;
    const { selectedItemChild } = this.state;
    if (!prevProps.anotherVideoPlaying && anotherVideoPlaying) {
      this.clearSelected();
    }
    if (
      onItemChildSelected &&
      selectedItemChild &&
      prevState.selectedItemChild !== selectedItemChild
    ) {
      onItemChildSelected();
    }
  }

  setSelectedItem = (item) => {
    this.setState({
      selectedItem: item,
      selectedItemChild: item.children && item.children[0],
    });
  };

  setSelectedItemChild = (itemChild) => {
    this.setState({
      selectedItemChild: itemChild,
    });
  };

  clearSelected = () => {
    this.setState({
      selectedItem: null,
      selectedItemChild: null,
    });
  };

  handleItemChildSelected = (itemChild) => {
    const { onItemChildSelected } = this.props;
    this.setSelectedItemChild(itemChild);
    if (onItemChildSelected) {
      onItemChildSelected(itemChild);
    }
  };

  render() {
    const { phoneticDiff } = this.props;
    const { selectedItem, selectedItemChild, videoPlayerId } = this.state;
    if (!phoneticDiff) {
      return null;
    }

    return (
      <div className="recognize-phone-diff">
        <div className="recognize-phone-diff__diffs">
          {phoneticDiff.map((item) => (
            <button
              key={item.iid}
              className="recognize-phone-diff__diff"
              onClick={() => {
                this.setSelectedItem(item);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
        {selectedItemChild && (
          <div className="ui-guild-video-popup">
            <div className="close-popup" onClick={this.clearSelected}>
              <i className="mi mi-close" aria-hidden="true" />
            </div>

            <VideoPlayer
              key={videoPlayerId}
              width="100%"
              height="100%"
              playerId={videoPlayerId}
              controls
              youTubeId={`${selectedItemChild.vid}`}
              autoPlay
            />
            <div className="recognize-phone-diff__diff-children">
              {selectedItem.children.map((child, index) => (
                <button
                  key={child.iid}
                  className={`recognize-phone-diff__diff-child \
                    ${
                      index === selectedItem.children.length - 1
                        ? 'recognize-phone-diff__diff-child--last'
                        : ''
                    } \
                    ${
                      child === selectedItemChild
                        ? 'recognize-phone-diff__diff-child--selected'
                        : ''
                    }`}
                  onClick={() => this.handleItemChildSelected(child)}
                >
                  {child.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PhoneticDiff;
