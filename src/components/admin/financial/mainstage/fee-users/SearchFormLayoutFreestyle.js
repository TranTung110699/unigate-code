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
    const { groups, readOnly } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid">
        <div className="row">{groups.default.fieldNames.major}</div>
        <div className="row">
          <div className="col-md-12">{groups.default.fieldNames.text}</div>
        </div>
        <div className="row">
          <div className="col-md-4">{groups.default.fieldNames.start_date}</div>
          <div className="col-md-4">{groups.default.fieldNames.end_date}</div>
          <div className="col-md-4">
            {groups.default.fieldNames.fee_collecting_phase}
          </div>
          {/* <div className="col-md-3">
            {groups.default.fieldNames.target_item__iid}
          </div> */}
        </div>
        <div className="row">
          {groups.default.fieldNames.financial_status && (
            <div className="col-md-12">
              {groups.default.fieldNames.financial_status}
            </div>
          )}
          <div className="col-md-12">
            {groups.default.fieldNames.fees_type_applied}
          </div>
          <div className="col-md-12">
            {groups.default.fieldNames.fee_template__template_type}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default SearchFormDetailFreestyle;
