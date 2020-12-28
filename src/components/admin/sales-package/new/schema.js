import { t1, t } from 'translate';
import { inRange, required } from 'common/validators';
import InputFile from 'schema-form/elements/input-file';
import DatePicker from 'schema-form/elements/date-picker';
import React from 'react';

const schema = (formid, values) => {
  const price = parseInt(values.price || 0);
  return {
    name: {
      type: 'text',
      hintText: t1('sale_package_name'),
      floatingLabelText: t1('name'),
      validate: [required(t1('name_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    price: {
      type: 'number',
      hintText: t1('sale_package_price'),
      floatingLabelText: `${t1('price')} (VNĐ)`,
      validate: [
        required(t1('price_cannot_be_empty')),
        inRange(0, null, t1('value_must_be_greater_than_%s', [0])),
      ],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      min: 0,
    },
    reduced_price: {
      type: 'number',
      hintText: t1('sale_package_reduced_price'),
      floatingLabelText: `${t1('reduced_price')} (VNĐ)`,
      validate: [
        inRange(
          0,
          price,
          t1('value_must_be_greater_than_%s_and_less_than_%s', [0, price]),
        ),
      ],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      min: 0,
    },

    description: {
      type: 'text',
      multiLine: true,
      floatingLabelText: t1('package_overview_description'),
      defaultValue: '',
      fullWidth: true,
      errorText: '',
    },
    count_learner: {
      type: 'number',
      hintText: t1('sale_package_number_of_learner'),
      floatingLabelText: `${t1('number_of_learner')}`,
      validate: [
        required(t1('number_of_learner_cannot_be_empty')),
        inRange(0, null, t1('value_must_be_greater_than_%s', [0])),
      ],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      min: 0,
    },
    count_video: {
      type: 'number',
      hintText: t1('sale_package_number_of_video'),
      floatingLabelText: `${t1('number_of_video')}`,
      validate: [
        required(t1('number_of_video_cannot_be_empty')),
        inRange(0, null, t1('value_must_be_greater_than_%s', [0])),
      ],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      min: 0,
    },
    duration: {
      type: 'number',
      hintText: t1('duration_user_can_learn'),
      floatingLabelText: `${t1('package_duration')} (${t('month')})`,
      validate: [
        required(t1('duration_cannot_be_empty')),
        inRange(0, null, t1('value_must_be_greater_than_%s', [0])),
      ],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      min: 0,
    },
    avatar: {
      type: InputFile,
      accept: ['image/*'],
      floatingLabelText: t1('avatar_url'),
      fullWidth: true,
      renderAfter: () => <img src={values.avatar} alt="" height={100} />,
      //TODO
      // format: (value) => value && value.url,
      // normalize: (value) => ({ url: value }),
    },
    start_date: {
      type: DatePicker,
      floatingLabelText: t1('start_date'),
      fullWidth: true,
      minDate: -Infinity,
      maxDate: Math.min(values.end_date || Infinity, Infinity),
      getStartDate: true,
    },
    end_date: {
      type: DatePicker,
      floatingLabelText: t1('end_date'),
      fullWidth: true,
      minDate: Math.max(values.start_date || -Infinity, -Infinity),
      maxDate: Infinity,
      getEndDate: true,
    },
  };
};

const ui = (step, values) => {
  return [
    {
      id: 'default',
      fields: [
        'name',
        'description',
        'price',
        'reduced_price',
        'start_date',
        'end_date',
        'duration',
        'count_learner',
        'count_video',
        'avatar',
      ],
    },
  ];
};

export default { schema, ui };
