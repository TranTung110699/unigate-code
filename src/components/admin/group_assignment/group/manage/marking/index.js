import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import Paper from 'material-ui/Paper';
import Answers from './answers';
import Marking from './marking';
import './stylesheet.scss';

class AssignmentGroupMarking extends React.Component {
  cssClass = 'assignment-group-marking';

  render() {
    const { className, course, sco, exercise, group } = this.props;

    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <div className={`${this.cssClass}__section`}>
          <h2 className={`${this.cssClass}__section-title`}>
            {t1("students'_submissions")}
          </h2>
          <Paper className={`${this.cssClass}__section-content`}>
            <Answers
              course={course}
              sco={sco}
              exercise={exercise}
              group={group}
            />
          </Paper>
        </div>
        <div className={`${this.cssClass}__section`}>
          <h2 className={`${this.cssClass}__section-title`}>{`${t1(
            'score',
          )} & ${t1('marking')}`}</h2>
          <Paper className={`${this.cssClass}__section-content`}>
            <Marking
              course={course}
              sco={sco}
              exercise={exercise}
              group={group}
            />
          </Paper>
        </div>
      </div>
    );
  }
}

AssignmentGroupMarking.propTypes = {
  className: PropTypes.string,
  group: PropTypes.shape(),
};

AssignmentGroupMarking.defaultProps = {
  className: '',
  group: null,
};

export default AssignmentGroupMarking;
