import React from 'react';
import './stylesheet.scss';

const searchFormLayout = ({ groups, submitButton }) => (
  <div className="container-fluid normal-course-search">
    <div className="row">
      <div className="col-md-12 background-white" style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1, marginRight: '10px' }}>
          {groups.id.fieldNames.q}
        </div>
        <div style={{ flexGrow: 1, marginRight: '10px' }}>
          {groups.id.fieldNames.score_scale}
        </div>
        <div style={{ flexGrow: 0, marginRight: -10 }} className="m-t-20">
          {submitButton}
        </div>
      </div>
    </div>
  </div>
);

export default searchFormLayout;
