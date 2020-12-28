import React, { Component } from 'react';
import { t1 } from 'translate';
import ReportOfQuestionEndedMarkingByRubric from 'components/admin/report/node/ReportOfQuestionOpenEndedMarkingByRubric';

class PeerTakes extends Component {
  render() {
    const {
      courseIid,
      question,
      rubricIidsToShowMarking,
      peerMarking,
    } = this.props;

    const node = {
      iid: courseIid,
      ntype: 'course',
    };

    // TODO: add other reports, such as aggregate of all users taking the syllabus
    return (
      <ReportOfQuestionEndedMarkingByRubric
        peerMarking={peerMarking}
        question={question}
        nodeEditer={node}
        rubricIidsToShowMarking={rubricIidsToShowMarking}
      />
    );
  }
}

export default PeerTakes;
