import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Tabs from 'components/common/tabs';
import AddUsersToGroup from 'components/admin/group/edit/member/add/search-user/Layout';
import AddUsersFromManualGroupsToEnrolmentPlan from 'components/admin/group/search';
import SearchRequests from 'components/admin/req/search';
import rt from 'configs/constants/group-members-relationship-types';
import { getGroupOfEnrolmentPlan } from 'components/admin/node/utils';
import {
  fetchEnrolmentPlanData,
  userRtWhenJoiningEnrolmentPlanGivenConf,
} from '../../../common';
import { reqStatuses, reqTypes, userGroupSubTypes } from 'configs/constants';
import ButtonAction from 'components/common/action-button/UpdateBtnWithConfirmDialog';
// import apiUrls from 'api-endpoints';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import lodashGet from 'lodash.get';
import selectedUsersModes from 'components/admin/group/edit/member/action-buttons/configs';
import { createSelector } from 'reselect';
import { confSelector } from 'common/selectors';

const searchRequestsFormId = 'search_req_for_enrolment_plan';

class AddMembersToEp extends React.PureComponent {
  handleAddUserSuccessful = (mode) => {
    const { enrolmentPlan, closeDialog } = this.props;
    fetchEnrolmentPlanData(enrolmentPlan);
    if (mode === selectedUsersModes.PERFORM_ALL_MATCHING_RESULTS) {
      closeDialog();
    }
  };

  renderSearchRequestActionCell = (item) => {
    const {} = this.props;
    if (!item) {
      return null;
    }

    return (
      <ButtonAction
        icon="plus"
        textConfirm={t1('do_you_want_to_add_this_member_to_enrolment_plan?')}
        alternativeApi={
          epApiUrls.add_user_to_enrolment_plan_group_through_request
        }
        searchFormId={searchRequestsFormId}
        data={{
          enrolment_plan_iid: lodashGet(this.props.enrolmentPlan, 'iid'),
          request_iid: item.iid,
        }}
        onRequestSuccessful={this.handleAddUserSuccessful}
      />
    );
  };

  renderSearchGroupActionCell = (item) => {
    const { enrolmentPlan } = this.props;
    if (!item) {
      return null;
    }

    return (
      <ButtonAction
        icon="plus"
        textConfirm={t1(
          'do_you_want_to_add_all_users_in_this_group_to_enrolment_plan?',
        )}
        closeModal
        title={t1('add_all_users_in_group')}
        alternativeApi={epApiUrls.add_group_users_to_enrolment_plan}
        data={{
          enrolment_plan_iid: lodashGet(this.props.enrolmentPlan, 'iid'),
          group_iid: item.iid,
        }}
        onRequestSuccessful={this.handleAddUserSuccessful}
      />
    );
  };

  render() {
    const { enrolmentPlan, userRtWhenJoiningEnrolmentPlan } = this.props;

    const orgIids = enrolmentPlan && enrolmentPlan.organizations;

    return (
      <div>
        <Tabs
          tabs={[
            {
              label: t1('users'),
              content: (
                <AddUsersToGroup
                  group={getGroupOfEnrolmentPlan(enrolmentPlan)}
                  newRtOfRelation={userRtWhenJoiningEnrolmentPlan}
                  action="members"
                  subAction="new"
                  renderActionCell={() => null}
                  dataNotToShow={['is_staff']}
                  hiddenFields={{
                    requireOrganization: Boolean(
                      Array.isArray(orgIids) && orgIids.length,
                    ),
                    organizationRootIids: orgIids,
                    includeRootOrganizations: 1,
                    getOnlyOrganizationWhereUserHasPermission: 1,
                  }}
                  onUserRelationshipChange={this.handleAddUserSuccessful}
                />
              ),
            },
            ...(!window.isETEP
              ? [
                  {
                    label: t1('groups'),
                    content: (
                      <AddUsersFromManualGroupsToEnrolmentPlan
                        type={'user_group'}
                        renderResultActions={this.renderSearchGroupActionCell}
                        hiddenFields={{
                          type: ['user_group'],
                          _sand_step: 'user_group',
                          sub_type: [userGroupSubTypes.NORMAL_USER_GROUP],
                          smart: 0,

                          requireOrganization: Boolean(
                            Array.isArray(orgIids) && orgIids.length,
                          ),
                          organizationRootIids: orgIids,
                          includeRootOrganizations: 1,
                          getOnlyOrganizationWhereUserHasPermission: 1,
                        }}
                      />
                    ),
                  },
                ]
              : []),
            ...(this.props.epHasRequests
              ? [
                  {
                    label: t1('requests'),
                    content: (
                      <SearchRequests
                        formid={searchRequestsFormId}
                        renderActionCell={this.renderSearchRequestActionCell}
                        hiddenFields={{
                          request_type: reqTypes.REGISTER_CREDIT_SYLLABUS,
                          status: [reqStatuses.STATUS_SENT],
                          minRegisterCreditSyllabusDate: lodashGet(
                            enrolmentPlan,
                            'start_date',
                          ),
                          maxRegisterCreditSyllabusDate: lodashGet(
                            enrolmentPlan,
                            'end_date',
                          ),
                        }}
                        node={{
                          requester: {
                            organizations: orgIids,
                          },
                        }}
                      />
                    ),
                  },
                ]
              : []),
          ]}
        />
      </div>
    );
  }
}

AddMembersToEp.propTypes = {
  className: PropTypes.string,
  course: PropTypes.shape(),
  group: PropTypes.shape(),
};

AddMembersToEp.defaultProps = {
  className: '',
  course: null,
  group: null,
};

const mapStateToProps = createSelector(
  confSelector,
  (conf) => ({
    epHasRequests: lodashGet(conf, 'enrolment_plan_has_requests'),
    userRtWhenJoiningEnrolmentPlan: userRtWhenJoiningEnrolmentPlanGivenConf(
      conf,
    ),
  }),
);

export default connect(mapStateToProps)(AddMembersToEp);
