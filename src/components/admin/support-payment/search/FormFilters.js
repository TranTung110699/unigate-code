import React, { Component } from 'react';
import { Element } from 'schema-form/elements';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { t1 } from 'translate';
import { constants } from 'configs/constants';
import { normalizeDateTime } from 'common/normalizers';
import DatePicker from 'schema-form/elements/date-picker';

class FormFilters extends Component {
  render() {
    return (
      <div className="col-md-12">
        <div className="col-md-9">
          <TextField
            fullWidth
            name="text"
            floatingLabelText={t1('search_by_uiid_name_email_and_phone_number')}
            label={t1('search_by_uiid_name_email_and_phone_number')}
            hintText={t1('please_type_search_text')}
          />
        </div>
        <div className="col-md-3">
          <Element
            schema={{
              type: 'select',
              name: 'is_require_information',
              floatingLabelText: t1('is_require_information'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: constants.YesNoOptions(),
            }}
          />
        </div>
        <div className="col-md-3">
          <Element
            schema={{
              name: 'ts_from',
              type: DatePicker,
              floatingLabelText: t1('register_from'),
              floatingLabelFixed: true,
              format: (value) => value && new Date(Date.parse(value)),
              normalize: normalizeDateTime,
              fullWidth: true,
            }}
          />
        </div>
        <div className="col-md-3">
          <Element
            schema={{
              name: 'ts_to',
              type: DatePicker,
              floatingLabelText: t1('register_to'),
              floatingLabelFixed: true,
              format: (value) => value && new Date(Date.parse(value)),
              normalize: normalizeDateTime,
              fullWidth: true,
            }}
          />
        </div>
        <div className="col-md-3">
          <Element
            schema={{
              type: 'select',
              name: 'is_supported',
              floatingLabelText: t1('is_supported'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: constants.statusOptions(),
            }}
          />
        </div>
        <div className="col-md-3">
          <Element
            schema={{
              type: 'select',
              name: 'is_saved',
              floatingLabelText: t1('is_saved'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: constants.statusOptions(),
            }}
          />
        </div>
      </div>
    );
  }
}

export default FormFilters;
