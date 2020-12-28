import React from 'react';

class SearchFormLayout extends React.PureComponent {
  render() {
    const { groups, submitButton } = this.props;
    const {
      user_organizations,
      user_organization_get_children_level_one,
      user_equivalent_phongbans,
      user_evn_equivalent_positions,
    } = groups.default.fieldNames;

    /* eslint-disable camelcase */
    return (
      <div className="search-form">
        <div className="row">
          <div className="col-md-6">
            {user_organizations}
            {user_organization_get_children_level_one}
            <div className="row center-align">{submitButton}</div>
          </div>
          <div className="col-md-6">
            {user_equivalent_phongbans}
            {user_evn_equivalent_positions}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFormLayout;
