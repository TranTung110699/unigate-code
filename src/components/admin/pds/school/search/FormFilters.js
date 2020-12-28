import React, { Component } from 'react';
import { t1 } from 'translate';
import { Element } from 'schema-form/elements';

class FormFilters extends Component {
  render() {
    return (
      <div>
        <div className="col-md-4">
          <Element
            schema={{
              type: 'text',
              name: 'name',
              floatingLabelText: t1('name'),
              fullWidth: true,
              label: t1('name'),
              hintText: t1('enter_name'),
            }}
          />
        </div>
        <div className="col-md-4">
          <Element
            schema={{
              type: 'text',
              name: 'slug',
              floatingLabelText: t1('slug'),
              fullWidth: true,
              label: t1('slug'),
              hintText: t1('enter_slug'),
            }}
          />
        </div>
      </div>
    );
  }
}

export default FormFilters;
