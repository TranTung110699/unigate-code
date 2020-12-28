import React from 'react';

class StationeryListFreeStyle extends React.PureComponent {
  render() {
    const { groups, readOnly } = this.props;

    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className="col-md-4">{groups.default.fieldNames.code}</div>
          <div className="col-md-4">{groups.default.fieldNames.quantity}</div>
        </div>
      </div>
    );
  }
}

export default StationeryListFreeStyle;
