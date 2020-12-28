import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { t1 } from 'translate';
import NodeNew from 'components/admin/node/new';
import apiUrls from 'api-endpoints';
import { getThemeConfig } from 'utils/selectors';
import { createSelector } from 'reselect';
import FormSearchTarget from 'components/admin/invite/new/find-targets/Layout';
import sagaActions from 'actions/node/saga-creators';
import inviteSchema from '../schema/form';
import fetchData from 'components/common/fetchData';
import { isItemUserOldEnrolmentSessionToInvite } from 'components/admin/node/utils';
import { searchFormId } from './common';

const alternativeApi = apiUrls.new_invite;
const defaultStep = 'enrolment-session';
const formid = 'new_invite';

class FormNewInvite extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleInvited = (users) => {
    if (!users || !users.length) {
      return;
    }
    const { dispatch, hiddenFields, inviteSuccessFull } = this.props;
    let { learning_items, ...params } = hiddenFields;
    params = params || {};
    params.items = learning_items;
    params.targets = users.map((user) => ({ ...user, type: 'user' }));
    params.compulsory = 1;

    dispatch(
      sagaActions.submitFormRequest('', {
        url: '/invite/api/new',
        extraParams: params,
        formidToSubmitOnSuccess: searchFormId,
        executeOnSuccess: inviteSuccessFull || this.inviteSuccessFull,
      }),
    );
  };

  inviteSuccessFull = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/admin/invite/plan" />;
    }
    const title = t1('invite_users_or_groups_to_take_learning_paths');

    const {
      inviteSuccessFull,
      themeConfig,
      node,
      course,
      path,
      mode,
      canUserInviteInAllOrganizations,
      ...props
    } = this.props;

    let hiddenFields = this.props.hiddenFields || {};
    const simpleMode = this.props.simpleMode || false;

    hiddenFields = {
      ...hiddenFields,
      canUserInviteInAllOrganizations,
    };

    const step = this.props.step || defaultStep;
    const learningItem = course || path;

    if (
      learningItem &&
      learningItem.iid &&
      !isItemUserOldEnrolmentSessionToInvite(learningItem, themeConfig)
    ) {
      return (
        <FormSearchTarget
          formid={searchFormId}
          node={learningItem}
          hiddenFields={learningItem}
          onAdd={(users) => this.handleInvited(users)}
        />
      );
    }

    const submitLabels = {
      submitting:
        mode === 'edit' ? t1('editing...') : `${t1('adding_contestants')}...`,
      default: mode === 'edit' ? t1('update') : t1('add_contestants'),
    };

    return (
      <NodeNew
        {...props}
        submitLabels={submitLabels}
        closeModal
        // step={step}
        mode={'new'}
        title={title}
        formid={formid}
        ntype={'invite'}
        node={node || hiddenFields}
        simpleMode={simpleMode}
        hiddenFields={hiddenFields}
        requestSuccessful={inviteSuccessFull || this.inviteSuccessFull}
        schema={inviteSchema(
          hiddenFields,
          mode,
          props.readOnly,
          simpleMode,
          props.showPackage,
        )}
        alternativeApi={
          step === defaultStep
            ? this.props.alternativeApi || alternativeApi
            : '/invite/api/new'
        }
      />
    );
  }
}

const mapStateToProps = createSelector(
  getThemeConfig,
  (themeConfig) => ({
    themeConfig,
  }),
);

const fetchDataConfig = {
  baseUrl: apiUrls.can_user_invite_in_all_organizations,
  keyState: 'can_user_invite_in_all_organizations',
  propKey: 'canUserInviteInAllOrganizations',
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
};

export default connect(mapStateToProps)(
  fetchData(fetchDataConfig)(FormNewInvite),
);
