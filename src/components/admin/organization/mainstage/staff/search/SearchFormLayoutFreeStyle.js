import React from 'react';

class SearchFormDetailFreestyle extends React.Component {
  render() {
    const { groups, submitButton } = this.props;

    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className="col-md-3">{groups.id.fieldNames.text}</div>
          <div className="col-md-3 m-t-20">
            {groups.id.fieldNames.include_sub_organizations}
          </div>
          <div className="col-md-3 m-t-20">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default SearchFormDetailFreestyle;
