import { t1 } from 'translate';

/**
 * return a select options to select
 * level could be 0
 * @type {*|string}
 */
export const generateLevelOptions = (level, forSearch = false) => {
  let i = 0;
  let options = [];

  if (!forSearch) {
    options = [
      {
        value: 0,
        primaryText: t1('syllabus_has_no_level'),
        label: t1('syllabus_has_no_level'),
      },
    ];
  }

  for (i = 1; i <= level; i++) {
    options.push({
      value: i,
      primaryText: t1(`syllabus_level_${i}`),
      label: t1(`syllabus_level_${i}`),
    });
  }
  return options;
};
