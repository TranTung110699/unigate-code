import { itemDuration } from 'components/common/elements/duration';
import { durationDisplayFormats } from 'schema-form/elements/duration/smaller-than-one-day/common/constants';
import { t1 } from 'translate';
import { convertBooleanValueToInt } from 'common/normalizers';

const checkbox = (key, label) => ({
  type: 'checkbox',
  label: label,
  fullWidth: true,
  normalize: convertBooleanValueToInt,
});

const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  return {
    duration: itemDuration({
      defaultValue: '00:10:00',
      formatTime: durationDisplayFormats.TIME_IN_SECOND_FORMAT,
      title: t1('exam_duration'),
    }),
    options: {
      type: 'section',
      schema: {
        schema: {
          disable_question_audio_replay: checkbox(
            'disable_question_audio_replay',
            t1('disable_question_audio_replay'),
          ),
          retake_requires_admin_acceptance: checkbox(
            'retake_requires_admin_acceptance',
            t1('retake_requires_admin_acceptance'),
          ),
          can_do: {
            type: 'number',
            min: 0,
            hintText: t1('number_of_times_students_can_do'),
            floatingLabelText: t1('number_of_times_students_can_do'),
            fullWidth: true,
          },
        },
        ui: () => [
          {
            id: 'default',
            fields: [
              'disable_question_audio_replay',
              'retake_requires_admin_acceptance',
              'can_do',
            ],
          },
        ],
      },
    },
  };
};

const ui = () => {
  return [
    {
      id: 'id',
      fields: ['duration', 'options'],
    },
  ];
};

export default { ui, schema };
