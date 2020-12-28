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
      <div className="container-fluid elementGroup">
        <div className="row">
          <div>{groups.id.fieldNames.type}</div>
          <div>{groups.id.fieldNames.target}</div>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

export default SearchFormDetailFreestyle;
