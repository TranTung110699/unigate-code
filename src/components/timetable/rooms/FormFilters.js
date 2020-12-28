import React, { Component } from 'react';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import SelectField from 'schema-form/elements/redux-form-fields/MuiSelectField';

class FormFilters extends Component {
  selectFieldStyle = { width: '150px' };

  getVenuesOptions = () => {
    const venues = this.props.venues || [];
    return venues.map((venue) => ({
      value: venue.iid,
      primaryText: venue.name,
    }));
  };

  render() {
    const venues = this.getVenuesOptions();
    return [
      <div className="col-md-4">
        <SelectField
          options={venues}
          style={this.selectFieldStyle}
          name="parent_iid"
        />
      </div>,
      <div className="col-md-4">
        <TextField
          fullWidth
          name="name"
          label={t1('name')}
          hintText={t1('please_type_venue_name')}
        />
      </div>,
      <div className="col-md-4 m-t-5">
        <RaisedButton
          name="submit"
          type="submit"
          id="submit"
          label={t1('search')}
          primary
        />
      </div>,
    ];
  }
}

export default FormFilters;
