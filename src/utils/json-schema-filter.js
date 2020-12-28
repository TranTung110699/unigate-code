const filterObjectOnSchema = (schema, doc) => {
  let results;

  // console.log("DOC: ", JSON.stringify(doc, null, 2));
  // console.log("SCH: ", JSON.stringify(schema, null, 2));

  if (schema.type === 'object') {
    results = {}; // holds this levels items

    // process properties  -  recursive
    Object.keys(schema.properties).forEach((key) => {
      if (doc[key] !== undefined) {
        if (doc[key] === null) {
          results[key] = doc[key];
        } else {
          const sp = schema.properties[key];
          if (sp.type === 'object') {
            // check if property-less object (free-form)
            if (Object.prototype.hasOwnProperty.call(sp, 'properties')) {
              results[key] = filterObjectOnSchema(sp, doc[key]);
            } else if (Object.keys(doc[key]).length > 0) {
              results[key] = doc[key];
            }
          } else if (sp.type === 'array') {
            if (doc[key]) results[key] = filterObjectOnSchema(sp, doc[key]);
          } else if (
            sp.type === 'boolean' ||
            sp.type === 'number' ||
            sp.type === 'integer' ||
            sp.type === 'string' ||
            sp.type === 'float'
          ) {
            if (typeof doc[key] !== 'undefined') results[key] = doc[key];
          } else {
            results[key] = doc[key];
          }
        }
      }
    });
  } else if (schema.type === 'array') {
    // arrays can hold objects or literals
    if (schema.items.type === 'object') {
      results = [];
      doc.forEach((item) => {
        results.push(filterObjectOnSchema(schema.items, item));
      });
    } else {
      results = doc;
    }
  }

  return results;
};

export default filterObjectOnSchema;
