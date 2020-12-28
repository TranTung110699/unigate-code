import React from 'react';
import { connect } from 'react-redux';

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
          <div className="col-md-3 m-t-10">{groups.id.fieldNames.text}</div>
          <div className="col-md-3 m-t-30">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default connect()(LayoutFreestyle);
