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
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          {groups.id.fieldNames.filter_targets_applied}
          <div className="col-md-12">
            {groups.id.fieldNames.fees_type_applied}
            {groups.id.fieldNames.template_type}
          </div>
        </div>
        <div>
          <div className="col-md-4">{groups.id.fieldNames.school_year}</div>
          <div className="col-md-8">{groups.id.fieldNames.semester}</div>
        </div>

        <div className="text-center" style={{ paddingTop: '15px' }}>
          {submitButton}
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

export default SearchFormDetailFreestyle;
