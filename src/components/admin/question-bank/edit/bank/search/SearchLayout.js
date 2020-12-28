import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './search-schema';
import Results from './Results';

const formid = 'template_bank_questions';
class QuestionBankBankSearch extends Component {
  renderResultComponent = (items, props) => {
    const {
      renderActionCell,
      resultReadOnly,
      categoryMappingWithTheSkills,
    } = this.props;
    return (
      <Results
        items={items}
        {...props}
        searchFormId={formid}
        readOnly={resultReadOnly}
        renderActionCell={renderActionCell}
        categoryMappingWithTheSkills={categoryMappingWithTheSkills}
      />
    );
  };

  render() {
    const { node, categoryMappingWithTheSkills, hiddenFields } = this.props;

    return (
      <SearchWrapper
        {...this.props}
        resetForm
        formid={formid}
        schema={schema}
        categoryMappingWithTheSkills={categoryMappingWithTheSkills}
        renderResultsComponent={this.renderResultComponent}
        autoSearchWhenStart={true}
        showQueryField={false}
        showSearchButton
        hiddenFields={hiddenFields || { question_bank: [node.iid] }}
        alternativeApi={'/question-bank/search-questions'}
      />
    );
  }
}

export default QuestionBankBankSearch;
