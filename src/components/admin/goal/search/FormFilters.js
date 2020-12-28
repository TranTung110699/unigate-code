import React, { Component } from 'react';
import { t1 } from 'translate';
import { Element } from 'schema-form/elements';
import RaisedButton from 'components/common/mui/RaisedButton';

class FormFilters extends Component {
  render() {
    return (
      <div>
        <div className="col-md-12">
          <Element
            schema={{
              type: 'text',
              name: 'name',
              floatingLabelText: t1('name'),
              floatingLabelFixed: true,
              fullWidth: true,
            }}
          />
        </div>
        <div className="col-md-12">
          <RaisedButton
            name="submit"
            type="submit"
            id="submit"
            label={t1('search')}
            className="admin-btn"
            primary
          />
        </div>
      </div>
    );
  }
}

export default FormFilters;
