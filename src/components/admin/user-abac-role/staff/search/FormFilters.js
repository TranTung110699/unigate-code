import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'schema-form/elements';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';

class GroupMemberSearchFormFilters extends React.Component {
  render() {
    return (
      <div>
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
        <RaisedButton
          name="submit"
          type="submit"
          id="submit"
          label={t1('search')}
          className="admin-btn"
          primary
        />
        <div className="m-t-25" />
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
