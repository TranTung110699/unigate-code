import { required } from '../../../common/validators';

const selectAsync = (formid, isRequired) => {
  return {
    type: 'select',
    hintText: 'selectAsync: an async field. Fetch list from server',
    floatingLabelText: 'selectAsync: an async field. Fetch list from server',
    defaultValue: '1',
    errorText: 'Loading foo list from server....',
    // list will
    options: 'async',
    // multiple: true, it can also be multiple
    // paramsasync
    paramsasync: {
      // key: we need to store the list to a redux key, in formSchemaConfigs namespace
      // this way, if district & province are both async fields, and district depends on province,
      // each time province gets changed, district list can be gotten from store, in stead of requesting to the server *again*
      key: `${formid}-semester`,

      // value: parammeters to send along
      value:
        formid === 'plan_search'
          ? {
              effective_time: Math.floor(new Date().getTime() / 1000),
            }
          : {},

      // valueKey: usually server returns a list of objects for select box. The .iid is what
      // we wanna get from
      valueKey: 'iid',
      __url__: '/dev/schema-form/get',
      // __url__ : if you wanna use this url to request, if not it will get url from
      // @api-endpoints/form-schema-configs::getFormSchemaConfigs
    },

    fullWidth: true,
    // {// TODO get from server!!! yeild * api->getCourses()
    //   tf: 'True false',
    //   mc: 'Multiple Choice',
    //   inline: 'Inline',
    // },
    validate: isRequired ? [required('foo type cannot be empty')] : null,
  };
};

export default selectAsync;
