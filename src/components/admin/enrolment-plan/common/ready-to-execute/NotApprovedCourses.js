import React from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import { t1 } from 'translate';

class NotApprovedCourses extends React.PureComponent {
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
        <div>{t1('some_courses_are_not_approved')}:</div>
        <ul>
          {items.slice(0, NUMBER_TO_DISPLAY).map((item) => (
            <li>
              {item.name} ({item.code})
            </li>
          ))}
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
        formid="enrolment_plan_not_approved_courses"
        renderResultsComponent={this.renderResultsComponent}
        className={componentClassName}
        hiddenFields={{
          enrolment_plan_iid: node && node.iid,
        }}
        showSearchButton={false}
        autoSearchWhenStart
        alternativeApi={epApiUrls.get_not_approved_enrolment_plan_courses}
        hidePagination
        renderNoResultComponent={() => null}
      />
    );
  }
}

NotApprovedCourses.propTypes = {
  className: PropTypes.string,
};

NotApprovedCourses.defaultProps = {
  className: '',
};

export default NotApprovedCourses;
