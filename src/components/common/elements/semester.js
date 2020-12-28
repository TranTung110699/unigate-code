import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import getLodash from 'lodash.get';

const getParamsAsyncOptionSemester = (formid, values, xpath) => {
  const params = {
    type: 'semester',
    status: formid === 'new_plan' ? ['approved'] : ['approved', 'queued'],
  };

  if (formid === 'plan_search') {
    params.effective_time = Math.floor(new Date().getTime() / 1000);
  }

  params.school_year = getLodash(
    values,
    `${xpath ? `${xpath}.` : ''}school_year`,
  );

  return params;
};

const element = ({
  paramsasync,
  formid,
  values,
  xpath,
  multiple = true,
  forSearch = false,
  ...props
}) => {
  const schoolYear = getLodash(
    values,
    `${xpath ? `${xpath}.` : ''}school_year`,
  );

  return {
    type:
      Array.isArray(schoolYear) && schoolYear.length
        ? 'multiCheckbox'
        : 'select',
    floatingLabelText: t1('semester'),
    options: 'async',
    paramsasync: {
      key: `${formid}-${
        Array.isArray(schoolYear)
          ? values.school_year.join('-')
          : schoolYear || 'semester'
      }`,
      __url__: apiUrls.semester_search,
      value: getParamsAsyncOptionSemester(formid, values, xpath),
      transformData: (data) =>
        Array.isArray(data) &&
        (!multiple && forSearch
          ? [
              {
                value: '',
                label: t1('all'),
                primaryText: t1('all'),
              },
            ]
          : []
        ).concat(
          data.map((op) => {
            const label = `${getLodash(op, 'name')} (${getLodash(
              op,
              'start_month',
            )}/${getLodash(op, 'start_year')} - ${getLodash(
              op,
              'end_month',
            )}/${getLodash(op, 'end_year')})`;
            return {
              value: op.iid,
              label,
              primaryText: label,
            };
          }),
        ),
      ...paramsasync,
    },
    multiple,
    fullWidth: true,
    inline: true,
    ...props,
  };
};

export default element;
