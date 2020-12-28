import React, { Component } from 'react';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { t1 } from 'translate';

class FormFilters extends Component {
  render() {
    return (
      <div>
        <div className="col-md-4">
          <TextField
            fullWidth
            name="name"
            floatingLabelText={t1('search_by_name')}
            label={t1('search_by_name')}
            hintText={t1('please_type_search_text')}
          />
        </div>
      </div>
    );
  }
}

export default FormFilters;
