import { t1 } from 'translate';
import contestApiUrls from 'components/admin/contest/endpoints';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

export const contests = (configs) => ({
  nameElement: 'contests',
  type: InputAutoComplete,
  baseUrl: contestApiUrls.get_contests,
  floatingLabelText: t1('choose_contests'),
  fullWidth: true,
  dataSourceConfig: {
    text: 'name',
    value: 'iid',
  },
  ...(configs || {}),
});
