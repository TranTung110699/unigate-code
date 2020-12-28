import React from 'react';
import lGet from 'lodash.get';
import { t1 } from 'translate';
import requireRoot from 'common/hoc/requireRoot';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import { confirmDialogText } from './utils';
import Warning from 'components/common/Warning';

class ResetContestantResult extends React.Component {
  render() {
    const { contest, item } = this.props;
    return (
      <div>
        <DeleteItem
          alternativeApi={'/take/api/reset-takes-for-user'}
          params={{
            contest_code: lGet(contest, 'code'),
            course: lGet(item.current_contest, 'exam_shift_info.iid'),
            exam_round: lGet(item.current_contest, 'exam_round_info.iid'),
            examIid: lGet(item.current_contest, 'exam_round_info.syllabus'),
            uiid: lGet(item, 'iid'),
          }}
          formid="user_search"
          title={
            <Warning>{t1('reset_all_takes_in_this_exam_for_user')}</Warning>
          }
          icon="delete"
          label={t1('clear')}
          textConfirm={confirmDialogText(
            item,
            t1('do_you_want_to_reset_all_takes_in_this_exam_for_user?'),
          )}
        />
        <div>
          <DeleteItem
            alternativeApi={'/take/api/view-take-real-time'}
            params={{
              contest_code: lGet(contest, 'code'),
              course: lGet(item.current_contest, 'exam_shift_info.iid'),
              exam_round: lGet(item.current_contest, 'exam_round_info.iid'),
              examIid: lGet(item.current_contest, 'exam_round_info.syllabus'),
              uiid: lGet(item, 'iid'),
              examOrder: 1,
            }}
            formid="user_search"
            title={t1('view shit')}
            icon="view"
            label={t1('view')}
            textConfirm={confirmDialogText(
              item,
              t1('do_you_want_to_view_exam_data_for_this_user?'),
            )}
          />
        </div>
      </div>
    );
  }
}

export default requireRoot(ResetContestantResult);
