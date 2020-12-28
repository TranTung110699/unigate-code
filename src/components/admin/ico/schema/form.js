import { t1 } from 'translate';
import { required } from 'common/validators';
import { max, min } from 'configs/applicableSchoolYears';
import { generateSelectOptionsInRange } from 'common/utils/form';
import { monthsSelect } from 'common/utils/Date';
import { slugifier } from 'common/normalizers';

const currentYear = new Date().getFullYear();

const schema = () => ({
  code: {
    type: 'text',
    hintText: t1('enter_code_of_ico'),
    floatingLabelText: t1('ico_code'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1('code_cannot_be_empty'))],
    normalize: slugifier,
  },
  name: {
    type: 'text',
    hintText: t1('ico_name'),
    floatingLabelText: t1('ico_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1('ico_name_cannot_be_empty'))],
  },
  start_year: {
    type: 'select',
    hintText: t1('start_year'),
    floatingLabelText: t1('start_year'),
    defaultValue: currentYear,
    errorText: '',
    fullWidth: true,
    options: generateSelectOptionsInRange(min, max, 1),
    validate: [required(t1('start_year_cannot_be_empty'))],
  },
  start_month: {
    type: 'select',
    hintText: t1('start_month'),
    floatingLabelText: t1('start_month'),
    defaultValue: 9,
    errorText: '',
    fullWidth: true,
    options: monthsSelect,
    validate: [required(t1('start_month_cannot_be_empty'))],
  },
});

const defaultFields = ['code', 'name', 'start_year', 'start_month'];

const ui = {
  new: [
    {
      id: 'default',
      fields: defaultFields,
    },
  ],
  edit: [
    {
      id: 'default',
      fields: ['name', 'start_year', 'start_month'],
    },
  ],
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
