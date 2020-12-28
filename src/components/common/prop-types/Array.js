/**
 * Created by quandv on 22/04/17.
 */
import PropTypes from 'prop-types';

// validate - customized prop-type to check an Object which has dynamic params: { ({string(key): string(value)})* }
const ObjectStrStr = (array, index, component, path, propFullName) => {
  const obj = array[index];
  const props = {};
  props[propFullName] = obj;

  // Check if `obj` is an Object
  const isObjErr = PropTypes.object(props, propFullName, component, path);
  if (isObjErr) return isObjErr;

  // Check if all keys are strings
  const validObjKeys = PropTypes.objectOf(PropTypes.string);
  const validObjKeysErr = validObjKeys(props, propFullName, component);
  if (validObjKeysErr) return validObjKeysErr;

  // Check if all values are strings
  const validObjValues = PropTypes.objectOf(PropTypes.string);
  const validObjValuesErr = validObjValues(
    props,
    propFullName,
    component,
    path,
  );
  if (validObjValuesErr) return validObjValuesErr;

  return null;
};

export { ObjectStrStr };
