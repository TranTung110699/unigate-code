import React from 'react';
import './flex.scss';

class FlexBox extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  render() {
    const {
      groups,
      readOnly,
      message,
      addNewAndEditButton,
      showAddNewAndEditButton,
    } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    // const { columns } = this.props;

    return (
      <div>
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="flex-wraper-container">
          {Object.keys(groups).map((id) => groups[id])}
        </div>
        <div className="form-button-groups">
          {submitButton}
          {showAddNewAndEditButton && addNewAndEditButton}
        </div>
      </div>
    );
  }
}

export default FlexBox;
