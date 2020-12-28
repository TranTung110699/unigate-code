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
          <div>{groups.id.fieldNames.attended_number_student}</div>
          <div className="text-center">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default LayoutFreestyle;
