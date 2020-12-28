/* eslint-disable jsx-a11y/anchor-is-valid */
import modulePermissionSchema from './modulePermissionSchema';

const getAllPermissionModulesFromValues = (values) =>
  values.allPermissionModules || [];
const schema = (formid, values) =>
  getAllPermissionModulesFromValues(values).reduce(
    (finalSchema, module) => ({
      ...finalSchema,
      [module.id]: {
        type: 'section',
        schema: modulePermissionSchema,
      },
    }),
    {},
  );

const ui = (step, values) => {
  return getAllPermissionModulesFromValues(values).map((module) => ({
    id: module.id,
    title: module.name,
    fields: [module.id],
  }));
};

export default { schema, ui };
