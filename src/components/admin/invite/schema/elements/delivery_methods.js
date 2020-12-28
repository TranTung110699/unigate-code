import { t1 } from 'translate';
// import getFormSchemaConfigs from 'api-endpoints/form-schema-configs';
import schoolSchemaFormUrls from 'components/admin/school/school/endpoints/schema-form-urls';
const d = {
  type: 'multiCheckbox',
  defaultValue: '',
  floatingLabelText: t1('notify_user_via'),
  options: 'async',
  paramsasync: {
    __url__: schoolSchemaFormUrls('delivery_methods'),
  },
};

export default d;
