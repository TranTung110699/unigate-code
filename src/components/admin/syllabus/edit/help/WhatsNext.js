import React, { Component } from 'react';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import SuccessAlert from 'components/common/SuccessAlert';
import Timeline from 'antd/lib/timeline';

class WhatsNext extends Component {
  render() {
    return (
      <div>
        <h3>
          <SuccessAlert>
            {t1(
              'congratulations_your_syllabus_is_now_approved_and_ready_to_be_used',
            )}
          </SuccessAlert>
        </h3>
        {t1('here_are_some_of_the_things_you_can_do_with_this_syllabus')}
        <Timeline className="m-t-10">
          <Timeline.Item className="p-b-5">
            <Link to={'/admin/course'}>
              {t1('create_a_course_from_this_syllabus')}
            </Link>
          </Timeline.Item>
          <Timeline.Item className="p-b-5">
            <Link to={'/admin/enrolment-plan'}>
              {t1('create_an_enrolment_plan_for_this_syllabus')}
            </Link>
          </Timeline.Item>
          <Timeline.Item className="p-b-5">
            <Link to={'/admin/program'}>
              {t1('create_a_program_add_this_syllabus_to_the_program')}
            </Link>
          </Timeline.Item>
        </Timeline>
      </div>
    );
  }
}

export default WhatsNext;
