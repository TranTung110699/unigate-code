/* eslint-disable jsx-a11y/anchor-is-valid,react/prop-types,no-undef,quotes */
import React, { Component } from 'react';
import { formValueSelector, reduxForm } from 'redux-form';
import { Element } from 'schema-form/elements';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/saga-creators';
import { importDataStatuses } from 'configs/constants';
import { getThemeConfig } from 'utils/selectors';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import SuccessAlert from 'components/common/SuccessAlert';
import schema from './schemaSearchResult';

import Preview from './preview';
import './styles/import.scss';
import InputFile from 'schema-form/elements/input-file';

class ImportForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: {}, // from submit import form
      showPagination: true,
      previewSubmitted: false,
    };

    this.requestSuccessful = this.requestSuccessful.bind(this);
    this.showHidePagination = this.showHidePagination.bind(this);
  }

  searchWrapperPaginationProps = {
    onlyShowIfTotalBigEnough: true,
  };

  // click submit form upload file and import to temp table
  handleClickPreview = () => {
    const { dispatch, import_file, formid, type, previewParams } = this.props;
    let params = {
      import_file,
      type,
    };

    params = previewParams ? Object.assign(params, previewParams) : params;

    const urlNew = apiUrls.bank_import_ntype(type);

    this.setState({ result: [], previewSubmitted: true }, () => {
      dispatch(sagaActions.importDataRequest(urlNew, '', formid, params));
    });
  };

  handleDownloadTemplate = () => {
    const { dispatch, downloadTemplateUrl } = this.props;

    let url = downloadTemplateUrl;
    if (!downloadTemplateUrl) {
      url = apiUrls.get_import_file_template_for_ntype(this.props.type);
    }
    dispatch(sagaActions.downloadDataRequest(url));
  };

  requestSuccessful = (data) => {
    const { requestSuccessful } = this.props;
    if (requestSuccessful) {
      //Reload syllabus tree after import questions to exercise via loadSyllabusOnSuccess function
      requestSuccessful();
    }

    this.setState({ result: data });
  };

  isEmpty = (obj) => Object.keys(obj).length === 0;

  showHidePagination = (value) => {
    this.setState({ showPagination: value });
  };

  renderPreviewComponent = (items) => {
    const {
      metadata,
      formid,
      confirmForm,
      renderResult,
      onlyPreviewScreen,
      confirmImportUrl,
      confirmImportParams,
      categoryMappingWithTheSkills,
    } = this.props;

    return (
      <Preview
        items={items}
        metadata={metadata}
        formid={formid}
        confirmForm={confirmForm}
        renderResult={renderResult}
        onlyPreviewScreen={onlyPreviewScreen || !categoryMappingWithTheSkills}
        confirmImportUrl={confirmImportUrl}
        confirmImportParams={confirmImportParams}
        requestSuccessful={this.requestSuccessful}
        showHidePagination={this.showHidePagination}
      />
    );
  };

  render() {
    const {
      metadata,
      importDataStatus,
      formid,
      import_file,
      previewPageApi,
      showFormFilter,
    } = this.props;

    const style = {
      padding: 20,
      width: '100%',
    };

    return (
      <div
        className={
          this.state.showPagination
            ? 'importFromExcel show-import-ui-pagination'
            : 'importFromExcel  hide-import-ui-pagination'
        }
      >
        <div className="whitebox">
          <h3>{t1('import_from_excel')}</h3>
          <Element
            schema={{
              name: 'import_file',
              type: InputFile,
              accept: ['.xlsx', '.xls', '.xlsm'],
              multiple: true,
              hintText: t1('import_file'),
              fullWidth: true,
              defaultValue: '',
            }}
          />
          <div className="text-center button-spacing">
            <RaisedButton
              name="submit"
              type="submit"
              id="submit"
              label={t1('preview')}
              onClick={this.handleClickPreview}
              className="button-spacing"
              primary
              disabled={!import_file}
            />
            <RaisedButton
              name="formTemplate"
              type="submit"
              id="submit"
              label={t1('download_sample_question_bank_file')}
              onClick={this.handleDownloadTemplate}
              className="button-spacing"
            />
          </div>
        </div>

        {this.state.previewSubmitted ? (
          <div className="m-t-30">
            {(() => {
              return this.state.result ? (
                this.state.result.success ? (
                  <SuccessAlert>{t1('import_data_successful')}</SuccessAlert>
                ) : null
              ) : null;
            })()}

            {this.isEmpty(this.state.result) &&
              importDataStatus === importDataStatuses.START &&
              metadata &&
              metadata.import_id && (
                <SearchWrapper
                  schema={schema}
                  formid={`${formid}_preview`}
                  hiddenFields={{
                    import_id: metadata.import_id,
                  }}
                  classFormFilter={showFormFilter ? '' : 'display-none'}
                  autoSearchWhenStart
                  autoSearchWhenValuesChange={!showFormFilter}
                  renderResultsComponent={this.renderPreviewComponent}
                  alternativeApi={previewPageApi}
                  paginationProps={this.searchWrapperPaginationProps}
                  noResultText={t1('nothing_to_preview')}
                />
              )}
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { formid } = props;
  let results = [];

  const returnedItems = state.searchResults[[`${formid}_items`]];
  if (returnedItems && returnedItems.result) {
    results = returnedItems.result;
  }

  const metadata = state.searchResults[[`${formid}_metadata`]];
  const selector = formValueSelector(formid);

  return {
    import_file: selector(state, 'import_file'),
    items: results,
    metadata,
    importDataStatus: state.importData.status,
    form: state.form,
    themeConfig: getThemeConfig(state),
  };
}

export default reduxForm({})(connect(mapStateToProps)(ImportForm));
