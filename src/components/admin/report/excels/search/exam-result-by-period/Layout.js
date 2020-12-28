import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import ScoreResults from 'components/admin/report/excels/search/report-result/ScoreResults';
import FormFilters from './FormFilters';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent = (items, props) => (
    <ScoreResults items={items} {...props} />
  );

  render = () => {
    const { contest } = this.props;

    const hiddenFields = {
      contest_code: contest,
    };

    return (
      <SearchWrapper
        formid="report_exam_results_period_score"
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
        showQueryField={false}
        showSearchButton={false}
      >
        <FormFilters formid="report_exam_results_period_score" />
      </SearchWrapper>
    );
  };
}

export default Layout;
