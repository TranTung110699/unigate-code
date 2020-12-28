import React from 'react';
import lodashGet from 'lodash.get';
import Report from './report';

const BDTXReport = ({ match }) => {
  const id = lodashGet(match, 'params.id');
  return (
    <div className="whitebox">
      <h1>BDTX {id}</h1>
      <Report />
    </div>
  );
};

export default BDTXReport;
