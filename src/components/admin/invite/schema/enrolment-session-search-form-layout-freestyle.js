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
    const { groups, message, readOnly, submitButton } = this.props;

    return (
      <div className="container-fluid elementGroup">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          <div
            className={`col-md-${groups.id.fieldNames.organizations ? 4 : 6}`}
          >
            {groups.id.fieldNames.text}
          </div>
          {groups.id.fieldNames.organizations && (
            <div className="col-md-3">{groups.id.fieldNames.organizations}</div>
          )}
          <div className="col-md-3 text-center">
            {groups.id.fieldNames.status}
          </div>
          <div className="col-md-2 text-center" style={{ paddingTop: '15px' }}>
            {submitButton}
          </div>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

export default SearchFormDetailFreestyle;
