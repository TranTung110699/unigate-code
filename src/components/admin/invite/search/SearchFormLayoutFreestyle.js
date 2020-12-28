import React, { Component } from 'react';
import { t1 } from 'translate';
import get from 'lodash.get';
import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';
import DetailOnDialog from 'components/common/detail-on-dialog';

class InviteSearchFormLayout extends Component {
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

    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="p-b-10">
        <div className="row row p-r-15 p-l-15">
          <div className="col-md-12">{groups.default.fieldNames.major_box}</div>
        </div>
        <div className="row p-r-30 p-l-30">
          <div className="col-md-6">
            {groups.default.fieldNames.course_text}
          </div>
          <div className="col-md-6">
            {groups.default.fieldNames.course_credit_syllabus_text}
          </div>
        </div>
        <div className="row p-r-30 p-l-30">
          <div className="col-md-12">
            {groups.default.fieldNames.sinvite_status}
          </div>
        </div>
        <div className="row p-r-30 p-l-30">
          <div className="col-md-6">{groups.default.fieldNames.q}</div>
          <div className="col-md-3">{groups.default.fieldNames.date_gte}</div>
          <div className="col-md-3">{groups.default.fieldNames.date_lte}</div>
        </div>
        <div className="row p-r-30 p-l-30">
          <div className="col-md-12">
            {groups.default.fieldNames.user_codes}
          </div>
        </div>
        <div className="row p-r-30 p-l-30">
          <div className="col-md-12 m-t-25 text-center">
            <RaisedButton
              type="submit"
              icon={<Icon icon="search" style={{ color: 'white' }} />}
              label={t1('search')}
              className="m-l-10 m-r-10"
              primary
            />
            {formNewInvite && (
              <DetailOnDialog
                renderPreview={({ showFull }) => (
                  <RaisedButton
                    primary
                    onClick={showFull}
                    icon={<Icon icon="create" style={{ color: 'white' }} />}
                    label={t1('new_invite')}
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
          </div>
        </div>
      </div>
    );
  }
}

export default InviteSearchFormLayout;
