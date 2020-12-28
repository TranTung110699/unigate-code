import React from 'react';
import TableResult from './table-result';

const Results = ({ items }) => {
  return (
    <div className="p-l-15 p-r-15">
      <TableResult items={items} />
    </div>
  );
};

export default Results;
