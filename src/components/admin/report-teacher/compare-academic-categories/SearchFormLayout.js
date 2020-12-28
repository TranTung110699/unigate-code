import React from 'react';

class SearchFormLayout extends React.PureComponent {
  render() {
    const { groups, submitButton } = this.props;
    const {
      user_organizations,
      user_organization_get_children_level_one,
      credit_syllabus_academic_categories,
    } = groups.default.fieldNames;

    /* eslint-disable camelcase */
    return (
      <div className="search-form">
        <div className="row">
          <div className="col-md-6">
            {user_organizations}
            {user_organization_get_children_level_one}
          </div>
          <div className="col-md-6">{credit_syllabus_academic_categories}</div>
        </div>
        <div className="row center-align">{submitButton}</div>
      </div>
    );
  }
}

export default SearchFormLayout;
