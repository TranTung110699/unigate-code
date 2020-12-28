const sagaActions = {
  formSchemaConfigsRequest: (fieldName, formid, params, mappingAsync) => ({
    type: 'FORM_SCHEMA_CONFIGS_REQUEST',
    fieldName,
    formid,
    params,
    mappingAsync,
  }),
};

export default sagaActions;
