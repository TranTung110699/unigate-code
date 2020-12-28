import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import AssignmentGroupGeneral from './general';
import AssignmentGroupMarking from './marking';
import AssignmentGroupMember from './member';
import Widget from 'components/common/Widget';
import fetchData from './fetchData';
import './stylesheet.scss';

class AssignmentGroup extends React.Component {
  cssClass = 'assignment-group';

  render() {
    const { className, group, course, sco, exercise } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Widget title={t1('assignment_overview')}>
              <AssignmentGroupGeneral
                course={course}
                sco={sco}
                exercise={exercise}
                group={group}
              />
            </Widget>
          </div>
          <div className="col-md-9">
            <Widget title={t1('assignment_group_members')}>
              <AssignmentGroupMember group={group} />
            </Widget>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-12">
            <Widget title={t1('student_submissions_and_score')}>
              <AssignmentGroupMarking
                course={course}
                sco={sco}
                exercise={exercise}
                group={group}
              />
            </Widget>
          </div>
        </div>
      </div>
    );
  }
}

AssignmentGroup.propTypes = {
  className: PropTypes.string,
  course: PropTypes.shape(),
  group: PropTypes.shape(),
};

AssignmentGroup.defaultProps = {
  className: '',
  course: null,
  group: null,
};

export default fetchData(AssignmentGroup);
