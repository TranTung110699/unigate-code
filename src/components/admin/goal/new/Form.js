import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import goal from 'components/admin/goal/schema/form';

class Form extends Component {
  render() {
    const { mode, step, node, params } = this.props;
    const formid = this.props.formid || 'new_goal';
    const alternativeApi = this.props.alternativeApi;

    return (
      <div>
        <NodeNew
          ntype={'goal'}
          schema={goal}
          mode={mode}
          step={step}
          node={node}
          closeModal
          alternativeApi={alternativeApi}
          formid={formid}
          searchFormId="goal_search"
          params={params}
        />
      </div>
    );
  }
}

export default connect()(Form);
