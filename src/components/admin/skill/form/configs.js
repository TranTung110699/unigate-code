import { t1 } from 'translate';

export const dateUnitSelect = [
  {
    value: 'day',
    primaryText: t1('day'),
  },
  {
    value: 'week',
    primaryText: t1('week'),
  },
  {
    value: 'month',
    primaryText: t1('month'),
  },
  {
    value: 'year',
    primaryText: t1('year'),
  },
];

export const scoreUnitSelect = [
  {
    value: 'point',
    primaryText: t1('points'),
  },
  {
    value: 'percent',
    primaryText: t1('percent'),
  },
];

export const totalAspectsScore = (aspect) => {
  let sum = 0;
  Object.keys(aspect).forEach((key) => {
    if (key !== 'pass_score' && key !== 'effort_sources')
      sum += parseFloat(aspect[key]);
  });
  return sum;
};

export const effortSourcesMultiCheckboxOptions = [
  {
    value: 'own',
    label: t1('own_effort(score_based_on_performing_directly'),
  },
  {
    value: 'bottomup',
    label: t1('bottom_up(score_aggregated_from_sub_skills'),
  },
  {
    value: 'topdown',
    label: t1('top_down(score_populated_from_parent_skill'),
  },
];
