/* eslint-disable no-undef */
import React from 'react';
import Paper from 'material-ui/Paper';
import { t1 } from 'translate';
import get from 'lodash.get';

import apiUrls from 'api-endpoints';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import previewSchema from './preview/schema-form';

import Preview from './preview/index';
import './stylesheet.scss';

const style = {
  padding: 20,
  width: '100%',
};
class PreviewForm extends React.PureComponent {
  searchWrapperPaginationProps = {
    onlyShowIfTotalBigEnough: true,
  };
  divStyle = { marginTop: '20px', marginLeft: '-14px' };

  renderPreviewComponent = (items, props) => {
    const importInfo = get(props, 'objects.import_info');
    return <Preview items={items} importInfo={importInfo} />;
  };

  render() {
    const { importId } = this.props;

    return (
      <Paper zDepth={1} style={style}>
        <SearchWrapper
          formid="import_students_form_preview"
          hiddenFields={{
            import_id: importId,
          }}
          schema={previewSchema}
          renderResultsComponent={this.renderPreviewComponent}
          alternativeApi={apiUrls.import_students_request_search}
          paginationProps={this.searchWrapperPaginationProps}
          autoSearchWhenHiddenFieldsChange
          noResultText={t1('nothing_to_preview')}
        />
      </Paper>
    );
  }
}

export default PreviewForm;
