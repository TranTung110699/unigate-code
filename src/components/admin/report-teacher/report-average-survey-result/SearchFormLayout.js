import React from 'react';
import connect from 'react-redux/es/connect/connect';

class SearchFormLayout extends React.PureComponent {
  render() {
    const { groups, submitButton } = this.props;
    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          {groups.default.fieldNames.learning_type && (
            <div className="col-md-3">
              {groups.default.fieldNames.learning_type}
            </div>
          )}
          {groups.default.fieldNames.year && (
            <div className="col-md-3">{groups.default.fieldNames.year}</div>
          )}
        </div>
        <div className="row">
          <div className="col-md-12 m-t-20 text-center">{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default connect()(SearchFormLayout);
