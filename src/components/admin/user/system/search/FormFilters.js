import React, { Component } from 'react';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import { Element } from 'schema-form/elements';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import RaisedButton from 'components/common/mui/RaisedButton';

class FormFilters extends Component {
  raisedButtonStyle = { marginTop: 27 };

  render() {
    const status = [
      {
        primaryText: t1('all'),
        value: '',
      },
      {
        primaryText: t1('activated'),
        value: 'activated',
      },
      {
        primaryText: t1('unactivated'),
        value: 'unactivated',
      },
      {
        primaryText: t1('banned'),
        value: 'banned',
      },
      {
        primaryText: t1('deleted'),
        value: 'deleted',
      },
    ];
    return (
      <div>
        <div className="col-sm-4 col-md-3 col-lg-2">
          <TextField
            fullWidth
            name="iid"
            floatingLabelText={t1('search_by_iid')}
            label={t1('search_by_iid')}
            hintText={t1('please_type_input_search')}
          />
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <TextField
            fullWidth
            name="lname"
            floatingLabelText={t1('search_by_login_name')}
            label={t1('search_by_login_name')}
            hintText={t1('please_type_input_search')}
          />
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <TextField
            fullWidth
            name="mail"
            floatingLabelText={t1('search_by_email')}
            label={t1('search_by_email')}
            hintText={t1('please_type_input_search')}
          />
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <Element
            schema={{
              type: 'select',
              name: 'status',
              floatingLabelText: t1('status'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: status,
            }}
          />
        </div>
        <div className="col-sm-4 col-md-3 col-lg-1">
          <RaisedButton
            name="submit"
            type="submit"
            style={this.raisedButtonStyle}
            id="submit"
            label={t1('search')}
            primary
          />
        </div>
      </div>
    );
  }
}

export default connect()(FormFilters);
