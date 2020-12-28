import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { t2 } from 'translate';
import room from 'components/admin/room/schema/form';

class Form extends Component {
  render() {
    const { mode, step, node } = this.props;
    const title = this.props.title || t2('new_room');
    const formid = this.props.formid || 'new_room';

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'room'}
          schema={room}
          mode={mode}
          step={step}
          node={node}
          closeModal
          formid={formid}
          searchFormId="room_search"
        />
      </div>
    );
  }
}

export default connect()(Form);
