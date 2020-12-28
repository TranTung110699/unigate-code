/**
 * Created by vohung on 29/05/2017.
 */
import React, { Component } from 'react';
import EditMetadata from 'components/admin/node/edit/metadata/MetadataContainer';
import get from 'lodash.get';

class Metadata extends Component {
  render() {
    const fieldEdit = this.props.fieldEdit || 'metadata';
    return (
      <EditMetadata
        fieldEdit={fieldEdit}
        node={this.props.node}
        readOnly={this.props.readOnly}
        syllabusIid={get(this.props, 'syllabus.iid')}
      />
    );
  }
}

export default Metadata;
