import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import redisSchema from 'components/admin/system/redis/schema/form';

class Form extends Component {
  render() {
    const { mode, step, node } = this.props;
    const title = this.props.title;
    const formid = this.props.formid || 'new_redis';
    const hiddenFields = {
      _sand_is_system: 1,
      site: 'edx',
    };
    return (
      <div>
        <NodeNew
          title={title}
          ntype={'redis'}
          schema={redisSchema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          searchFormId="redis_search"
          formid={formid}
          hiddenFields={hiddenFields}
        />
      </div>
    );
  }
}

export default connect()(Form);
