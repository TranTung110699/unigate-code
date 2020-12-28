import { t2 } from 'translate';
import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import venueSchema from 'components/admin/venue/room/schema/form';

class Form extends Component {
  render() {
    const { mode, step, node, params, requestSuccessful } = this.props;
    const title = this.props.title || t2('new_room');
    const formid = this.props.formid || 'new_room';

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'venue'}
          schema={venueSchema}
          mode={mode}
          step={step}
          requestSuccessful={requestSuccessful}
          node={node}
          hiddenFields={params}
          closeModal
          searchFormId="venue_room_search"
          formid={formid}
        />
      </div>
    );
  }
}

export default connect()(Form);
