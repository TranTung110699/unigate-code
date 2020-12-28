import React from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';

class PendingMembers extends React.PureComponent {
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
    return (
      <div>
        <div>{t1('some_enrolment_plan_members_are_still_pending')}:</div>
        <div>
          (
          {t1(
            'this_could_be_that_they_have_not_been_added_and_approved_to_the_courses_or_they_have_not_been_approved_in_enrolment_plan_or_training_plan',
          )}
          )
        </div>
        <ul>
          {items.slice(0, NUMBER_TO_DISPLAY).map((item) => {
            const user = lodashGet(item, 'user');
            return (
              <li>
                {lodashGet(user, 'name')}{' '}
                {lodashGet(user, 'code') && `(${lodashGet(user, 'code')})`}
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
        formid="enrolment_plan_pending_members"
        renderResultsComponent={this.renderResultsComponent}
        className={componentClassName}
        hiddenFields={{
          enrolment_plan_iid: node && node.iid,
        }}
        showSearchButton={false}
        autoSearchWhenStart
        alternativeApi={epApiUrls.get_enrolment_plan_members_who_need_confirmed}
        hidePagination
        renderNoResultComponent={() => null}
      />
    );
  }
}

PendingMembers.propTypes = {
  className: PropTypes.string,
};

PendingMembers.defaultProps = {
  className: '',
};

export default PendingMembers;
