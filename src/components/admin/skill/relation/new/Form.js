import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import skillSchema from 'components/admin/skill/schema/form';

class Form extends Component {
  render() {
    const { mode, step, node } = this.props;
    const title = this.props.title || t1('new_skill_relation');
    const formid = this.props.formid || 'new_skill_relation';

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'skill'}
          schema={skillSchema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          formid={formid}
        />
      </div>
    );
  }
}

export default connect()(Form);
