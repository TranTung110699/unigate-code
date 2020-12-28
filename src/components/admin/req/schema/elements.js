import { t1 } from 'translate';
import apiUrls from 'api-endpoints';

export const requestTypeElement = ({ paramsasync, ...props } = {}) => ({
  type: 'select',
  options: 'async',
  floatingLabelText: t1('group_request_type'),
  floatingLabelFixed: true,
  fullWidth: true,
  populateValue: true,
  paramsasync: {
    __url__: '/request-type/api/get-all-type-of-request-type',
    transformData: (data) => {
      if (!Array.isArray(data) || !data.length) {
        return [];
      }
      return [
        {
          value: null,
          label: t1('all'),
          primaryText: t1('all'),
        },
      ].concat(
        data.map((val) => ({
          value: val,
          label: t1(val),
          primaryText: t1(val),
        })),
      );
    },
    ...paramsasync,
  },
  ...props,
});

export const requestTypeIidElement = (
  { paramsasync, ...props } = {},
  values = {},
) => ({
  type: 'select',
  options: 'async',
  populateValue: true,
  floatingLabelText: t1('choose_request_type'),
  floatingLabelFixed: true,
  fullWidth: true,
  paramsasync: {
    __url__: apiUrls.request_type_search,
    value: {
      type: Array.isArray(values.request_type)
        ? values.request_type
        : [values.request_type],
      status: ['approved'],
      items_per_page: -1,
    },
    key: `request-type-by-${values && values.request_type}`,
    transformData: (data) => {
      if (!Array.isArray(data) || !data.length) {
        return [];
      }
      return data.map((val) => ({
        value: val.iid,
        label: val.name,
        primaryText: val.name,
      }));
    },
    ...paramsasync,
  },
  ...props,
});

export const statusElement = ({ paramsasync, ...props } = {}) => ({
  type: 'multiCheckbox',
  options: 'async',
  floatingLabelText: t1('status'),
  floatingLabelFixed: true,
  fullWidth: true,
  inline: true,
  paramsasync: {
    __url__: '/req/api/get-all-request-status',
    transformData: (data) => {
      if (!Array.isArray(data) || !data.length) {
        return [];
      }
      return data.map((val) => ({
        value: val,
        label: t1(val),
        primaryText: t1(val),
      }));
    },
    ...paramsasync,
  },
  ...props,
});
