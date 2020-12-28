import React from 'react';
import Tag from 'antd/lib/tag';

const DefaultFormElementRecap = ({ label, content }) => (
  <Tag
    style={{
      borderColor: 'gray',
      color: 'gray',
      paddingLeft: content ? 0 : 7,
    }}
  >
    {content ? (
      <React.Fragment>
        <Tag
          color="gray"
          className="user-select-none"
          style={{ borderRadius: 0 }}
        >
          {label}
        </Tag>
        {content}
      </React.Fragment>
    ) : (
      <React.Fragment>{label}</React.Fragment>
    )}
  </Tag>
);

export default DefaultFormElementRecap;
