import React from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import ViewRenderer from './ViewRenderer';

class SchemaForm extends React.PureComponent {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <ViewRenderer {...this.props} dispatch={this.props.dispatch} />
      </form>
    );
  }
}

SchemaForm.propTypes = {
  handleSubmit: PropTypes.func,
};

SchemaForm = reduxForm({
  destroyOnUnmount: false,
})(SchemaForm);

export default SchemaForm;
