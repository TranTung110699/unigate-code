import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './search-schema';
import Results from './Results';

const formid = 'template_bank_questions';
class ExamTemplateBankSearch extends Component {
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
    const { node, categoryMappingWithTheSkills } = this.props;

    const hiddenFields = { exam_template: node.iid };

    return (
      <SearchWrapper
        {...this.props}
        formid={formid}
        schema={schema}
        categoryMappingWithTheSkills={categoryMappingWithTheSkills}
        renderResultsComponent={this.renderResultComponent}
        autoSearchWhenStart={true}
        showQueryField={false}
        showSearchButton
        hiddenFields={hiddenFields}
        alternativeApi={'/exam-template/search-questions'}
      />
    );
  }
}

export default ExamTemplateBankSearch;
