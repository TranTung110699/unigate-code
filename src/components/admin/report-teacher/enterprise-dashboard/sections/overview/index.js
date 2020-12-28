import React from 'react';
import Card from 'components/admin/report-teacher/common/Card';
import { t1, t2 } from 'translate';

class Overview extends React.Component {
  render() {
    const { data } = this.props;
    const {
      no_of_credit_syllabuses: creditSyllabuses,
      no_of_enrolment_plans: enrolmentPlans,
      no_of_staffs: staffs,
      no_of_programs: programs,
      no_of_sinvites: sinvites,
      no_of_students: students,
    } = data;

    const style = {
      height: '300px',
    };

    return (
      <Card title={t2('overview_section')}>
        <div style={style}>
          <div className="row">
            <div className="col-md-6">
              <span>{t1('credit_syllabuses: %s', creditSyllabuses)}</span>
            </div>
            <div className="col-md-6">
              <span>{t1('enrolment_plans: %s', enrolmentPlans)}</span>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <span>{t1('staffs: %s', staffs)}</span>
            </div>
            <div className="col-md-6">
              <span>{t1('programs: %s', programs)}</span>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <span>{t1('sinvite: %s', sinvites)}</span>
            </div>
            <div className="col-md-6">
              <span>{t1('students: %s', students)}</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default Overview;
