import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import getLodash from 'lodash.get';
import RaisedButton from 'components/common/mui/RaisedButton';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from 'components/admin/course/endpoints';
import { timestampToDateString } from 'common/utils/Date';
import Warning from 'components/common/Warning';

class CourseProgressSyncer extends Component {
  syncCourseRubricProgress = () => {
    const { dispatch, course } = this.props;

    const params = { iid: course.iid };
    const url = apiUrls.sync_course_progress_by_rubric;
    dispatch(
      sagaActions.getDataRequest(
        {
          url,
          // keyState: adminMenuItemsStoreKey('admin'),
          // executeOnSuccess: ({ applicableWorkingModes, menuAvailable }) => {
          //   dispatch(
          //     layoutContextAction.setApplicableWorkingModes(
          //       applicableWorkingModes,
          //     ),
          //   );
          //   this.setState({ menuAvailable, readyToDrawMenu: true });
          // },
          // executeOnFailure: () => {
          //   this.setState({ readyToDrawMenu: true });
          // },
        },
        params,
      ),
    );
  };

  render() {
    const { course } = this.props;
    return (
      <>
        <Warning>
          {t1('course_rubric_score_last_synced')} :{' '}
          {timestampToDateString(getLodash(course, 'last_synced'), {
            showTime: true,
          })}
          <RaisedButton
            onClick={this.syncCourseRubricProgress}
            label={t1('sync_progress_course')}
          />
        </Warning>
        {/*
        <div>
          {t1('course_rubric_score_last_sync_finished_at')} :{' '}
          {timestampToDateString(getLodash(course, 'sync_finished'), {
            showTime: true,
          })}
        </div>

           */}
      </>
    );
  }
}

export default connect()(CourseProgressSyncer);
