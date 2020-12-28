import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t2 } from 'translate';
import teachingExperience from 'components/admin/user/teacher-search/edit/teaching-experience/schema/form';

class Form extends Component {
  render() {
    const { mode, /*step,*/ node, teacher } = this.props;
    const title = this.props.title || t2('new_teaching_experience');
    const formid = this.props.formid || 'new_teaching_experience';
    const teacherId = (teacher && teacher.id) || null;
    const hiddenFields = {
      experience_index: node.experience_index,
      id: teacherId,
    };

    return (
      <NodeNew
        title={title}
        ntype={'teaching_experience'}
        schema={teachingExperience}
        mode={mode}
        step={'teaching_experience'}
        node={node}
        closeModal
        formid={formid}
        alternativeApi={'user/update'}
        hiddenFields={hiddenFields}
        searchFormId="teaching_experience_search"
      />
    );
  }
}

Form.propTypes = {
  teacher: PropTypes.shape(),
  node: PropTypes.shape(),
};

Form.defaultProps = {
  teacher: {},
  node: {},
};

export default connect()(Form);
