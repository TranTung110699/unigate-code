import { t1 } from 'translate';
import React from 'react';
import { connect } from 'react-redux';
import Roleplay from './exercise/role-play';
import VideoPlayer from './video/VideoPlayer';
import Vocabset from './vocabset';
import Exercise from './exercise';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 27/04/2017
 * */
let videoNumber = 0;
let vocabsetNumber = 0;

class ScoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props;

    switch (item && item.ntype) {
      case 'video': {
        videoNumber += 1;
        return <VideoPlayer itemIid={item.iid} itemNumber={videoNumber} />;
      }
      case 'vocabset': {
        if (item.type === 'roleplay') {
          return <Roleplay vocabsetIid={item.iid} />;
        }
        vocabsetNumber += 1;
        const vid = `${vocabsetNumber}-${item.iid}`;
        return (
          <div className="learn-one-page-vocabset-block">
            <div className="title-block">{t1('pronunciation_practice')}</div>
            <Vocabset
              vid={vid}
              itemNumber={vocabsetNumber}
              vocabsetIid={item.iid}
            />
          </div>
        );
      }
      case 'exercise': {
        if (item.type === 'dictation') {
          return null;
        }
        return <Exercise exerciseIid={item.iid} />;
      }
      default: {
        return <div />;
      }
    }
  }
}

const mapStateToProps = (state, props) => {
  const nodes = state.tree;
  const { itemIid } = props;
  const item = nodes[itemIid];

  return {
    item,
  };
};

export default connect(mapStateToProps)(ScoItem);
