import { schema } from 'normalizr';

/**
 http://stackoverflow.com/questions/41506533/how-to-define-schema-for-recursive-model-with-normalizr
 child = {
    id: 'childId',
    iid: 'childIid',
    duration: 'duration',
    children: [child]
  }
 apiNode = {
    id : 'id',
    name: 'name',
    children: [
        child
    ]
  }
 */
const apiNodeSchema = new schema.Entity(
  'apiNodeSchema',
  {},
  {
    idAttribute: 'iid',
    processStrategy: (value, parent, key) => {
      if (!value) {
        return value;
      }

      if (parent && parent.iid && key) {
        return {
          ...value,
          pid: parent.iid,
        };
      }

      return { ...value };
    },
  },
);

const children = new schema.Array(apiNodeSchema);
const scaled_children = new schema.Array(apiNodeSchema);
const questions = new schema.Array(apiNodeSchema);
apiNodeSchema.define({ children, scaled_children, questions });

export default apiNodeSchema;
