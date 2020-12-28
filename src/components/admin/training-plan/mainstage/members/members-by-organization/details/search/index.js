import React from 'react';
import PropTypes from 'prop-types';
import SearchEnrolmentPlanMembers from 'components/admin/enrolment-plan/mainstage/members/search';
import lodashGet from 'lodash.get';

const getSearchFormId = (node, organization) =>
  `training_plan_members_by_organization_details_${lodashGet(
    node,
    'iid',
  )}_${lodashGet(organization, 'iid')}`;

const defaultColumnsNotToShow = ['experience', 'method'];

class Search extends React.Component {
  render() {
    const {
      node,
      organization,
      resultTableHeight,
      noActions,
      noLink,
      columnsNotToShow,
    } = this.props;
    const searchFormId = getSearchFormId(node, organization);

    return (
      <SearchEnrolmentPlanMembers
        resultTableHeight={resultTableHeight}
        formid={searchFormId}
        trainingPlan={node}
        columnsNotToShow={
          columnsNotToShow
            ? [...columnsNotToShow, ...defaultColumnsNotToShow]
            : defaultColumnsNotToShow
        }
        expandFields={[
          'user.user_organizations',
          'user.positions',
          'user.phongbans',
        ]}
        hiddenFields={{
          user_organizations: [lodashGet(organization, 'iid')],
          include_sub_organizations: 1,
        }}
        noSearchForm
        displayRowCheckboxOnTheRightSide
        noActions={noActions}
        noLink={noLink}
      />
    );
  }
}

Search.propTypes = {
  className: PropTypes.string,
};

Search.defaultProps = {
  className: '',
};

export default Search;
