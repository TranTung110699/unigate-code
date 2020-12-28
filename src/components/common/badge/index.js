import React from 'react';

import Badge from 'antd/lib/badge';

const MyBadge = ({ count }) => {
  return (
    <Badge
      count={count}
      style={{ backgroundColor: 'green' }}
      overflowCount={1000000}
    />
  );
};

export default MyBadge;
