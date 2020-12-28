import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import './stylesheet.scss';

class AssignmentGroupGeneral extends React.Component {
  cssClass = 'assignment-group-general';

  render() {
    const { className, group, exercise, sco } = this.props;

    return (
      <div>
        <div>
          <b>{t1('assignment')}: </b>
          {sco.name}
          (#
          {sco.iid})
        </div>

        <div>
          <b>{t1('project')}: </b>
          {exercise.name} (# {exercise.iid})
        </div>

        <div>
          <b>{t1('group')}: </b>
          {group.name} (# {group.iid})
        </div>
      </div>
    );
  }
}

AssignmentGroupGeneral.propTypes = {
  className: PropTypes.string,
  group: PropTypes.shape(),
};

AssignmentGroupGeneral.defaultProps = {
  className: '',
  group: null,
};

export default AssignmentGroupGeneral;
