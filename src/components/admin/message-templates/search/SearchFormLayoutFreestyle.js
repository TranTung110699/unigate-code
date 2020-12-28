import React from 'react';

class SearchFormLayoutFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  render() {
    const {
      groups: {
        default: {
          fieldNames: {
            code,
            title,
            tpl_action: action,
            language,
            method,
            status,
          },
        },
      },
      message,
      readOnly,
    } = this.props;

    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    const paddingTop30px = { paddingTop: '30px' };

    return (
      <div className="container-fluid elementGroup">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          <div className="col-md-1">{code}</div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">{title}</div>
            </div>
            <div className="row">
              <div className="col-md-12">{action}</div>
            </div>
            <div className="row">
              <div className="col-md-12">{status}</div>
            </div>
          </div>
          <div className="col-md-1" style={paddingTop30px}>
            {method}
          </div>
          <div className="col-md-1" style={paddingTop30px}>
            {language}
          </div>
          <div className="col-md-1 valign" style={paddingTop30px}>
            {submitButton}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFormLayoutFreestyle;
