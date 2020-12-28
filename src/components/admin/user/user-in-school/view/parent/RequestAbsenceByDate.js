import React from 'react';
import getLodash from 'lodash.get';

import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import { reqTypes } from 'configs/constants';
import RequestAbsenceForm from 'components/admin/node/new';
import reqSchema from 'components/admin/req/schema/form';
import DetailOnDialog from 'components/common/detail-on-dialog';
import nodeActions from 'actions/node/creators';

class RequestAbsenceByDate extends React.Component {
  requestAbsenceByDateForChildOfParent = ({ closeDialog }) => {
    const { dispatch } = this.props;
    const node = {
      request_type: reqTypes.LEAVE_OF_ABSENCE_BY_DATE,
      request_data: {
        leave_of_absence_by_date: {
          user_iid: getLodash(this.props, 'user.iid'),
        },
      },
    };

    return (
      <RequestAbsenceForm
        mode="new"
        ntype="req"
        schema={reqSchema({ hiddenFields: node })}
        a
        hiddenFields={{
          request_type: reqTypes.LEAVE_OF_ABSENCE_BY_DATE,
        }}
        node={node}
        resetForm
        formid="request_leave_of_absence_by_date"
        requestSuccessful={() => {
          dispatch(
            nodeActions.snackbar(
              true,
              t1('request_to_leave_of_absence_successful'),
            ),
          );
          closeDialog();
        }}
      />
    );
  };

  render() {
    return (
      <DetailOnDialog
        renderPreview={({ showFull }) => (
          <div onClick={showFull}>
            {t1('request_to_leave_of_absence')}{' '}
            <Icon
              title={t1('request')}
              style={{ cursor: 'pointer' }}
              icon="request"
            />
          </div>
        )}
        renderFull={this.requestAbsenceByDateForChildOfParent}
        dialogOptionsProperties={{
          handleClose: true,
          title: `${t1('request_absence')} - ${getLodash(
            this.props,
            'user.name',
          )}`,
        }}
      />
    );
  }
}

export default RequestAbsenceByDate;
