import React from 'react';
import { getDisplayInfoOfFeeStatus } from 'configs/constants';
import { t1 } from 'translate';
import get from 'lodash.get';

export const displayUserFeesStatusForClassGroup = (item) => {
  const teachingPlanFeeInfo = item.teaching_plan_fee_info;

  if (teachingPlanFeeInfo && teachingPlanFeeInfo.fee) {
    const display = getDisplayInfoOfFeeStatus(
      teachingPlanFeeInfo.fee.status,
      teachingPlanFeeInfo.fee.end_date,
    );
    return (
      <div>
        {t1('fee_%s', get(teachingPlanFeeInfo, 'fee.name'))}:{' '}
        <span style={{ color: display.color }}>{display.text}</span>
      </div>
    );
  }

  const courseFeesInfo = item.course_fees_info;
  if (
    Array.isArray(courseFeesInfo) &&
    courseFeesInfo.length > 0 &&
    courseFeesInfo.some((elem) => elem && elem.fee)
  ) {
    return (
      <ul>
        {courseFeesInfo.map((info) => {
          const display =
            !info || !info.fee
              ? { color: 'red', text: t1('no_fee') }
              : getDisplayInfoOfFeeStatus(info.fee.status, info.fee.end_date);

          return (
            <li>
              {t1('class_%s', get(info, 'course.name'))}:{' '}
              <span style={{ color: display.color }}>{display.text}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div style={{ color: 'red' }}>
      {t1('there_are_no_fees_for_this_student')}
    </div>
  );
};

export const displayUserFeesStatusForCourse = (user) => {
  if (!user || !user.fee) {
    return (
      <div style={{ color: 'red' }}>
        {t1('there_are_no_fees_for_this_student')}
      </div>
    );
  }

  const display = getDisplayInfoOfFeeStatus(
    get(user, 'fee.status'),
    get(user, 'fee.end_date'),
  );

  return (
    <div>
      {t1('fee_%s', get(user, 'fee.name'))}:{' '}
      <span style={{ color: display.color }}>{display.text}</span>
    </div>
  );
};
