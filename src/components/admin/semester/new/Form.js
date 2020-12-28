import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { t2 } from 'translate';
import semesterSchema from '../schema/form';

class Form extends Component {
  render() {
    const { mode, step, node } = this.props;
    const title = this.props.title || t2('new_semester');
    const formid = this.props.formid || 'new_semester';

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'semester'}
          schema={semesterSchema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          formid={formid}
          searchFormId="semester_search"
        />
      </div>
    );
  }
}

export default connect()(Form);
