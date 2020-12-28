import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';
import FormCreateSession from './Create';

class CreateNewSessions extends Component {
  render() {
    const { formid, node, hasPermUpdate } = this.props;
    if (!hasPermUpdate) {
      return null;
    }
    return (
      <DetailOnDialog
        renderPreview={({ showFull }) => (
          <RaisedButton
            className="m-r-10"
            label={t1('create_class_sessions')}
            labelPosition="after"
            onClick={showFull}
            primary
            icon="plus"
          />
        )}
        renderFull={() => (
          <FormCreateSession
            searchFormId={formid}
            hiddenFields={{
              course_iid: node && node.iid,
              type: node && node.ntype === 'syllabus' ? 'plan' : '',
            }}
            node={node}
          />
        )}
        dialogOptionsProperties={{
          width: '50%',
          handleClose: true,
          title: t1('add_session_for_syllabus:_%s', node.name),
        }}
        dialogKey="add_session_for_syllabus"
      />
    );
  }
}

export default connect()(CreateNewSessions);
