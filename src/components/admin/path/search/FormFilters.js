import React, { Component } from 'react';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { constants } from 'configs/constants';
import { t, t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';

class FormFilters extends Component {
  raisedButtonStyle = { marginTop: '20px' };

  render() {
    const { searchButton, ntype } = this.props;
    const statuses = this.props.statuses || {
      name: 'status',
      options: constants.StatusOptions(),
    };

    return (
      <div>
        <div className="col-md-8">
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
        {searchButton && (
          <div className="col-md-2">
            <RaisedButton
              style={this.raisedButtonStyle}
              name="submit"
              type="submit"
              id="submit"
              label={t1('search')}
              primary
            />
          </div>
        )}
      </div>
    );
  }
}

export default FormFilters;
