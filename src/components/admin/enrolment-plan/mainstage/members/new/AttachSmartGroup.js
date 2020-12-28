import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import ButtonAction from 'components/common/action-button/UpdateBtnWithConfirmDialog';
// import apiUrls from 'api-endpoints';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import lodashGet from 'lodash.get';
import SearchLayout from 'components/admin/group/search/';
import { categoryRelationTypes } from 'configs/constants';
import Warning from 'components/common/Warning';

const searchRequestsFormId = 'search_req_for_enrolment_plan';

class AttachSmartGroup extends React.PureComponent {
  handleAddSuccessFull = () => {
    const { onAddSuccessful } = this.props;
    if (typeof onAddSuccessful === 'function') {
      onAddSuccessful();
    }
  };

  renderActionRequestActionCell = (item) => {
    if (!item) {
      return null;
    }

    return (
      <ButtonAction
        icon="plus"
        textConfirm={t1(
          'do_you_want_to_attach_this_smart_group_to_enrolment_plan?',
        )}
        contentDialog={
          <Warning>
            {t1(
              'after_attach_smart_group_to_enrolment_plan,_you_will_not_be_able_to_change_it',
            )}
          </Warning>
        }
        alternativeApi={epApiUrls.attach_smart_group_to_enrolment_plan}
        searchFormId={searchRequestsFormId}
        data={{
          enrolment_plan_iid: lodashGet(this.props.enrolmentPlan, 'iid'),
          smart_group_iid: item.iid,
        }}
        onRequestSuccessful={this.handleAddSuccessFull}
      />
    );
  };

  render() {
    const { enrolmentPlan } = this.props;

    const orgIids = lodashGet(enrolmentPlan, 'organizations');

    return (
      <SearchLayout
        type={categoryRelationTypes.USER_GROUP}
        hiddenFields={{
          requireOrganization: Boolean(
            Array.isArray(orgIids) && orgIids.length,
          ),
          orgIids,
          organizationRootIids: orgIids,
          includeRootOrganizations: 1,
          getOnlyOrganizationWhereUserHasPermission: 1,
          smart: 1,
          _sand_step: 'user_group',
        }}
        renderResultActions={this.renderActionRequestActionCell}
      />
    );
  }
}

AttachSmartGroup.propTypes = {
  className: PropTypes.string,
};

AttachSmartGroup.defaultProps = {
  className: '',
};

export default connect()(AttachSmartGroup);
