import React from 'react';

class FormFreeStyle extends React.Component {
  render() {
    const { groups, submitButton } = this.props;

    return (
      <div className="d-flex container-fluid align-items-center">
        {groups.filter_comment.fieldNames.q}
        {groups.filter_comment.fieldNames.search_entire_syllabus}
        {groups.filter_comment.fieldNames.role}
        {groups.filter_comment.fieldNames.comment_type}
        {submitButton}
      </div>
    );
  }
}

export default FormFreeStyle;
