import React from 'react';

const MinimalSearchRecap = ({ groups }) => {
  return Object.keys(groups).map((gId) => {
    const group = groups[gId];
    const groupFields = group.fieldNames;

    return (
      <React.Fragment key={gId}>
        {Object.keys(groupFields).map((fieldName) => {
          const field = groupFields[fieldName];
          return (
            <span className="d-inline-block m-b-5" key={fieldName}>
              {field}
            </span>
          );
        })}
      </React.Fragment>
    );
  });
};

export default MinimalSearchRecap;
