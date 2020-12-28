import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector, reset } from 'redux-form';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './advance';
import apiUrls from 'api-endpoints';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import { t1 } from 'translate';
import { createSelector } from 'reselect';
import { confSelector } from 'common/selectors';
import { getSearchFormId } from '../common';
import { isEnrolmentPlan } from 'components/admin/node/utils';
import {
  doesEnrolmentPlanMembersNeedApprovalGivenConf,
  fetchEnrolmentPlanData,
  isEnrolmentPlanHasTrainingPlan,
} from 'components/admin/enrolment-plan/common';
import ApproveBatchButton from 'components/admin/enrolment-plan/common/members/approve/batch/Button';
import RejectBatchButton from 'components/admin/enrolment-plan/common/members/reject/batch/Button';
import RemoveBatchButton from 'components/admin/enrolment-plan/common/members/remove/batch/Button';
import NotifyWarningButton from 'components/admin/enrolment-plan/common/members/warring/batch/Button';
import SubmitForApprovalButton from 'components/admin/enrolment-plan/common/members/submit-for-approval/Button';
import lodashGet from 'lodash.get';
import ResultsNew from './Results-new';
import ResultsEtep from './results-etep';
import routes from 'routes';
import ButtonNew from '../new/ButtonNew';
import { Link } from 'react-router-dom';
import Icon from 'components/common/Icon';
import NewButton from 'components/common/primary-button';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import { ButtonType } from 'components/common/primary-button/button-type-constants';
import withETEP from 'common/hoc/withETEP';
import AntButton from 'antd/lib/button';
import commonSagaActions from 'actions/saga-creators';

const resultFormId = (usersOverallProgress) =>
  `enrolment_plan_members${usersOverallProgress ? '_results' : ''}`;
const resultTableFieldName = (usersOverallProgress) =>
  `results${usersOverallProgress ? '_results' : ''}`;
const keysSave = null;
const checkKey = 'id';

const shouldShowActions = (props) => {
  const { noActions, usersOverallProgress } = props;

  return !(usersOverallProgress || noActions);
};

const TheResults = window.isETEP || true ? ResultsEtep : ResultsNew;

//   TheResults = ResultsEtep;
// else //isFeatureEnabled(features.NEW_UI_JULY_2019)) {
//   TheResults = ResultsNew;
// } else
//   TheResults = Results;

class SearchEpMembers extends React.Component {
  handleUserRelationshipChange = () => {
    const { enrolmentPlan, dispatch, usersOverallProgress } = this.props;
    fetchEnrolmentPlanData(enrolmentPlan);
    dispatch(reset(resultFormId(usersOverallProgress)));
  };

