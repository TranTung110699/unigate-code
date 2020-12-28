import React, { Fragment } from 'react';
import { t1 } from 'translate';
import { connect } from 'react-redux';

class LayoutFreestyle extends React.PureComponent {
  styles = {};

  render() {
    const { groups, readOnly } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid elementGroup">
        <div
          className="row"
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ flexGrow: 1 }}>
            {groups.id.fieldNames.attach_result_files}
          </div>
          <div style={{ margin: 10 }}>{submitButton}</div>
        </div>
      </div>
    );
  }
}

export default connect()(LayoutFreestyle);
