import React from 'react';
import { connect } from 'react-redux';
// import { change } from 'redux-form';
import PropTypes from 'prop-types';
import Addable from 'schema-form/elements/addable/Addable';
import Example from './Example';

class Examples extends React.Component {
  divStyle = { marginLeft: '20px' };

  render() {
    const { name } = this.props;
    return (
      <div>
        <span> {this.props.hintText} </span>
        <Addable
          name={name}
          renderElementToAdd={({ index, total }) => (
            <div style={this.divStyle}>
              <Example key={index} />
            </div>
          )}
        />
      </div>
    );
  }
}

Examples.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // form: PropTypes.string.isRequired,
  // isMultiSelectable: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export default connect()(Examples);
