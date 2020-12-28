import React from 'react';
import TableResult from './table-result';

const Results = ({ result }) => {
  return (
    <div className="p-l-15 p-r-15">
      <TableResult result={result} />
    </div>
  );
};

export default Results;
