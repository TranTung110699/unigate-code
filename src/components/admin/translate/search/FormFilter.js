import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Element } from 'schema-form/elements';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { t1 } from 'translate';
import { languages } from 'configs/constants';
import RaisedButton from 'components/common/mui/RaisedButton';

class FormFilter extends Component {
  render() {
    return (
      <div>
        <div className="col-md-3">
          <Element
            schema={{
              type: 'text',
              name: 'name',
              floatingLabelText: t1('key'),
              floatingLabelFixed: true,
              fullWidth: true,
              hintText: t1('enter_key'),
            }}
          />
        </div>
        <div className="col-md-3">
          <Element
            schema={{
              type: 'text',
              name: 'content',
              floatingLabelText: t1('content_translate'),
              floatingLabelFixed: true,
              fullWidth: true,
              hintText: t1('enter_content_translate'),
            }}
          />
        </div>
        <div className="col-md-3">
          <Element
            schema={{
              type: 'select',
              name: 'language',
              floatingLabelText: t1('languages'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: languages,
            }}
          />
        </div>
        <div className="col-md-3 m-t-25">
          <RaisedButton
            name="submit"
            type="submit"
            id="submit"
            label={t1('search')}
            primary
          />
        </div>
      </div>
    );
  }
}

export default connect()(FormFilter);
