import React from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'api-endpoints';
import tpApiUrls from 'components/admin/training-plan/endpoints';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import NotArrangedMembersOfEnrolmentPlan from 'components/admin/enrolment-plan/common/members/NotArrangedMembers';

class NotArrangedMembers extends React.PureComponent {
  renderResultsComponent = (
    items,
    props,
    objects,
    searchValues,
    resultId,
    fromParamsToSortData,
    onSortDataChange,
    total,
  ) => {
    const NUMBER_TO_DISPLAY = 3;
    const { noMessage } = this.props;
    return (
      <div>
        {!noMessage && (
          <div>
            {t1(
              'some_enrolment_plan_members_are_not_assigned_to_all_credit_syllabuses',
            )}
            :
          </div>
        )}
        <ul>
          {items.slice(0, NUMBER_TO_DISPLAY).map((item) => {
            return (
              <li>
                {lodashGet(item, 'name')}{' '}
                {lodashGet(item, 'code') && `(${lodashGet(item, 'code')})`}
                <NotArrangedMembersOfEnrolmentPlan node={item} noMessage />
              </li>
            );
          })}
          {total > NUMBER_TO_DISPLAY && (
            <li>{t1('+%s_more', [total - NUMBER_TO_DISPLAY])}</li>
          )}
        </ul>
      </div>
    );
  };

  render() {
    const { className, node } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <SearchWrapper
        formid={`training_plan_not_arranged_members_${lodashGet(node, 'iid')}`}
        renderResultsComponent={this.renderResultsComponent}
        className={componentClassName}
        hiddenFields={{
          training_plan_iid: node && node.iid,
        }}
        showSearchButton={false}
        autoSearchWhenStart
        alternativeApi={
          tpApiUrls.get_enrolment_plans_that_has_members_who_are_not_assigned_to_all_enrolment_plan_credit_syllabuses
        }
        hidePagination
        renderNoResultComponent={() => null}
      />
    );
  }
}

NotArrangedMembers.propTypes = {
  className: PropTypes.string,
};

NotArrangedMembers.defaultProps = {
  className: '',
};

export default NotArrangedMembers;
