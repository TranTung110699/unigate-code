import React from 'react';
import { t1 } from 'translate';

class ExamMethodGuide extends React.Component {
  render() {
    return (
      <div>
        {t1(
          'example_exam_shift:_starts_from_08:00_-_09:00_AM,_duration_60min,_contestants_can_come_10m_late',
        )}
        <hr />
        <b>{t1('fixed_time')}</b>
        <br />
        {t1('contestants_must_not_come_late')} <br />
        {t1(
          'note_that_some_exam_shifts_allow_some_certain_acceptable_duration_for_late_arrival',
        )}{' '}
        <br />
        e.g: {t1('contestant_cannot_come_after_08:11')} <br />
        <b>{t1('flexible_time')}</b>
        <br />
        {t1(
          'contestants_can_come_late_any_time_within_the_exam_shift_time_range',
        )}{' '}
        <br />
        e.g: {t1('contestants_can_come_at_08:55')}
        <hr />
        <b>{t1('full_duration')}</b>: <br />
        {t1("contestants_can_submit_after_the_shift's_end_time")} <br />
        {t1(
          "note_that_contestants_still_has_to_spend_less_than_the_exam's_allowed_duration",
        )}{' '}
        <br />
        e.g:{' '}
        {t1(
          'if_contestant_comes_at_08:20_(flexible_time),_he_can_still_continue_and_submit_at_09:20',
        )}{' '}
        <br />
        <br />
        <b>{t1('strict_duration')}</b>
        <br />
        {t1('contestants_has_to_submit_the_exam_before_the_shift_ends')} <br />
        e.g:{' '}
        {t1(
          'it_does_not_matter_exam_contestants_come_on-time_or_late,_they_must_submit_before_09:00',
        )}
      </div>
    );
  }
}

export default ExamMethodGuide;
