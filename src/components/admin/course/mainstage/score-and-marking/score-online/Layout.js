import React from 'react';
import { isOfflineExam } from 'common/learn';
import NormalScore from './normal/Layout';
import Offline from './offline/Layout';
import { CourseActions } from 'configs/constants/permission';
import get from 'lodash.get';

class LayoutContainer extends React.Component {
  render() {
    const { hasPermission, node, permissions } = this.props;
    const hasPermSubmitFileTranscript =
      hasPermission &&
      hasPermission(
        CourseActions.COURSE_ACTION_UPDATE_FILE_TRANSCRIPT,
        get(node, 'iid'),
        permissions,
      );
    const hasPermUpdateTranscriptStatus =
      hasPermission &&
      hasPermission(
        CourseActions.COURSE_ACTION_UPDATE_TRANSCRIPT_STATUS,
        get(node, 'iid'),
        permissions,
      );
    const C = isOfflineExam(node) ? Offline : NormalScore;
    return (
      <C
        {...this.props}
        hasPermSubmitFileTranscript={hasPermSubmitFileTranscript}
        hasPermUpdateTranscriptStatus={hasPermUpdateTranscriptStatus}
      />
    );
  }
}

export default LayoutContainer;
