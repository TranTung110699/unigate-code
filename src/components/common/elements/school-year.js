import { t1 } from 'translate';
import apiUrls from 'api-endpoints';

const element = ({
  paramsasync,
  formid,
  multiple = true,
  forSearch = false,
  ...props
}) => ({
  type: 'select',
  multiple,
  hiddenWhenOptionEmpty: true,
  floatingLabelText: t1('school_year'),
  options: 'async',
  paramsasync: {
    __url__: apiUrls.semester_search,
    key: `${formid}-school-year`,
    value: {
      type: 'school_year',
      status: ['approved', 'queued'],
    },
    transformData: (data) =>
      Array.isArray(data) &&
      (!multiple && forSearch
        ? [
            {
              value: '',
              primaryText: t1('all'),
            },
          ]
        : []
      ).concat(
        data.map((op) => ({
          value: op.iid,
          primaryText: op.name,
        })),
      ),
    ...paramsasync,
  },
  fullWidth: true,
  ...props,
});

export default element;
