import React from 'react';

class QuestionEdit extends React.PureComponent {
  render() {
    const {
      groups,
      groupsMetadata,
      isTesting,
      readOnly,
      hideSubmitButton,
    } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }
    return (
      <div className="row">
        <div className="col-md-12">
          {groupsMetadata.map((g) => {
            if (g.id !== 'left') {
              return groups[g.id];
            }
            return '';
          })}
          <div>{!isTesting && !hideSubmitButton && submitButton}</div>
        </div>
      </div>
    );
  }
}

export default QuestionEdit;
