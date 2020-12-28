import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'components/common/mui/RaisedButton';
import { Element } from 'schema-form/elements';
import { t1 } from 'translate';

class GroupLearningItemSearchFormFilters extends React.Component {
  render() {
    return (
      <div>
        <div className="col-md-9">
          <Element
            schema={{
              name: 'text',
              type: 'text',
              floatingLabelText: t1('search_text'),
              label: t1('search_text'),
              hintText: t1('please_type_search_text'),
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

GroupLearningItemSearchFormFilters.propTypes = {
  className: PropTypes.string,
};

GroupLearningItemSearchFormFilters.defaultProps = {
  className: '',
};

export default GroupLearningItemSearchFormFilters;
