import React, { Component } from 'react';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import questionApiUrls from 'components/admin/question/endpoints';
import confirmSchema from './confirm-form/schema';
import ImportPreviewList from './result/index';
import ImportForm from '../../import/ImportForm';

class QuestionImportLayout extends Component {
  renderResult = (props) => {
    return (
      <ImportPreviewList
        {...props}
        categoryMappingWithTheSkills={this.props.categoryMappingWithTheSkills}
      />
    );
  };

  render() {
    const {
      formid,
      importParams,
      requestSuccessful,
      categoryMappingWithTheSkills,
    } = this.props;
    const type = 'question';
    const confirmForm = {
      schema: confirmSchema,
      title: t1('confirm_import'),
      buttonTitle: t1('confirm_import'),
      apiUrl: questionApiUrls.import_questions_request_confirm,
      hiddenFields: importParams,
    };
    const previewPageApi = apiUrls.import_request_search;

    return (
      <ImportForm
        formid={formid}
        form={formid}
        type={type}
        confirmForm={confirmForm}
        requestSuccessful={requestSuccessful}
        previewPageApi={previewPageApi}
        renderResult={this.renderResult}
        showFormFilter
        categoryMappingWithTheSkills={categoryMappingWithTheSkills}
      />
    );
  }
}

export default QuestionImportLayout;
