import React from 'react';
import Row from 'antd/lib/grid/row';
import Item from './Item';
import lGet from 'lodash.get';

const Program = (props) => {
  const { items } = props;

  return (
    <Row gutter={24} className="m-0">
      {items && items.length
        ? items.map((item) => <Item item={item} {...props} />)
        : null}
    </Row>
  );
};

export default Program;
