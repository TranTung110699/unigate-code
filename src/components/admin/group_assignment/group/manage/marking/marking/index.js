import React from 'react';
import PropTypes from 'prop-types';
import SearchAndMarking from 'components/admin/report/dashboard/search';
import './stylesheet.scss';

class AssignmentGroupMarking extends React.Component {
  searchAndMarkingPaginationProps = {
    onlyShowIfTotalBigEnough: true,
  };

  searchAndMarkingModulesToShow = ['sco', 'exercise', 'question'];
  cssClass = 'assignment-group-score-and-marking';

  render() {
    const { className, course, sco, exercise, group } = this.props;

    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        {group && (
          <SearchAndMarking
            node={course}
            target="user"
            groups={[group.iid]}
            hideGeneralActions
            notShowExport
            whiteListItemsToShow={{
              sco: [sco.iid],
              exercise: [exercise.iid],
            }}
            modulesToShow={this.searchAndMarkingModulesToShow}
            noExam
            notShowReportName
            notShowProgress
            notShowPassed
            notShowFormFilters
            filterOutHeaderIfPossible
            isMarkingForAssignment
            notShowSendMessageOption
            paginationProps={this.searchAndMarkingPaginationProps}
          />
        )}
      </div>
    );
  }
}

AssignmentGroupMarking.propTypes = {
  className: PropTypes.string,
};

AssignmentGroupMarking.defaultProps = {
  className: '',
};

export default AssignmentGroupMarking;
