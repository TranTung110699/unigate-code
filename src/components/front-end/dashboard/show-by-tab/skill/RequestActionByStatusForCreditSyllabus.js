import React from 'react';
import getLodash from 'lodash.get';

import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import { reqStatuses, reqTypes } from 'configs/constants';
import RegisterCreditSyllabusForm from 'components/admin/node/new';
import reqSchema from 'components/admin/req/schema/form';
import DetailOnDialog from 'components/common/detail-on-dialog';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';

class RequestActionByStatusForCreditSyllabus extends React.Component {
  registerCreditSyllabus = ({ closeDialog }) => {
    const node = {
      request_type: reqTypes.REGISTER_CREDIT_SYLLABUS,
      request_data: {
        register_credit_syllabus: {
          iid: getLodash(this.props, 'creditSyllabus.iid'),
        },
      },
    };

    return (
      <RegisterCreditSyllabusForm
        mode="new"
        ntype="req"
        schema={reqSchema({ hiddenFields: node })}
        hiddenFields={{
          request_type: reqTypes.REGISTER_CREDIT_SYLLABUS,
        }}
        node={node}
        resetForm
        formid="register_credit_syllabus"
        requestSuccessful={() => {
          closeDialog();
          this.props.getCreditSyllabusesOfSkill();
        }}
      />
    );
  };

  render() {
    const status = getLodash(this.props, 'creditSyllabus.request_info.status');

    if (status === reqStatuses.STATUS_SENT) {
      return (
        <DeleteItem
          title={t1('cancel')}
          alternativeApi="/req/update"
          step="status"
          params={{
            status: reqStatuses.STATUS_CANCEL,
          }}
          ntype="req"
          iconButton={
            <Icon
              title={t1('cancel_request')}
              style={{ cursor: 'pointer' }}
              icon="clear"
            />
          }
          onRequestSuccessful={this.props.getCreditSyllabusesOfSkill}
          itemId={getLodash(this.props, 'creditSyllabus.request_info.id')}
        />
      );
    } else if (status === reqStatuses.STATUS_PROCESSING) {
      return <span>{t1('waiting_for_more_information')}</span>;
    } else if (status && status !== reqStatuses.STATUS_CANCEL) {
      return <span>{t1(status)}</span>;
    }

    return (
      <DetailOnDialog
        renderPreview={({ showFull }) => (
          <Icon
            title={t1('request')}
            style={{ cursor: 'pointer' }}
            icon="request"
            onClick={showFull}
          />
        )}
        renderFull={this.registerCreditSyllabus}
        dialogOptionsProperties={{
          handleClose: true,
          title: `${t1('register_credit_syllabus')} - ${getLodash(
            this.props,
            'creditSyllabus.name',
          )}`,
        }}
      />
    );
  }
}

export default RequestActionByStatusForCreditSyllabus;
