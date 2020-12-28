import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import UpdateForm from '../new/Form';

class EditSkillForm extends Component {
  render() {
    let step = this.props.step || '';
    const { node } = this.props;
    let title;

    switch (step) {
      case 'aspects_percent':
        title = t1('skill_aspects_percent_in_aspects');
        break;
      case 'penalty_practice':
        title = t1('practice_penalty');
        break;
      default:
        if (node.type == 'rubric') {
          step = 'rubric';
          title = t1('edit_rubric_information');
        } else {
          step = 'skill';
          title = t1('edit_skill_information');
        }
    }

    return (
      <div>
        <UpdateForm mode="edit" node={node} step={step} formid="edit_skill" />
      </div>
    );
  }
}

EditSkillForm.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string,
    iid: PropTypes.number,
    name: PropTypes.string,
  }),
  step: PropTypes.string,
  mode: PropTypes.string,
};

EditSkillForm.defaultProps = {
  node: {},
  // step: 'skill',
  mode: 'new',
};

export default connect()(EditSkillForm);
