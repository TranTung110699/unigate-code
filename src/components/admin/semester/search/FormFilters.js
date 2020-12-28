import React, { Component } from 'react';
import { Element } from 'schema-form/elements';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { t1 } from 'translate';
import { semesterTypes } from 'configs/constants';

const filterOptions = [
  { value: '', primaryText: t1('all') },
  ...semesterTypes(),
];

class FormFilters extends Component {
  render() {
    return (
      <div>
        <div className="col-md-3">
          <TextField
            fullWidth
            name="name"
            floatingLabelText={t1('search_by_name_or_iid')}
            label={t1('search_by_name_or_iid')}
            hintText={t1('please_type_search_text')}
          />
        </div>
        <div className="col-md-3">
          <Element
            schema={{
              name: 'type',
              type: 'select',
              fullWidth: true,
              floatingLabelText: t1('type'),
              options: filterOptions,
              defaultValue: '',
            }}
          />
        </div>
      </div>
    );
  }
}

export default FormFilters;
