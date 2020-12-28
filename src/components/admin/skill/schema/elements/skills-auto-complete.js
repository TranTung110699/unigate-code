import { t1 } from 'translate';
import endpoints from 'api-endpoints';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const skillsAutoComplete = (
  subType = 'skill',
  dataSourceConfig = null,
  props = {},
) => {
  const defaultDataSourceConfig = {
    text: 'name',
    value: 'iid',
    transformData: (res) =>
      res.map((data) => ({
        iid: data.iid,
        name: data.name,
      })),
  };

  return {
    nameElement: 'skills',
    type: InputAutoComplete,
    baseUrl: endpoints.bank_search,
    floatingLabelText: t1('choose_skills'),
    fullWidth: true,
    dataSourceConfig: dataSourceConfig || defaultDataSourceConfig,
    params: {
      ntype: 'skill',
      subType,
      status: 'approved',
    },
    ...props,
  };
};

export default skillsAutoComplete;
