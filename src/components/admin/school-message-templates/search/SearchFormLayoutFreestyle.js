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
          fieldNames: { tpl_action: action, languages, methods },
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
          <div className="col-md-10">
            <div className="col-md-6">{action}</div>
            <div className="col-md-3" style={paddingTop30px}>
              {methods}
            </div>
            <div className="col-md-3" style={paddingTop30px}>
              {languages}
            </div>
          </div>
          <div className="col-md-2 valign" style={paddingTop30px}>
            {submitButton}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFormLayoutFreestyle;
