import React, { Component } from 'react';
import { connect } from 'react-redux';
import NodeNew from 'components/admin/node/new';
import schema from 'components/admin/course/schema/form';

class EditCourseRubric extends Component {
  render() {
    const { node } = this.props;

    return (
      <div>
        <NodeNew
          node={node}
          ntype={'course'}
          mode={'edit'}
          step={'rubric'}
          schema={schema}
          formid="edit_course_rubric"
        />
      </div>
    );
  }
}

export default connect()(EditCourseRubric);
