export const addPropsToEverySchemaElements = (schema, newProps) => {
  if (!schema) {
    return schema;
  }

  const result = {};
  Object.keys(schema).forEach((fieldName) => {
    if (!schema[fieldName] || typeof schema[fieldName] !== 'object') {
      result[fieldName] = schema[fieldName];
    } else {
      result[fieldName] = Object.assign({}, schema[fieldName], newProps);
    }
  });
  return result;
};
