import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import skillSchema from 'components/admin/skill/schema/form';
import get from 'lodash.get';

class Form extends Component {
  render() {
    const { mode, step, node, params, rubricSubTypeEnables } = this.props;
    const title =
      this.props.title || step === 'rubric'
        ? t1('new_rubric')
        : t1('new_skill');
    const formid = this.props.formid || 'new_skill';

    // const alternativeApi = node.type == 'rubric' ? '/rubrik/api/update' : '/skill/update';

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
          searchFormId="skill_search"
          params={params}
          formType={this.props.formType}
          rubricSubTypeEnables={rubricSubTypeEnables}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    rubricSubTypeEnables: get(state, 'domainInfo.conf.rubric_sub_types_enable'),
  };
};

export default connect(mapStateToProps)(Form);
