import React, { Component } from 'react';
import { t1 } from 'translate';
import SearchTakes from './Search';

class PeerTakes extends Component {
  render() {
    const { courseIid, questionIid, peerMarking } = this.props;

    return (
      <div>
        {!this.props.noTitle && (
          <h1>{t1('takes_by_all_students_in_course')}</h1>
        )}
        <SearchTakes
          courseIid={courseIid}
          questionIid={questionIid}
          peerMarking={peerMarking}
        />
      </div>
    );
  }
}

export default PeerTakes;
