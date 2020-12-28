import { t1 } from 'translate';

export const sexAsText = (sex) =>
  String(sex) === '1'
    ? t1('male')
    : String(sex) === '0'
    ? t1('female')
    : t1('n/a');
