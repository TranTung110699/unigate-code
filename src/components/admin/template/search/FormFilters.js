import React, { Component } from 'react';
import { Element } from 'schema-form/elements';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { t1 } from 'translate';

class FormFilters extends Component {
  render() {
    const { available } = this.props;
    return (
      <div className="col-md-12">
        <div className="col-md-3">
          <TextField
            fullWidth
            name="name"
            floatingLabelText={t1('search_by_name')}
            label={t1('search_by_name')}
            hintText={t1('please_type_search_text')}
          />
        </div>
        <div className="col-md-3">
          <TextField
            fullWidth
            name="template_title"
            floatingLabelText={t1('search_by_template_tile')}
            label={t1('search_by_template_title')}
            hintText={t1('please_type_template_title')}
          />
        </div>
        <div className="col-md-5">
          <Element
            schema={{
              name: 'status',
              inline: true,
              type: 'multiCheckbox',
              hintText: `${t1('hint')}: ${t1('type_of_status')}`,
              options: available.options,
              defaultValue: ['email', 'sms', 'notification'],
            }}
          />
        </div>
      </div>
    );
  }
}

export default FormFilters;
