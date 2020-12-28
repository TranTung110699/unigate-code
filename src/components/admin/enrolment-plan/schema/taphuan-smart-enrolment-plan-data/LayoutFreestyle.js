import React from 'react';
import TeachersWorkload from './teachers-workload';
import { t1 } from 'translate';

const Label = ({ children, style }) => {
  return (
    <div
      style={{
        fontSize: 14,
        fontWeight: 'bold',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const LayoutFreestyle = ({ groups }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4">
          <Label
            style={{
              marginBottom: 13,
            }}
          >
            {t1('select_organizations')}
          </Label>
          <div
            style={{
              marginBottom: 13,
            }}
          >
            {groups.default.fieldNames.select_organizations}
          </div>
        </div>
        <div className="col-lg-1" />
        <div className="col-lg-7">
          <Label>{t1('arrange_class_for_credit_syllabus')}</Label>
          <div
            style={{
              marginTop: 13,
              marginBottom: 13,
            }}
          >
            {groups.default.fieldNames.suggested_number_of_users_per_course}
          </div>
          <div
            style={{
              marginBottom: 13,
            }}
          >
            {groups.default.fieldNames.credit_syllabuses}
          </div>
          <Label>{t1('check_teachers_workload')}</Label>
          <TeachersWorkload />
        </div>
      </div>
    </div>
  );
};

export default LayoutFreestyle;
