import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Element } from 'schema-form/elements';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';

class FormFilter extends Component {
  render() {
    return [
      <div className="col-md-3">
        <TextField
          fullWidth
          name="question"
          floatingLabelText={t1('question')}
          label={t1('question')}
          hintText={t1('enter_question')}
        />
      </div>,
      <div className="col-md-3">
        <TextField
          fullWidth
          name="answer"
          floatingLabelText={t1('answer')}
          label={t1('answer')}
          hintText={t1('enter_answer')}
        />
      </div>,
      <div className="col-md-3">
        <Element
          schema={{
            name: 'status',
            fullWidth: true,
            type: 'multiCheckbox',
            inline: true,
            floatingLabelText: t1('status'),
            hintText: t1('type_of_status'),
            options: [
              {
                name: 'approved',
                value: 'approved',
                label: t1('approved'),
                primaryText: t1('approved'),
              },
              {
                name: 'queued',
                value: 'queued',
                label: t1('queued'),
                primaryText: t1('queued'),
              },
            ],
            defaultValue: ['queued', 'approved'],
          }}
        />
      </div>,
      <div className="col-md-3 m-t-25">
        <RaisedButton
          name="submit"
          type="submit"
          id="submit"
          label={t1('search')}
          primary
        />
      </div>,
    ];
  }
}

export default connect()(FormFilter);
