import React, { Component } from 'react';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';

class FormFilters extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="col-md-12">
          <TextField
            fullWidth
            name="input"
            floatingLabelText={t1('type_code_or_name')}
            label={t1('type_code_or_name')}
            hintText={t1('search_by_type_code_or_name')}
          />
        </div>

        <div className="col-md-12 text-center">
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
