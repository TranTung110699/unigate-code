import React from 'react';

class SearchFormDetailFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  render() {
    const { layout, groups, message, hideSubmitButton, readOnly } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">{groups.id.fieldNames.name}</div>
          <div className="col-md-4">{groups.id.fieldNames.status}</div>
          <div className="col-md-2 p-t-15">{submitButton}</div>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

export default SearchFormDetailFreestyle;
