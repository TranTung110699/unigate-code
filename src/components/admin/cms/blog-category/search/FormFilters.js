import React, { Component } from 'react';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { t1 } from 'translate';
import { connect } from 'react-redux';

// import PropTypes from 'prop-types';

class FormFilters extends Component {
  render() {
    return (
      <div>
        <div className="col-md-4">
          <TextField
            name="name"
            floatingLabelText={t1('search_by_name')}
            label={t1('search_by_name')}
            hintText={t1('please_type_search_text')}
            fullWidth
          />
        </div>
        <div className="col-md-4">
          <TextField
            name="code"
            floatingLabelText={t1('search_by_code')}
            label={t1('search_by_code')}
            hintText={t1('please_type_search_text')}
            fullWidth
          />
        </div>
      </div>
    );
  }
}

export default connect()(FormFilters);
