import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'schema-form/elements';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import { convertBooleanValueToInt } from 'common/normalizers';

class GroupMemberSearchFormFilters extends React.Component {
  divStyle = { marginTop: 40 };

  render() {
    return (
      <div>
        <div className="col-md-9">
          <Element
            schema={{
              name: 'text',
              type: 'text',
              floatingLabelText: t1('search_staff'),
              label: t1('search_staff'),
              hintText: t1('please_enter_search_text'),
              floatingLabelFixed: false,
            }}
          />
        </div>
        <div className="col-md-3" style={this.divStyle}>
          <Element
            schema={{
              name: 'include_category_children',
              type: 'checkbox',
              label: t1('include_staff_in_lower_level'),
              defaultValue: 1,
              normalize: convertBooleanValueToInt,
            }}
          />
        </div>
        <div className="col-md-12 m-t-25">
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

GroupMemberSearchFormFilters.propTypes = {
  className: PropTypes.string,
};

GroupMemberSearchFormFilters.defaultProps = {
  className: '',
};

export default GroupMemberSearchFormFilters;
