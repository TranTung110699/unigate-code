import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';
import FormCreateSession from './Create';

class CloneSessions extends Component {
  render() {
    const { formid, node, session_ids } = this.props;
    return (
      <DetailOnDialog
        renderPreview={({ showFull }) => (
          <RaisedButton
            className="m-r-10"
            disabled={!Array.isArray(session_ids) || !session_ids.length}
            label={t1('clone_session')}
            labelPosition="after"
            onClick={showFull}
            primary
            icon="copy"
          />
        )}
        renderFull={() => (
          <FormCreateSession
            searchFormId={formid}
            hiddenFields={{
              course_iid: node && node.iid,
              session_ids,
            }}
            node={node}
          />
        )}
      />
    );
  }
}

export default connect()(CloneSessions);
