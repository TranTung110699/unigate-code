/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Perm from 'common/utils/Perm';
import { connect } from 'react-redux';
import ActionToggle from 'components/common/toggle/ActionToggle';
import TwoSideToggle from 'schema-form/elements/toggle/TwoSideToggle';
import { t1 } from 'translate';
import sagaActions from 'actions/node/saga-creators';
import RoleEditorForm from 'components/admin/user-abac-role/role-editor/Form';
import actions from 'actions/node/creators';
import { abacRoleTypes } from 'configs/constants';
import lodashGet from 'lodash.get';

const actionToggleLabelSet = { on: t1('staff'), off: t1('no') };
const actionToggleDataSet = { on: 'add', off: 'kickout' };

class UpdateStaffStatus extends React.Component {
  showEditRoleDialog() {
    const { dispatch, node } = this.props;

    let contentDialog;

    const organizations =
      lodashGet(node, 'organizations') ||
      lodashGet(node, '__expand.user_organizations');
    if (!organizations || !organizations.length) {
      contentDialog = (
        <div>
          <h1>{t1('this_user_does_not_belong_to_any_organizations')}</h1>
        </div>
      );
    }

    contentDialog = (
      <div>
        {organizations.map((org) => {
          return (
            <div key={`role-editor-${node.iid}-${org.iid}`}>
              <b>{org.name}</b>
              <RoleEditorForm
                appliedTarget={org}
                type={abacRoleTypes.SCHOOL}
                user={node}
                requestSuccessful={() => {
                  window.location.reload();
                }}
              />
            </div>
          );
        })}
      </div>
    );

    const optionsProperties = {
      handleClose: true,

      title: t1('edit_staff_organizational_roles'),
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { node, domain, noLabel } = this.props;
    const isTrainer = Perm.hasPerm('staff', domain, node);

    const url = '/school/add-staff';
    const params = {
      userIid: node && node.iid,
      user_organizations: node && node.user_organizations,
    };

    const toggle = (
      <ActionToggle
        label={noLabel ? undefined : t1('is_staff')}
        labelSet={noLabel ? undefined : actionToggleLabelSet}
        baseURL={url}
        params={params}
        dataSet={actionToggleDataSet}
        value={isTrainer ? 'add' : 'kickout'}
        name="status"
        handleChange={(event, toggled) => {
          this.props.dispatch(
            sagaActions.updateNodeRequest({
              alternativeApi: url,
              iid: node.iid,
              data: {
                userIid: node && node.iid,
                user_organizations: node && node.user_organizations,
                status: toggled ? 'add' : 'kickout',
              },
              requestSuccessful: () => {
                if (toggled) {
                  this.showEditRoleDialog();
                } else window.location.reload();
              },
            }),
          );
        }}
      />
    );
    return toggle;

    const onLabel = noLabel ? '' : t1('is_training_staff');
    const offLabel = noLabel ? '' : t1('not_training_staff');
    return (
      <div>
        <TwoSideToggle
          onLabel={onLabel}
          offLabel={offLabel}
          toggled={isTrainer}
          onToggle={(event, toggled) => {
            this.props.dispatch(
              sagaActions.updateNodeRequest({
                alternativeApi: url,
                iid: node.iid,
                data: {
                  userIid: node && node.iid,
                  user_organizations: node && node.user_organizations,
                  status: toggled ? 'add' : 'kickout',
                },
                requestSuccessful: () => {
                  console.log('abcdddd');
                  if (toggled) {
                    this.showEditRoleDialog();
                  } else window.location.reload();
                },
              }),
            );
          }}
        />
      </div>
    );
  }
}

UpdateStaffStatus.propTypes = {
  className: PropTypes.string,
  teacher: PropTypes.shape(),
};

UpdateStaffStatus.defaultProps = {
  className: '',
  teacher: null,
};

const mapStateToProps = (state) => {
  const domainInfo = state.domainInfo;
  return {
    domain: domainInfo && domainInfo.domain,
  };
};

export default connect(mapStateToProps)(UpdateStaffStatus);
