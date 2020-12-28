import React, { Component } from 'react';
import { t1 } from 'translate';
import EditChildren from 'components/admin/node/edit/metadata-v2/MetadataContainer';
import SwitchControls from 'components/common/SwitchControls';
import { statusSwitch } from 'components/admin/syllabus/edit/switch-controls';
import Widget from 'components/common/Widget';

class EditCurriculum extends Component {
  render() {
    const {
      node,
      syllabus,
      readOnly,
      action,
      itemAncestors,
      isCompact,
      columns,
    } = this.props;

    return (
      <React.Fragment>
        <EditChildren
          columns={columns}
          node={node}
          syllabus={syllabus}
          fieldEdit="children"
          readOnly={readOnly}
          action={action}
          itemAncestors={itemAncestors}
          isCompact={isCompact}
        />
        <div className="m-t-10">
          <Widget title={t1('syllabus_status')} noMinHeight>
            <SwitchControls items={[statusSwitch(this.props.node)]} />
          </Widget>
        </div>
      </React.Fragment>
    );
  }
}

export default EditCurriculum;
