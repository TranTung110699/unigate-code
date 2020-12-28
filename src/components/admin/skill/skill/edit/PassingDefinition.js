import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import UpdateForm from '../new/Form';

class Form extends Component {
  render() {
    const { node } = this.props;

    return (
      <div>
        <h3>{t1('edit_skill_information')}</h3>
        <UpdateForm
          mode="edit"
          node={node}
          step="aspects_percent"
          formid="edit_skill"
        />
      </div>
    );
  }
}

Form.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string,
    iid: PropTypes.number,
    name: PropTypes.string,
  }),
  step: PropTypes.string,
};

Form.defaultProps = {
  node: {},
  step: 'aspects_percent',
};

export default connect()(Form);
