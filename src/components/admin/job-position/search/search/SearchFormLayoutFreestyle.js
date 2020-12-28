import React from 'react';
import { connect } from 'react-redux';

class SearchFormDetailFreestyle extends React.PureComponent {
  render() {
    const { groups, readOnly, hiddenFields } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            {groups.id.fieldNames.topEquivalentPosition}
          </div>
        </div>
        {groups.id.fieldNames.organizations && (
          <div className="row">
            <div className="col-md-12">
              {groups.id.fieldNames.organizations}
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-md-12">{groups.id.fieldNames.text}</div>
        </div>
        <div className="row">
          <div className="col-md-12">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default connect()(SearchFormDetailFreestyle);
