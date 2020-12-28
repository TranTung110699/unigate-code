import React, { Component } from 'react';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';

class FormFilters extends Component {
  render() {
    return (
      <div>
        <div className="col-md-4">
          <TextField
            fullWidth
            name="name"
            floatingLabelText={t1('name')}
            label={t1('name')}
            hintText={t1('please_type_venue_name')}
          />
        </div>

        <div className="col-md-4 m-t-25">
          <RaisedButton
            name="submit"
            type="submit"
            id="submit"
            label={t1('search')}
            primary
          />
        </div>
      </div>
    );
  }
}

export default FormFilters;
