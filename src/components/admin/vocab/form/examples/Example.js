import React, { Component } from 'react';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { t1 } from 'translate';

// import PropTypes from 'prop-types';

class Example extends Component {
  render() {
    return (
      <div>
        <div>
          <TextField name="name" hintText={t1('example')} />
        </div>
        <div>
          <TextField name="vname" hintText={t1('meaning')} />
        </div>
      </div>
    );
  }
}

export default Example;
