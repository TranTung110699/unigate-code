import React from 'react';
import AntButton from 'antd/lib/button';

class AudioTester extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayAudio: false,
    };
  }

  audio = new Audio('/media/audio/victory.ogg');

  componentDidMount() {
    this.player.addEventListener('ended', (e) => {
      e.isTrusted &&
        this.setState({
          isPlayAudio: false,
        });
    });
  }

  toggleTestAudio = () => {
    this.setState({ isPlayAudio: !this.state.isPlayAudio }, () => {
      this.state.isPlayAudio ? this.player.play() : this.player.pause();
    });
  };

  render() {
    return (
      <div>
        <AntButton
          type="default"
          icon={this.state.isPlayAudio ? 'pause-circle' : 'play-circle'}
          onClick={this.toggleTestAudio}
          size="medium"
          style={{ minWidth: '175px' }}
        >
          <span
            style={{
              display: 'inline-block',
              color: 'inherit',
            }}
          >
            {this.state.isPlayAudio ? 'Pause' : 'Test audio'}
          </span>
        </AntButton>
        <audio src={this.audio.src} ref={(ref) => (this.player = ref)} hidden />
      </div>
    );
  }
}

export default AudioTester;
