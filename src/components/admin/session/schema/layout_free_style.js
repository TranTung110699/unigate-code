import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import Card from 'antd/lib/card';

const LayoutFreeStyle = (props) => {
  const fieldNames = get(props, 'groups.default.fieldNames');
  if (!fieldNames) {
    return null;
  }
  const { submitButton } = props;
  const { credit, practice_credit, theory_credit, name } =
    get(props, 'layoutOptionsProperties.syllabus') || {};

  return (
    <Card>
      {credit && (
        <h3>
          {t1('total_credit:_%s', credit)}
          {practice_credit > 0 && (
            <span className="m-l-20">{`${t1(
              'practice_credit',
            )}: ${practice_credit}`}</span>
          )}
          {theory_credit > 0 && (
            <span className="m-l-20">{`${t1(
              'theory_credit',
            )}: ${theory_credit}`}</span>
          )}
        </h3>
      )}
      {fieldNames.number_class_hour}
      {fieldNames.count}
      {fieldNames.location}
      {fieldNames.room_types}
      {fieldNames.learn_duration}
      {fieldNames.break_time}
      <div className="text-center">{submitButton}</div>
    </Card>
  );
};

export default LayoutFreeStyle;
