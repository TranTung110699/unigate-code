import React from 'react';
import getLodash from 'lodash.get';

import { t1 } from 'translate';
import Paper from 'material-ui/Paper';
import Title from 'schema-form/field-set/Title';

const stylePaper = {
  marginTop: 20,
  padding: 10,
};

const layoutFreeStyle = (props) => {
  const fieldNames = getLodash(props, 'groups.id.fieldNames') || {};
  const { submitButton } = props;

  return (
    <div>
      {(fieldNames.name ||
        fieldNames.code ||
        fieldNames.start_date ||
        fieldNames.end_date) && (
        <Paper style={stylePaper}>
          <Title title={t1('general_information')} />
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">{fieldNames.name}</div>
              <div className="col-md-6">{fieldNames.code}</div>
              <div className="col-md-6">{fieldNames.start_date}</div>
              <div className="col-md-6">{fieldNames.end_date}</div>
            </div>
          </div>
        </Paper>
      )}
      <Paper style={stylePaper}>
        <Title title={t1('academic_information')} />
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12 m-b-20">
              {fieldNames.credit_syllabuses}
            </div>
            {fieldNames.type && (
              <div className="col-md-6">{fieldNames.type}</div>
            )}
            <div className="col-md-6 m-t-15">
              {fieldNames.is_full_time_teacher}
            </div>
            <div className="col-md-12">{fieldNames.contract_times}</div>
          </div>
        </div>
      </Paper>
      {(fieldNames.specialize_hours_to_complete ||
        fieldNames.teaching_hours_to_complete ||
        fieldNames.specialize_to_teaching_hours_conversion_rate) && (
        <Paper style={stylePaper}>
          <Title title={t1('working_time_information')} />
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                {fieldNames.teaching_hours_to_complete}
              </div>
              <div className="col-md-6">
                {fieldNames.specialize_hours_to_complete}
              </div>
              <div className="col-md-6">
                {fieldNames.specialize_to_teaching_hours_conversion_rate}
              </div>
            </div>
          </div>
        </Paper>
      )}
      {(fieldNames.hourly_rate ||
        fieldNames.overtime_hourly_rate ||
        fieldNames.weekend_hourly_rate ||
        fieldNames.conversion_rate) && (
        <Paper style={stylePaper}>
          <Title title={t1('salary_information')} />
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">{fieldNames.hourly_rate}</div>
              <div className="col-md-6">{fieldNames.overtime_hourly_rate}</div>
              <div className="col-md-6">{fieldNames.weekend_hourly_rate}</div>
              <div className="col-md-6">{fieldNames.conversion_rate}</div>
            </div>
          </div>
        </Paper>
      )}
      {(fieldNames.attachments || fieldNames.note) && (
        <Paper style={stylePaper}>
          <Title title={t1('other_information')} />
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">{fieldNames.attachments}</div>
              <div className="col-md-12">{fieldNames.note}</div>
            </div>
          </div>
        </Paper>
      )}

      <div className="col-md-12 text-center m-t-20">{submitButton}</div>
    </div>
  );
};

export default layoutFreeStyle;
