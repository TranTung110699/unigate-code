import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';
import EditSession from '../edit';
import { t1 } from 'translate';

class EditSessionButton extends Component {
  render() {
    const { session, formid, node, hasPermUpdate } = this.props;
    if (!hasPermUpdate) {
      return null;
    }

    // return <Link to={hashUrl(`/admin/session/${session.iid}/update`)}>edit</Link>;

    return (
      <DetailOnDialog
        renderPreview={({ showFull }) => (
          <Icon
            icon="edit"
            onClick={showFull}
            className="link"
            title={t1('edit')}
          />
        )}
        renderFull={() => (
          <EditSession
            searchFormId={formid}
            hiddenFields={{
              course_iid: node && node.iid,
              type: node && node.ntype === 'syllabus' ? 'plan' : '',
            }}
            node={session}
          />
        )}
        dialogOptionsProperties={{
          width: '50%',
          handleClose: true,
          title: `${t1('editing_session')}: ${node.name}`,
        }}
        dialogKey="edit_session"
      />
    );
  }
}

export default connect()(EditSessionButton);
