import React from 'react';

class SearchFormDetailFreestyle extends React.PureComponent {
  render() {
    const { groups, message, readOnly } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className="col-md-8">{groups.default.fieldNames.text}</div>
          <div className="col-md-2" style={{ paddingTop: '15px' }}>
            {submitButton}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFormDetailFreestyle;
