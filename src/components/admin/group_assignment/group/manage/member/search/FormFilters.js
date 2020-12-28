import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'schema-form/elements';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';

class GroupMemberSearchFormFilters extends React.Component {
  render() {
    return (
      <div>
        <div className="col-md-9">
          <Element
            schema={{
              name: 'text',
              type: 'text',
              floatingLabelText: t1('please_type_search_text'),
              label: t1('please_type_search_text'),
              hintText: t1('please_type_search_text'),
              floatingLabelFixed: false,
            }}
          />
        </div>
        <div className="col-md-3 m-t-25">
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
