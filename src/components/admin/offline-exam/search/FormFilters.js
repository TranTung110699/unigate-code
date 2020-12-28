import React, { Component } from 'react';
import { Element } from 'schema-form/elements';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import { constants } from 'configs/constants';

class FormFilters extends Component {
  render() {
    return (
      <div>
        <div className="col-md-8">
          <TextField
            name="name"
            floatingLabelText={t1('search_by_name_or_iid')}
            label={t1('search_by_name_or_iid')}
            hintText={t1('please_type_search_text')}
            fullWidth
          />
        </div>
        <div className="col-md-8">
          <Element
            schema={{
              name: 'status',
              type: 'multiCheckbox',
              inline: true,
              floatingLabelText: t1('status'),
              options: constants.StatusOptions(),
              defaultValue: ['queued', 'approved'],
            }}
          />
        </div>
        <div className="col-md-4 m-t-25" style={this.divStyle}>
          <RaisedButton
            type="submit"
            name="submit"
            id="submit"
            label={t1('search')}
            style={{ 'margin-right': '1em' }}
            primary
          />
        </div>
      </div>
    );
  }
}

export default connect()(FormFilters);