  handleExportMembers = (trainingPlan, enrolmentPlan, valuesToSubmit) => {
    const { dispatch } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        '/enrolment-plan/api/export-members',
        {
          enrolment_plan_iid: lodashGet(enrolmentPlan, 'iid'),
          training_plan_iid: lodashGet(trainingPlan, 'iid'),
          condition_to_search: valuesToSubmit,
        },
      ),
    );
  };

  renderResultComponent = (items, props, objects, searchValues, resultId) => {
    const {
      enrolmentPlan,
      trainingPlan,
      noLink,
      displayRowCheckboxOnTheRightSide,
      resultTableHeight,
      selectedItems,
      doesEnrolmentPlanMembersNeedApproval,
      actionAllows,
    } = this.props;

    const { total, valuesToSubmit } = props;

    let { columnsNotToShow, usersOverallProgress } = this.props;

    let showActions = shouldShowActions(this.props);
    // if (searchValues.usersOverallProgress) {
    if (usersOverallProgress) {
      // show detailed progress of all users.
      columnsNotToShow = [
        ...(columnsNotToShow || []),
        'location',
        'method',
        'status',
        'reason',
        'experience',
        'from_to_date',
        'action',
      ];
    } else {
      if (showActions) {
      } else {
        // this is viewing the list of members WHEN doing planning, so it's mostly
        // about approval status & reviewing list of courses each user doing
        columnsNotToShow = [
          ...(columnsNotToShow || []),
          'oe_question',
          'cp',
          'p',
        ];
      }
    }

    const searchFormId = props.formid;

    const shouldShowFooterActions = shouldShowActions(this.props);
    // TODO: when we pass trainingPlan, we don't have number_of_members in TP, so we can't not use
    // trainingPlan.number_of_members as an indicator of whether or not we should show the actions
    const shouldShowBatchApproveRejectActions =
      trainingPlan ||
      (lodashGet(enrolmentPlan, 'number_of_members') > 0 &&
        doesEnrolmentPlanMembersNeedApproval);
    const shouldShowNotifyAndRemoveBatchActions =
      trainingPlan || lodashGet(enrolmentPlan, 'number_of_members') > 0;

    const addMemberButtons =
      shouldShowFooterActions && !trainingPlan /* don't add members in TP */ ? (
        <React.Fragment>
          <Link
            to={routes.url('node_edit', {
              iid: lodashGet(enrolmentPlan, 'iid'),
              ntype: 'enrolment-plan',
              step: 'import-members',
            })}
            className="m-r-10"
          >
            <NewButton
              icon={<Icon icon="upload" className="white" />}
              label={t1('import_members_from_excel')}
            />
          </Link>

          <ButtonNew
            enrolmentPlan={enrolmentPlan}
            searchFormId={getSearchFormId(enrolmentPlan, trainingPlan)}
            className="m-r-10"
          />
        </React.Fragment>
      ) : null;

    return (
      <div>
        <ResultsEtep
          {...props}
          resultTableHeight={resultTableHeight}
          noActions={!showActions}
          noLink={noLink}
          displayRowCheckboxOnTheRightSide={displayRowCheckboxOnTheRightSide}
          resultId={resultId}
          selectable={showActions}
          columnsNotToShow={columnsNotToShow}
          form={resultFormId(usersOverallProgress)}
          resultTableFieldName={resultTableFieldName(usersOverallProgress)}
          keysSave={keysSave}
          checkKey={checkKey}
          onUserRelationshipChange={this.handleUserRelationshipChange}
          items={items}
          searchFormId={getSearchFormId(enrolmentPlan, trainingPlan)}
          node={enrolmentPlan || trainingPlan}
          searchValues={searchValues}
          {...this.props}
        />

        {shouldShowFooterActions && (
          <div className={'p-t-10 m-b-50'} style={{ float: 'left' }}>
            {shouldShowBatchApproveRejectActions &&
              (actionAllows.includes('reject') && (
                <React.Fragment>
                  {isEnrolmentPlan(enrolmentPlan) &&
                    !isEnrolmentPlanHasTrainingPlan(enrolmentPlan) && (
                      <SubmitForApprovalButton
                        primary
                        className="m-r-10"
                        node={enrolmentPlan}
                        formidToSubmitOnSuccess={searchFormId}
                      />
                    )}
                  {actionAllows.includes('approve') && (
                    <ApproveBatchButton
                      primary
                      className="m-r-10"
                      items={selectedItems}
                      requestSuccessful={this.handleUserRelationshipChange}
                      searchFormId={searchFormId}
                      icon={<Icon icon="vocab" />}
                      buttonType={ButtonType.primary}
                    />
                  )}
                  {actionAllows.includes('reject') && (
                    <RejectBatchButton
                      primary
                      className="m-r-10"
                      items={selectedItems}
                      requestSuccessful={this.handleUserRelationshipChange}
                      searchFormId={searchFormId}
                      icon={<Icon icon="close" />}
                      buttonType={ButtonType.muted}
                    />
                  )}
                </React.Fragment>
              ))}
            {shouldShowNotifyAndRemoveBatchActions && (
              <React.Fragment>
                {actionAllows.includes('delete') && (
                  <RemoveBatchButton
                    primary
                    className={'m-r-10'}
                    items={selectedItems}
                    requestSuccessful={this.handleUserRelationshipChange}
                    searchFormId={searchFormId}
                    icon={<Icon icon="delete" />}
                    buttonType={ButtonType.danger}
                  />
                )}
                {actionAllows.includes('notify') && (
                  <NotifyWarningButton
                    primary
                    className={'m-r-10'}
                    items={selectedItems}
                    node={enrolmentPlan}
                    trainingPlan={trainingPlan}
                    searchFormId={searchFormId}
                    icon={<Icon icon="submit" />}
                    buttonType={ButtonType.warning}
                    totalResult={total}
                    conditionToSearch={valuesToSubmit}
                  />
                )}
                {actionAllows.includes('export') && (
                  <AntButton
                    type="primary"
                    icon="export"
                    onClick={() =>
                      this.handleExportMembers(
                        trainingPlan,
                        enrolmentPlan,
                        valuesToSubmit,
                      )
                    }
                    className="ant-button-wrapper m-r-10"
                  >
                    {t1('export_members')}
                  </AntButton>
                )}
              </React.Fragment>
            )}
            {doesEnrolmentPlanMembersNeedApproval ? (
              <div className="m-t-10">{addMemberButtons}</div>
            ) : (
              addMemberButtons
            )}
          </div>
        )}
      </div>
    );
  };

  render() {
    const {
      enrolmentPlan,
      trainingPlan,
      noSearchForm,
      expandFields,
      hiddenFields,
      etep_isGVDHSP,
      etep_boGiaoDucVaDaoTaoIid,
      etep_boGiaoDucVaDaoTaoSubType,
      etep_soGiaoDucVaDaoTaoSubType,
      includeSubOrg,
      selectedItems,
    } = this.props;

    const orgIids = lodashGet(enrolmentPlan, 'organizations');
    const searchFormId = getSearchFormId(enrolmentPlan, trainingPlan);

    const hiddenFieldsNew = {
      orgIids: etep_isGVDHSP ? [etep_boGiaoDucVaDaoTaoIid] : orgIids,
      requireOrganization: etep_isGVDHSP ? 0 : 1,
      includeRootOrganizations: 1,
      /*include_sub_organizations: 1,*/
      getOnlyOrganizationWhereUserHasPermission: etep_isGVDHSP ? 0 : 1,
      organizationRootIids: etep_isGVDHSP
        ? [etep_boGiaoDucVaDaoTaoIid]
        : orgIids,
      organizationSubTypes: etep_isGVDHSP
        ? [etep_boGiaoDucVaDaoTaoSubType, etep_soGiaoDucVaDaoTaoSubType]
        : undefined,
      enrolment_plan_iid: enrolmentPlan && enrolmentPlan.iid,
      training_plan_iid: trainingPlan && trainingPlan.iid,
      rubric_iid: trainingPlan
        ? lodashGet(trainingPlan, 'rubric_iid')
        : lodashGet(enrolmentPlan, 'rubric_iid'),
      _sand_expand: [
        'user.positions',
        'relations_with_groups.relations.r',
        'relations_with_groups.courses.campus_iids',
        ...(expandFields || []),
      ],
      ...(hiddenFields || {}),
    };

    return (
      <div className="m-b-10 p-b-20">
        <SearchWrapper
          resultsRerenderTrigger={[enrolmentPlan, selectedItems]}
          formid={searchFormId}
          schema={noSearchForm ? undefined : schema}
          showSearchButton={false}
          hiddenFields={hiddenFieldsNew}
          renderResultsComponent={this.renderResultComponent}
          alternativeApi={epApiUrls.search_enrolment_plan_members}
          noResultText={t1('no_members')}
          classFormFilter="ep-member-search-form"
          includeSubOrg={includeSubOrg}
        />
      </div>
    );
  }
}

