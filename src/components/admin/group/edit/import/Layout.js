import React, { Component } from 'react';
import apiUrls from 'api-endpoints';
import ImportForm from 'components/admin/import/ImportForm';
import ImportPreviewList from './result/index';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.renderResult = this.renderResult.bind(this);
  }

  renderResult = (props) => <ImportPreviewList {...props} />;

  render() {
    const { formid, group } = this.props;

    const previewPageApi = apiUrls.import_request_search;
    const groupParams = {
      category_iid: group && group.iid,
      category_type: group && group.type,
    };

    return (
      <ImportForm
        formid={formid}
        form={formid}
        type={'user'}
        downloadTemplateUrl={apiUrls.get_import_file_template_for_ntype(
          'user',
          group && group.type,
        )}
        confirmImportUrl={apiUrls.import_students_to_group_in_university}
        renderResult={this.renderResult}
        previewPageApi={previewPageApi}
        confirmImportParams={groupParams}
        previewParams={groupParams}
        onlyPreviewScreen={true}
      />
    );
  }
}

export default Layout;
