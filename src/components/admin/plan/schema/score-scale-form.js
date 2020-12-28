import { t1 } from 'translate';
import { inRange, required } from 'common/validators';
import apiUrls from 'api-endpoints';
import { scoreScaleTypes } from 'configs/constants';
import get from 'lodash.get';

const elementScoreScale = {
  type: 'select',
  hiddenWhenOptionEmpty: true,
  floatingLabelText: t1('score_scale'),
  options: 'async',
  paramsasync: {
    __url__: apiUrls.get_all_score_scale,
  },
  fullWidth: true,
  inline: true,
  validate: [required(t1('score_scale_cannot_empty'))],
};

const elementExchangeP = (values, defaultValues) => ({
  type: 'number',
  step: 1,
  classWrapper: 'col-md-4',
  min: 0,
  defaultValue:
    typeof get(values, 'exchange.p') !== 'undefined'
      ? get(values, 'exchange.p')
      : get(defaultValues, 'exchange.p') || 0,
  floatingLabelText: t1('p'),
  fullWidth: true,
  validate: [
    required(t1('value_is_required')),
    inRange(
      0,
      get(values, 'exchange.m') - 1 || 10000,
      t1('value_must_be_between_%s_and_exchange_m', [0]),
    ),
  ],
});
const elementExchangeM = (values, defaultValues) => ({
  type: 'number',
  step: 1,
  min: 0,
  classWrapper: 'col-md-4',
  defaultValue:
    typeof get(values, 'exchange.m') !== 'undefined'
      ? get(values, 'exchange.m')
      : get(defaultValues, 'exchange.m') || 1,
  floatingLabelText: t1('m'),
  fullWidth: true,
  validate: [
    required(t1('value_is_required')),
    inRange(
      get(values, 'exchange.p') + 1,
      get(values, 'exchange.d') - 1 || 10000,
      t1('value_must_be_between_exchange_p_and_exchange_d'),
    ),
  ],
});
const elementExchangeD = (values, defaultValues) => ({
  classWrapper: 'col-md-4',
  type: 'number',
  step: 1,
  min: 0,
  defaultValue:
    typeof get(values, 'exchange.d') !== 'undefined'
      ? get(values, 'exchange.d')
      : get(defaultValues, 'exchange.d') || 2,
  floatingLabelText: t1('d'),
  fullWidth: true,
  validate: [
    required(t1('value_is_required')),
    inRange(
      get(values, 'exchange.m') + 1,
      null,
      t1('value_must_be_bigger_exchange_m'),
    ),
  ],
});

const elementSummaryFrom = (values, filed, defaultValues) => ({
  type: 'number',
  step: 1,
  classWrapper: 'col-md-6',
  defaultValue: get(defaultValues, `summary.${filed}.from`) || 0,
  floatingLabelText: t1(`${filed}_from`),
  fullWidth: true,
});

const elementSummaryTo = (values, filed, defaultValues) => ({
  type: 'number',
  step: 1,
  classWrapper: 'col-md-6',
  defaultValue:
    get(defaultValues, `summary.${filed}.to`) || (filed === 'd' ? null : 0),
  floatingLabelText: t1(`${filed}_to`),
  fullWidth: true,
});

const elementSummary = (values, field, defaultValues) => ({
  type: 'section',
  schema: {
    schema: () => ({
      from: elementSummaryFrom(values, field, defaultValues),
      to: elementSummaryTo(values, field, defaultValues),
    }),
    ui: () => [
      {
        id: `summary_${field}`,
        fields: ['from', 'to'],
      },
    ],
  },
});

const applyScoreScaleBySpecializationSchema = (
  specializations,
  defaultValues = {},
) => ({
  schema: (formid, values, step, xpath) => {
    const valueSpecialization = get(values, xpath) || {};
    const specializationIidsApplied =
      get(values, 'specializations', []).map((map) => map.specialization) || [];

    const options = specializations
      .filter(
        (map) =>
          !specializationIidsApplied.includes(get(map, 'specialization.iid')) ||
          get(map, 'specialization.iid') === valueSpecialization.specialization,
      )
      .map((map) => {
        const label = get(map, 'specialization.name');
        return {
          value: get(map, 'specialization.iid'),
          label,
          primaryText: label,
        };
      });

    return Object.assign(
      {
        specialization: {
          type: 'select',
          name: 'type',
          fullWidth: true,
          floatingLabelText: t1('specialization'),
          floatingLabelFixed: true,
          populateValue: true,
          options,
          validate: [required(t1('specialization_cannot_be_empty'))],
        },
      },
      schemaEditScoreScale({ values: valueSpecialization, defaultValues }),
    );
  },
  ui: (step, values, themeConfig, xpath) =>
    [
      {
        id: 'specialization',
        fields: ['specialization'],
      },
    ].concat(getUi({ values: get(values, xpath) })),
});

const schemaEditScoreScale = ({ values, specializations, defaultValues }) => {
  const result = {
    score_scale: elementScoreScale,
  };

  if (values && values.score_scale === scoreScaleTypes.pmd) {
    Object.assign(result, {
      exchange: {
        type: 'section',
        schema: {
          schema: () => ({
            p: elementExchangeP(values, defaultValues),
            m: elementExchangeM(values, defaultValues),
            d: elementExchangeD(values, defaultValues),
          }),
          ui: () => [
            {
              id: 'exchange',
              fields: ['p', 'm', 'd'],
            },
          ],
        },
      },
      summary: {
        type: 'section',
        schema: {
          schema: () => ({
            p: elementSummary(values, 'p', defaultValues),
            m: elementSummary(values, 'm', defaultValues),
            d: elementSummary(values, 'd', defaultValues),
          }),
          ui: () => [
            {
              id: 'summary',
              fields: ['p', 'm', 'd'],
            },
          ],
        },
      },
    });
  }

  if (Array.isArray(specializations) && specializations.length) {
    result.specializations = {
      type: 'array',
      floatingLabelText: t1('score_scale_by_specialization'),
      schema: applyScoreScaleBySpecializationSchema(
        specializations,
        defaultValues,
      ),
      hiddenAddButton:
        specializations.length <=
        ((values && values.specializations && values.specializations.length) ||
          0),
    };
  }

  return result;
};

const getUi = ({ values, specializations }) => {
  let res = [
    {
      id: 'default',
      fields: ['score_scale'],
    },
  ];

  if (values && values.score_scale === scoreScaleTypes.pmd) {
    res = res.concat([
      {
        title: t1('exchange'),
        id: 'exchange',
        fields: ['exchange'],
      },
      {
        title: t1('summary'),
        id: 'summary',
        fields: ['summary'],
      },
    ]);
  }

  if (Array.isArray(specializations) && specializations.length) {
    res = res.concat([
      {
        id: 'specializations',
        fields: ['specializations'],
      },
    ]);
  }

  return res;
};

export default ({ specializations, defaultValues }) => ({
  schema: (formid, values) =>
    schemaEditScoreScale({ values, specializations, defaultValues }),
  ui: (step, values) => getUi({ values, specializations }),
});
