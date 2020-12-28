import React from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import IconExamPager from './images/img.png';
import Paper from './paper';

const status = ['approved'];

class ExamPapers extends React.Component {
  paginationProps = {
    showExtraControl: false,
    position: 'center',
    theme: 'light',
  };

  cssClass = 'etec-home-page-exam-paper';

  renderResultComponent = (items) =>
    Array.isArray(items) &&
    items.map(
      (item) =>
        item && (
          <Paper
            key={item.id}
            className="col-lg-3 col-md-4 col-sm-6 col-xs-12"
            icon={IconExamPager}
            item={item}
          />
        ),
    );

  render() {
    const hiddenFields = {
      status,
      items_per_page: 4,
      featured: 1,
    };
    return (
      <SearchWrapper
        formid="paper_search"
        renderNoResultComponent={() => null}
        renderResultsComponent={this.renderResultComponent}
        hidePagination
        hiddenFields={hiddenFields}
        paginationProps={this.paginationProps}
      />
    );
  }
}

ExamPapers.propTypes = {
  className: PropTypes.string,
};

ExamPapers.defaultProps = {
  className: '',
};

export default ExamPapers;
