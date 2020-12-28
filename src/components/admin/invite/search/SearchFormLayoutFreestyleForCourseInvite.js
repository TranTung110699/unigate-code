import React, { Component } from 'react';
import { t1 } from 'translate';
import get from 'lodash.get';
import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';
import DetailOnDialog from 'components/common/detail-on-dialog';
import AntButton from 'antd/lib/button';
import commonSagaActions from 'actions/saga-creators';

class InviteSearchFormLayout extends Component {
  handleExportMembers = () => {
    const { dispatch, valuesToSubmit } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        '/sinvite/api/export-members',
        valuesToSubmit,
      ),
    );
  };

  render() {
    const { groups, readOnly } = this.props;

    const formNewInvite = get(
      this.props,
      'layoutOptionsProperties.formNewInvite',
    );

    const buttonImportInvite = get(
      this.props,
      'layoutOptionsProperties.buttonImportInvite',
    );

    const buttonBatchInviteEnrolmentPlanMembers = get(
      this.props,
      'layoutOptionsProperties.buttonBatchInviteEnrolmentPlanMembers',
    );

    const exportMembers = get(
      this.props,
      'layoutOptionsProperties.exportMembers',
    );

    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5">{groups.default.fieldNames.q}</div>
          <div className="col-md-5">{groups.default.fieldNames.user_codes}</div>
          <div className="col-md-2">
            <RaisedButton
              type="submit"
              icon={<Icon icon="search" style={{ color: 'white' }} />}
              label={t1('search')}
              primary
              className="m-t-30"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 m-t-10 m-b-20 text-center">
            {formNewInvite && (
              <DetailOnDialog
                renderPreview={({ showFull }) => (
                  <RaisedButton
                    primary
                    onClick={showFull}
                    icon={<Icon icon="plus" style={{ color: 'white' }} />}
                    label={t1('add_student')}
                    className="m-l-10 m-r-10"
                  />
                )}
                renderFull={({ closeDialog }) => {
                  // closeDialog();
                  return formNewInvite;
                }}
                dialogOptionsProperties={{
                  handleClose: true,
                  width: '85%',
                }}
                dialogKey="new_invite"
              />
            )}

            {buttonImportInvite}
            {buttonBatchInviteEnrolmentPlanMembers}
            {!!exportMembers && (
              <AntButton
                type="primary"
                icon="export"
                onClick={this.handleExportMembers}
                className="ant-button-wrapper m-r-10"
              >
                {t1('export_members')}
              </AntButton>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default InviteSearchFormLayout;
