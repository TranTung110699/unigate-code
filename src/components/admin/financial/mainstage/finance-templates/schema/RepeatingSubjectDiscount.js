import { t1 } from 'translate';
import { inRange, required } from 'common/validators';

const schema = (formid, values) => {
  let tmp = {};
  if (values.maxNumberOfTimesToRepeatSubject) {
    for (let n = 0; n < values.maxNumberOfTimesToRepeatSubject; n += 1) {
      tmp[`elem_${n}`] = {
        type: 'number',
        min: 0,
        max: 100,
        floatingLabelText: t1(
          'percent_(%%)_discount_for_repeating_%s_time(s)',
          [n + 1],
        ),
        validate: [required(), inRange(0, 100)],
      };
    }
  }
  return tmp;
};

const ui = (step, values) => {
  const tmp = [
    {
      id: 'benefit',
      fields:
        (values.maxNumberOfTimesToRepeatSubject &&
          [...Array(values.maxNumberOfTimesToRepeatSubject).keys()].map(
            (n) => `elem_${n}`,
          )) ||
        [],
    },
  ];
  return tmp;
};

export default { schema, ui };
