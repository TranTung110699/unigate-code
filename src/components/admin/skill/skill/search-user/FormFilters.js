import React, { Component } from 'react';
import { t1 } from 'translate';
import { Element } from 'schema-form/elements';
import RaisedButton from 'components/common/mui/RaisedButton';

class FormFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minLte: 0,
      maxGte: 100,
    };
  }

  render() {
    return (
      <div>
        <div className="col-md-6">
          <Element
            schema={{
              type: 'text',
              name: 'text',
              floatingLabelText: t1('search_for_user'),
              floatingLabelFixed: true,
              fullWidth: true,
              placeholder: t1('enter_user_name,code,id,email_to_search'),
            }}
          />
        </div>
        <div className="col-md-2">
          <Element
            schema={{
              type: 'number',
              name: 'p_gte',
              floatingLabelText: t1('progress_better_than'),
              floatingLabelFixed: true,
              fullWidth: true,
              defaultValue: 0,
              min: 0,
              max: this.state.maxGte,
              onChange: (e, value) => {
                this.setState({
                  minLte: value,
                });
              },
            }}
          />
        </div>
        <div className="col-md-2">
          <Element
            schema={{
              type: 'number',
              name: 'p_lte',
              floatingLabelText: t1('progress_less_than'),
              floatingLabelFixed: true,
              fullWidth: true,
              defaultValue: 100,
              min: this.state.minLte,
              max: 100,
              onChange: (e, value) => {
                this.setState({
                  maxGte: value,
                });
              },
            }}
          />
        </div>

        <div className="col-md-2 m-t-25">
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
