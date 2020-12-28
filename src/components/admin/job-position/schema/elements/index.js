import lodashGet from 'lodash.get';
import apiUrls from 'api-endpoints';
import jApiUrls from 'components/admin/job-position/endpoints';
import { t1 } from 'translate';
import CommonSelection from 'components/common/elements/common-selection';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

export const positions = (
  formid,
  configs,
  organizations,
  filterParams = {},
) => {
  const key = `${formid}-positions-${
    Array.isArray(organizations) && organizations.length
      ? organizations.join('_')
      : organizations
  }`;
  return {
    type: 'select',
    multiple: true,
    fullWidth: true,
    options: 'async',
    floatingLabelText: t1('job_positions_(in_selected_organizations)'),
    hintText: t1('job_positions'),
    paramsasync: {
      key,
      __url__: jApiUrls.get_job_position_options,
      transformData: (result) =>
        result &&
        result.map((item) => ({
          value: item.iid,
          primaryText: `${item.name} ${item.code ? `(${item.code})` : ''} ${
            Array.isArray(organizations) && organizations.length > 1
              ? `(${lodashGet(item, 'organizations', [])
                  .filter(Boolean)
                  .map((org) => org.name)
                  .join(',')})`
              : ''
          }`,
        })),
      value: {
        organizations,
        ...(filterParams || {}),
      },
    },
    ...(configs || {}),
  };
};

export const positionsAutoComplete = (
  formid,
  componentElementEditor = null,
  configs = {},
  organizations = [],
) => ({
  type: InputAutoComplete,
  nameElement: 'job_positions',
  componentElementEditor: componentElementEditor || CommonSelection,
  elementEditorProps: {
    fromValueToText: (value) =>
      `${value.name} ${value.code ? `(${value.code})` : ''}`,
  },
  baseUrl: jApiUrls.get_job_positions_for_input_auto_complete,
  params: {
    organizations,
    notRequiredOrganization: (organizations || []).length === 0 ? 1 : 0,
  },
  dataSourceConfig: {
    text: 'name',
    value: 'data',
    valueKeys: ['name', 'iid', 'code'],
    transformData: true,
  },
  floatingLabelText: t1('find_job_positions'),
  fullWidth: true,
  ...(configs || {}),
});
