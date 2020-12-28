import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import lodashGet from 'lodash.get';
import CommonSelection from 'components/common/elements/common-selection';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

export const equivalentPositions = (formid, organizations) => ({
  type: 'select',
  multiple: true,
  fullWidth: true,
  options: 'async',
  floatingLabelText: t1('equivalent_job_positions_(in_selected_organizations)'),
  hintText: t1('equivalent_job_positions'),
  paramsasync: {
    key: `${formid}-equivalent-positions-${organizations}`,
    __url__: apiUrls.get_equivalent_position_options,
    transformData: (result) =>
      Array.isArray(result) &&
      result.filter(Boolean).map((item) => ({
        value: item.VTRICDANH_TDUONG_ID,
        primaryText: `${item.VTRICDANH_TDUONG} ${
          Array.isArray(organizations) && organizations.length > 1
            ? `(${lodashGet(item, 'organization.name')})`
            : ''
        }`,
      })),
    value: {
      organizations,
    },
  },
});

export const equivalentPositionsAutoComplete = (
  formid,
  componentElementEditor = null,
  configs = {},
  organizations = [],
) => ({
  type: InputAutoComplete,
  nameElement: 'equivalent_job_positions',
  componentElementEditor: componentElementEditor || CommonSelection,
  elementEditorProps: {
    fromValueToText: (value) => value.VTRICDANH_TDUONG,
  },
  baseUrl: apiUrls.get_equivalent_positions_for_input_auto_complete,
  params: {
    organizations,
    notRequiredOrganization: (organizations || []).length === 0 ? 1 : 0,
  },
  dataSourceConfig: {
    text: 'name',
    value: 'data',
    valueKeys: ['VTRICDANH_TDUONG', 'VTRICDANH_TDUONG_ID', 'id'],
    transformData: 'VTRICDANH_TDUONG',
  },
  floatingLabelText: t1('find_equivalent_job_positions'),
  fullWidth: true,
  ...(configs || {}),
});
