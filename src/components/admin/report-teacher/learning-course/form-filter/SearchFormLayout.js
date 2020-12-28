import React from 'react';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';

export default ({ groups, submitButton, handleExport, formValues }) => (
  <div className="container-fluid elementGroup">
    <div className="row">
      <div className="col-md-12">{groups.id.fieldNames.major}</div>
      <div className="col-md-3">{groups.id.fieldNames.start_date}</div>
      <div className="col-md-3">{groups.id.fieldNames.end_date}</div>
      <div className="col-md-3">{groups.id.fieldNames.learning_shift}</div>
      <div
        className="col-md-3"
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        {groups.id.fieldNames.start_time}
        &nbsp;&nbsp;&nbsp;
        {groups.id.fieldNames.end_time}
      </div>
      <div className="col-md-3">{groups.id.fieldNames.course}</div>
      <div className="col-md-3">{groups.id.fieldNames.subject}</div>
      <div className="col-md-3">{groups.id.fieldNames.teacher}</div>
      <div className="col-md-3">{groups.id.fieldNames.status}</div>
      <div className="col-md-12 m-t-20" style={{ textAlign: 'center' }}>
        {submitButton}
        <RaisedButton
          name="submit"
          type="button"
          id="submit"
          label={t1('export')}
          primary
          onClick={() => {
            handleExport(formValues);
          }}
        />
      </div>
    </div>
  </div>
);
