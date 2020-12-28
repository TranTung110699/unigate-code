import React from 'react';
import PropTypes from 'prop-types';
import apiUrls from 'api-endpoints';
import NodeNew from 'components/admin/node/new';
import RaisedButton from 'components/common/mui/RaisedButton';
import Icon from 'components/common/Icon';
import Paper from 'material-ui/Paper';
import { t1 } from 'translate';
import { feeStatuses } from 'configs/constants';
import schema from './schema';

class ChangeStatus extends React.PureComponent {
  render() {
    const { user, searchFormId, fees, status } = this.props;

    if (!Array.isArray(fees) || !fees.length) {
      return <p>Khong co phi hop le</p>;
    }

    const hiddenFields = {
      status,
    };

    const propsGetSchema = {
      fees,
      hiddenFields,
    };

    return (
      <div>
        <div style={{ padding: 10 }}>{t1('student_information')}</div>
        <Paper style={{ padding: 16 }}>
          <div>{`${t1('full_name')}: ${(user && user.name) || ''}`}</div>
          {user && user.code && <div>{`${t1('code')}: ${user.code}`}</div>}
          {user && user.email && <div>{`${t1('email')}: ${user.email}`}</div>}
          {user && user.phone && <div>{`${t1('phone')}: ${user.phone}`}</div>}
        </Paper>
        {fees.length > 1 && <div style={{ padding: 10 }}>{t1('fees')}</div>}
        <Paper>
          <NodeNew
            step="status"
            mode="update"
            hiddenFields={hiddenFields}
            schema={schema(propsGetSchema)}
            closeModal
            alternativeApi={apiUrls.update_node('fee')}
            formid="change-status-fees"
            searchFormId={searchFormId}
            submitButton={
              <div className="text-center m-b-20">
                <RaisedButton
                  icon={<Icon icon="edit" />}
                  label={
                    status === feeStatuses.CANCELLED
                      ? t1('cancellation')
                      : t1('reactivate')
                  }
                  primary
                  type="submit"
                />
              </div>
            }
          />
        </Paper>
      </div>
    );
  }
}

ChangeStatus.propTypes = {
  className: PropTypes.string,
};

ChangeStatus.defaultProps = {
  className: '',
};

export default ChangeStatus;
