import React from 'react';
import get from 'lodash.get';

const layoutFreestyle = (props) => {
  const { submitButton } = props;

  const fieldNames = get(props, 'groups.default.fieldNames');
  const title = get(props, 'groups.default.title');

  return (
    <div>
      {title && <h3 className="text-center">{title}</h3>}
      {fieldNames &&
        Object.keys(fieldNames).map((fieldName) => (
          <div>{fieldNames[fieldName]}</div>
        ))}
      <div className="text-center">{submitButton}</div>
    </div>
  );
};

export default layoutFreestyle;
