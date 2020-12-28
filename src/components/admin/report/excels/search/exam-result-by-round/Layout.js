/**
 * Created by quandv on 19/04/17.
 */
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
    const { sortScore, contest } = this.props;

    const hiddenFields = {
      contest_code: contest,
    };

    let id;

    switch (sortScore) {
      case '0':
        id = 'report_exam_results_by_round';
        break;
      case '-1':
        id = 'report_exam_results_score_desc';
        break;
      case '1':
        id = 'report_exam_results_score_asc';
        break;
      default:
        id = 'report_exam_results_by_round';
        break;
    }

    return (
      <SearchWrapper
        formid={id}
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
        showQueryField={false}
        showSearchButton={false}
      >
        <FormFilters formid={id} sortScore={sortScore} />
      </SearchWrapper>
    );
  };
}

export default Layout;
