import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import evnApiUrls from 'components/admin/top-equivalent-position/endpoints';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

export const topEquivalentPosition = (configs) => ({
  nameElement: 'top-equivalent-position',
  type: InputAutoComplete,
  baseUrl: apiUrls.evn_equivalent_positions,
  floatingLabelText:
    configs.floatingLabelText || t1('choose_top_equivalent_position'),
  fullWidth: true,
  dataSourceConfig: {
    text: 'CDANHTDUONG_EVN',
    value: 'iid',
    transformData: (res) =>
      res.map((topEquivalent) => ({
        CDANHTDUONG_EVN: `${topEquivalent.CDANHTDUONG_EVN}`,
        iid: topEquivalent.iid,
      })),
  },
  ...(configs || {}),
});

export const evnEquivalentPositions = (formid) => ({
  type: 'select',
  multiple: true,
  fullWidth: true,
  options: 'async',
  floatingLabelText: t1('equivalent_job_positions'),
  hintText: t1('equivalent_job_positions'),
  paramsasync: {
    key: `${formid}-evn-equivalent-positions`,
    __url__: evnApiUrls.get_evn_equivalent_position_options,
    transformData: (result) =>
      Array.isArray(result) &&
      result.filter(Boolean).map((item) => ({
        value: item.CDANHTDUONG_EVN_ID,
        primaryText: item.CDANHTDUONG_EVN,
      })),
  },
});
