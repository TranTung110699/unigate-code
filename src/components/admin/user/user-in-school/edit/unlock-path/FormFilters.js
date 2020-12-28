import React, { Component } from 'react';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { t, t1 } from 'translate';

class FormFilters extends Component {
  render() {
    const { ntype } = this.props;

    return (
      <div>
        <div className="col-md-4">
          <TextField
            fullWidth
            name="name"
            floatingLabelText={
              ntype
                ? t1('search_by_name_or_iid_of_%s', [t(ntype)])
                : t1('search_by_name_or_iid')
            }
          />
        </div>
      </div>
    );
  }
}

export default FormFilters;
