import React from 'react';
import PropTypes from 'prop-types';
import UpdateBtnWithConfirmDialog from 'components/common/action-button/UpdateBtnWithConfirmDialog';
import Toggle from 'material-ui/Toggle';
import { surveyStatuses, surveyStatusToText } from 'configs/constants/survey';
import lodashGet from 'lodash.get';

class ApproveToggle extends React.Component {
  render() {
    const { node } = this.props;
    return (
      <UpdateBtnWithConfirmDialog
        renderComponent={({ onClick }) => (
          <Toggle
            onToggle={onClick}
            toggled={lodashGet(node, 'status') === surveyStatuses.APPROVED}
            label={surveyStatusToText(lodashGet(node, 'status'))}
          />
        )}
        noConfirm
        step={'approval'}
        iid={lodashGet(node, 'iid')}
        data={{
          status:
            lodashGet(node, 'status') !== surveyStatuses.APPROVED
              ? surveyStatuses.APPROVED
              : surveyStatuses.QUEUED,
          id: lodashGet(node, 'id'),
          ntype: lodashGet(node, 'ntype'),
        }}
      />
    );
  }
}

ApproveToggle.propTypes = {
  className: PropTypes.string,
};

ApproveToggle.defaultProps = {
  className: '',
};

export default ApproveToggle;
