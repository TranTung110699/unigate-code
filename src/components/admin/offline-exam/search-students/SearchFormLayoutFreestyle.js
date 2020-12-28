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
          <div className="col-md-12">
            {groups.id.fieldNames.forms_of_training}
          </div>
          <div className="col-md-3">{groups.id.fieldNames.semester}</div>
          <div className="col-md-3">{groups.id.fieldNames.credit_syllabus}</div>
          <div className="col-md-3">{groups.id.fieldNames.exam_resit_nths}</div>
          <div className="col-md-3">{groups.id.fieldNames.status_of_fee}</div>
          <div className="col-md-4">
            {groups.id.fieldNames.status_in_course}
          </div>
          <div className="col-md-6">{groups.id.fieldNames.text}</div>
          <div className="col-md-2" style={{ paddingTop: '15px' }}>
            {submitButton}
          </div>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

export default SearchFormDetailFreestyle;
