import { required } from 'common/validators';
import { t1 } from 'translate';
import organizationApiUrls from 'components/admin/organization/endpoints';

export default (
  organizationIdentifier,
  { paramsasync = {}, ...props } = {},
) => ({
  type: 'select',
  hintText: organizationIdentifier,
  floatingLabelText: organizationIdentifier,
  validate: [required(t1('organization_cannot_be_empty'))],
  options: 'async',
  paramsasync: {
    __url__: organizationApiUrls.organization_search,
    params: {
      type: 'organization',
    },
    valueKey: 'iid',
    ...paramsasync,
  },
  defaultValue: '',
  errorText: '',
  fullWidth: true,
  ...props,
});