SearchEpMembers.propTypes = {
  className: PropTypes.string,
};

SearchEpMembers.defaultProps = {
  className: '',
  // usersOverallProgress: Boolean , used when 'users-overall-progress' screen is used, it will render this component as well
  // noActions: when viewing members by Organizations, we don't have the need to perform any actions'
  // enrolmentPlan: the EP
  // trainingPlan: the TP , this component is also used in displaying TP's members
};

const mapStateToProps = createSelector(
  (state, props) =>
    formValueSelector(resultFormId(props.usersOverallProgress))(
      state,
      resultTableFieldName(props.usersOverallProgress),
    ),
  confSelector,
  (state, props) =>
    lodashGet(
      state,
      `valueFieldsToPopulateDefault.${getSearchFormId(
        props.enrolmentPlan,
        props.trainingPlan,
      )}.include_sub_organizations`,
      1,
    ),
  (state, props) => {
    const userIidCreated = lodashGet(props, 'trainingPlan.u.iid');
    const userIid = lodashGet(state, 'user.info.iid');
    const actionAllows = ['notify', 'export'];

    if (String(userIid) !== String(userIidCreated)) {
      return actionAllows;
    }

    return actionAllows.concat(['approve', 'reject', 'delete']);
  },
  (selectedItems, conf, includeSubOrg, actionAllows) => ({
    doesEnrolmentPlanMembersNeedApproval: doesEnrolmentPlanMembersNeedApprovalGivenConf(
      conf,
    ),
    selectedItems:
      selectedItems &&
      selectedItems.map(
        (item) =>
          item && {
            user_iid: lodashGet(item, 'user.iid'),
            enrolment_plan_iid: lodashGet(
              item,
              'relations_with_groups.enrolment_plan.iid',
            ),
          },
      ),
    includeSubOrg,
    actionAllows,
  }),
);

export default connect(mapStateToProps)(
  withFeatureFlags()(withETEP()(SearchEpMembers)),
);
