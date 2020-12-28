import React from 'react';

class LayoutFreestyle extends React.PureComponent {
  render() {
    const { groups, readOnly } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className="col-md-3">{groups.id.fieldNames.start_date}</div>
          <div className="col-md-3">{groups.id.fieldNames.end_date}</div>
          <div className="col-md-3 m-t-30">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default LayoutFreestyle;
