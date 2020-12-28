import React, { Component } from 'react';
import { t1 } from 'translate';
import schema from 'components/admin/exercise/schema/form';
import NodeNew from 'components/admin/node/new/';

class ExerciseAdvancedSettings extends Component {
  render() {
    const { node, readOnly } = this.props;
    return (
      <NodeNew
        key={node.iid}
        schema={schema}
        readOnly={readOnly}
        message={readOnly ? `(*${t1('this_form_is_read_only')})` : ''}
        ntype={node.ntype}
        node={node}
        mode="edit"
        step="advanced_settings"
      />
    );
  }
}

export default ExerciseAdvancedSettings;
