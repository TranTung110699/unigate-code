import { t2 } from 'translate';
import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import venueSchema from 'components/admin/venue/room/schema/form';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';

class Form extends Component {
  render() {
    const { node } = this.props;
    const title = this.props.title || t2('new_room');
    const formid = this.props.formid || 'new_room';

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'venue'}
          schema={venueSchema}
          mode={'edit'}
          step=""
          node={node}
          closeModal
          searchFormId="venue_room_search"
          formid={formid}
        />
      </div>
    );
  }
}

export default connect()(withNodeEditContainer(Form));
