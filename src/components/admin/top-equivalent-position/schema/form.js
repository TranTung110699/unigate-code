import { t1 } from 'translate';
import { slugifier } from 'common/normalizers';

const schema = (formid, values) => ({
  CDANHTDUONG_EVN_CODE: {
    type: 'text',
    normalize: slugifier,
    floatingLabelText: t1('code'),
    // defaultValue: 'name',
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
  CDANHTDUONG_EVN: {
    type: 'text',
    floatingLabelText: t1('name'),
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
});

const ui = (step, values) => {
  switch (step) {
    case 'new_equivalent_position':
      return [
        {
          id: 'default',
          fields: ['CDANHTDUONG_EVN', 'CDANHTDUONG_EVN_CODE'],
        },
      ];

    case 'edit_equivalent_position':
      return [
        {
          id: 'default',
          fields: ['CDANHTDUONG_EVN', 'CDANHTDUONG_EVN_CODE'],
        },
      ];
    default:
      return [];
  }
};

export const getSchema = () => ({ schema, ui });

export default { schema, ui };
