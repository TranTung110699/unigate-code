import React, { Component } from 'react';
import { Element } from 'schema-form/elements';
import { t1 } from 'translate';
import { connect } from 'react-redux';

class FormFilters extends Component {
  render() {
    return (
      <div className="col-md-4">
        <Element
          schema={{
            type: 'text',
            name: 'name',
            floatingLabelText: t1('iid_or_name'),
            fullWidth: true,
            label: t1('name'),
            hintText: t1('enter_iid_or_name'),
          }}
        />
      </div>
    );
  }
}

export default connect()(FormFilters);
