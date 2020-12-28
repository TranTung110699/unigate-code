import React from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import ListView from './ListView';
import GridView from './GridView';
import apiUrls from 'api-endpoints';
import fileApiUrls from 'components/common/file-manager/endpoints';
import { t1 } from 'translate';
import styled from 'styled-components';
import { defaultSearchOrder } from './common';

const NoResult = styled.div`
  padding: 15px;
`;

class DirViewer extends React.PureComponent {
  renderResultComponent = (
    items,
    props,
    objects,
    searchValues,
    resultId,
    sortData,
    onSortDataChange,
    searchFormId,
  ) => {
    const {
      viewMode,
      onFileDoubleClick,
      onFileClick,
      stagedItems,
      onStagedItemsChange,
      multiple,
    } = this.props;
    if (viewMode === 'grid') {
      return (
        <GridView
          stagedItems={stagedItems}
          onStagedItemsChange={onStagedItemsChange}
          onFileClick={onFileClick}
          onFileDoubleClick={onFileDoubleClick}
          formid={searchFormId}
          items={items}
          sortData={sortData}
          onSortDataChange={onSortDataChange}
        />
      );
    }
    return (
      <ListView
        multiSelectable={multiple}
        selectedItems={stagedItems}
        onSelectedItemschange={onStagedItemsChange}
        onFileDoubleClick={onFileDoubleClick}
        items={items}
        sortData={sortData}
        onSortDataChange={onSortDataChange}
      />
    );
  };

  renderNoResultComponent = () => {
    return (
      <NoResult>{t1('there_are_no_files_inside_this_directory')}</NoResult>
    );
  };

  render() {
    const {
      className,
      dirCode,
      viewMode,
      searchFormId,
      stagedItems,
      fileTypes,
    } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div className={componentClassName}>
        <SearchWrapper
          initialValues={defaultSearchOrder}
          formid={searchFormId}
          alternativeApi={fileApiUrls.search_dir_content}
          hiddenFields={{
            parent_dir_code: dirCode,
            view_mode: viewMode,
            file_type: fileTypes,
          }}
          renderResultsComponent={this.renderResultComponent}
          renderNoResultComponent={this.renderNoResultComponent}
          resultsRerenderTrigger={[stagedItems]}
          autoSearchWhenHiddenFieldsChange
        />
      </div>
    );
  }
}

DirViewer.propTypes = {
  className: PropTypes.string,
};

DirViewer.defaultProps = {
  className: '',
};

export default DirViewer;
