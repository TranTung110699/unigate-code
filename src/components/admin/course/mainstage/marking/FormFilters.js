/**
 * Created by hungvo on 19/04/2017.
 */
import React, { Component } from 'react';
import { Element } from 'schema-form/elements';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';

class FormFilters extends Component {
  divStyle = { textAlign: 'center' };

  render() {
    return (
      <div>
        <div className="col-md-9">
          <Element
            schema={{
              type: 'text',
              name: 'q',
              floatingLabelText: t1('name_or_id_or_iid_user'),
              fullWidth: true,
              label: t1('name_or_id_or_iid_user'),
              hintText: t1('please_type_search_text'),
            }}
          />
        </div>
        <div className="col-md-3 m-t-25" style={this.divStyle}>
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

FormFilters.defaultProps = {
  statuses: {},
};

export default FormFilters;
