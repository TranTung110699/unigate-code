import React from 'react';

class FormFreeStyle extends React.Component {
  render() {
    const { groups } = this.props;

    return (
      <div className="elementGroup p-15 m-b-0">
        <div className="row">
          <div className="col-md-6">{groups.id.fieldNames.exam_round_iid}</div>
          <div className="col-md-6">{groups.id.fieldNames.exam_shift_iid}</div>
        </div>
        <div className="row p-l-15 p-r-15">{groups.name.fieldNames.name}</div>
      </div>
    );
  }
}

export default FormFreeStyle;
