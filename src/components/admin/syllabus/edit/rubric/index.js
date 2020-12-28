import React, { Component } from 'react';
import { connect } from 'react-redux';
import { extractObject } from 'common/utils/Array';
import SkillMetadata from 'components/admin/skill/skill/metadata';
import NodeNew from 'components/admin/node/new';
import actions from 'actions/node/creators';
import { ntype } from 'configs/constants';
import schema from 'components/admin/syllabus/schema/form';
import skillSchema from 'components/admin/skill/schema/form';
import Warning from 'components/common/Warning';

class EditSyllabusRubric extends Component {
  render() {
    const { syllabus } = this.props;

    return (
      <div>
        <NodeNew
          node={syllabus}
          ntype={'syllabus'}
          mode={'edit'}
          step={'rubric'}
          schema={schema}
          formid="edit_syllabus_rubric"
        />
      </div>
    );
  }
}

export default connect()(EditSyllabusRubric);
