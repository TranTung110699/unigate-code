import React from 'react';

class SearchFormLayout extends React.PureComponent {
  render() {
    const { groups, submitButton } = this.props;
    return (
      <div className="container-fluid elementGroup">
        {groups.id.fieldNames.form_of_training && (
          <div className="row">
            <div className="col-md-12">
              {groups.id.fieldNames.form_of_training}
            </div>
          </div>
        )}
        <div className="row">
          <div
            className={
              groups.id.fieldNames.financial_status ? 'col-md-4' : 'col-md-8'
            }
          >
            {groups.id.fieldNames.text}
          </div>
          {groups.id.fieldNames.financial_status && (
            <div className="col-md-4">
              {groups.id.fieldNames.financial_status}
            </div>
          )}
          <div className="col-md-2 m-t-20 text-center">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default SearchFormLayout;
