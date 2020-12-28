import React from 'react';

class ImportFormFreeStyle extends React.PureComponent {
  render() {
    const { groups, readOnly } = this.props;
    let { submitButton } = this.props;

    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className="col-md-4">{groups.default.fieldNames.date}</div>
          <div className="col-md-4">
            {groups.default.fieldNames.description}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {groups.default.fieldNames.stationery_list}
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 m-t-20 valign-wrapper">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default ImportFormFreeStyle;
