import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import { t1 } from 'translate';
import Results from './Results';
import FormFilters from './FormFilters';
import contestApiUrls from '../../endpoints';

class PaperLayout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    const { examRound } = this.props;
    if (examRound && examRound.editable === false) {
      return (
        <div>{t1('please_change_exam_freeze_period_to_generate_paper')}</div>
      );
    }

    const hiddenFields = {
      syllabus_iid: examRound.syllabus,
    };

    const formid = `paper_search_${examRound.syllabus}`;

    return (
      <SearchWrapper
        formid={formid}
        alternativeApi={contestApiUrls.search_round_paper}
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
      >
        <FormFilters examRound={examRound} formid={formid} />
      </SearchWrapper>
    );
  }
}

export default PaperLayout;
