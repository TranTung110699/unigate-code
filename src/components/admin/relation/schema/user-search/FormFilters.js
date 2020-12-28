import React, { Component } from 'react';
import { Element } from 'schema-form/elements';
import { t1 } from 'translate';

class FormFilters extends Component {
  render() {
    return (
      <div>
        <Element
          schema={{
            type: 'text',
            name: 'text',
            floatingLabelText: t1('search_by_name_or_iid'),
            fullWidth: true,
            hintText: t1('please_type_search_text'),
          }}
        />
      </div>
    );
  }
}

export default FormFilters;
