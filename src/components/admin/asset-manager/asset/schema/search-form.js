import { t1 } from 'translate';
import { assetCategories } from 'components/admin/asset-manager/category/schema/elements';
import { dateGreaterThan, dateLessThan } from 'common/validators';
import { UiLibs } from 'configs/constants';
import AssetSearchFormDetailFreestyle from '../search/AssetSearchFormLayoutFreestyle';
import DateTimePicker from 'schema-form/elements/date-time-picker';

const schema = (formid, values) => ({
  code: {
    type: 'text',
    hintText: t1('enter_asset_code'),
    floatingLabelText: t1('asset_code'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  start_date: {
    type: DateTimePicker,
    uiLib: UiLibs.ANT,
    getStartDate: true,
    validate: [
      dateLessThan(values.end_date, t1('start_date_must_be_before_end_date')),
    ],
    floatingLabelText: t1('start_date_requested'),
    fullWidth: true,
    maxDate: values.end_date,
  },
  end_date: {
    type: DateTimePicker,
    uiLib: UiLibs.ANT,
    getEndDate: true,
    floatingLabelText: t1('end_date_requested'),
    validate: [
      dateGreaterThan(
        values.start_date,
        t1('end_date_must_be_after_start_date'),
      ),
    ],
    fullWidth: true,
    minDate: values.start_date,
  },
  category_iid: assetCategories(formid, {
    floatingLabelText: `${t1('choose_asset_categories')}`,
  }),
});

const ui = () => {
  const fields = ['code', 'category_iid', 'start_date', 'end_date'];

  return [
    {
      id: 'id',
      fields,
    },
  ];
};

export default {
  schema,
  ui,
  layout: {
    component: AssetSearchFormDetailFreestyle,
    freestyle: 1,
  },
};
