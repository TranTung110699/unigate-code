import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';

class FormFilter extends Component {
  render() {
    return [
      <div className="col-md-3">
        <TextField
          fullWidth
          name="iid"
          floatingLabelText={t1('iid')}
          label={t1('iid')}
          hintText={t1('enter_iid')}
        />
      </div>,
      <div className="col-md-3">
        <TextField
          fullWidth
          name="name"
          floatingLabelText={t1('name')}
          label={t1('name')}
          hintText={t1('enter_name')}
        />
      </div>,
      <div className="col-md-3 m-t-25">
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

export default connect()(FormFilter);
