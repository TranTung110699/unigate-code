import React, { Component } from 'react';
import { t1 } from 'translate';
import { Element } from 'schema-form/elements';
import RaisedButton from 'components/common/mui/RaisedButton';
import { required } from 'common/validators';
import DateTimePicker from 'schema-form/elements/date-time-picker';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

class FormFilters extends Component {
  render() {
    return (
      <div>
        <div className="col-md-3">
          <Element
            schema={{
              name: 'from',
              type: DateTimePicker,
              floatingLabelText: t1('from'),
              fullWidth: true,
              validate: [required()],
              maxDate: new Date(),
            }}
          />
        </div>
        <div className="col-md-3">
          <Element
            schema={{
              name: 'to',
              type: DateTimePicker,
              floatingLabelText: t1('to'),
              fullWidth: true,
              validate: [required()],
              maxDate: new Date(),
            }}
          />
        </div>
        <div className="col-md-12">
          <Element
            schema={{
              name: 'path_iid',
              nameElement: 'path_iid',
              type: InputAutoComplete,
              baseUrl: '/path/search',
              floatingLabelText: t1('path'),
              dataSourceConfig: {
                text: 'name',
                value: 'iid',
              },
              fullWidth: true,
              limit: 1,
              validate: [required()],
            }}
          />
        </div>
        <div className="col-md-12">
          <Element
            schema={{
              name: 'user_iids',
              nameElement: 'user_iids',
              type: InputAutoComplete,
              baseUrl: '/user/search?_sand_step=students',
              floatingLabelText: t1('user'),
              dataSourceConfig: {
                text: 'name',
                value: 'iid',
              },
              fullWidth: true,
              limit: 3,
              validate: [required()],
            }}
          />
        </div>
        <div className="col-md-12">
          <RaisedButton primary type="submit" label={t1('search')} />
        </div>
      </div>
    );
  }
}

export default FormFilters;
