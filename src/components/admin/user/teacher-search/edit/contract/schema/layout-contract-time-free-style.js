import React from 'react';
import getLodash from 'lodash.get';

const layoutFreeStyle = (props) => {
  const fieldNames = getLodash(props, 'groups.default.fieldNames') || {};
  return (
    <div style={{ display: 'flex' }}>
      <div className="m-l-5 m-r-5">{fieldNames.start_time}</div>
      <div className="m-l-5 m-r-5">{fieldNames.end_time}</div>
      <div className="m-l-5 m-r-5 m-t-5">{fieldNames.days_of_week}</div>
    </div>
  );
};

export default layoutFreeStyle;
