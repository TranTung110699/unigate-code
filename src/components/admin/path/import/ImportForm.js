import React, { Component } from 'react';
import { formValueSelector, reduxForm } from 'redux-form';
import { Element } from 'schema-form/elements';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import Paper from 'material-ui/Paper';
import { t1 } from 'translate';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import sagaActions from 'actions/saga-creators';
import { importDataStatuses } from 'configs/constants';
import apiUrls from 'api-endpoints';

import Preview from './preview';
import InputFile from 'schema-form/elements/input-file';

class ImportForm extends Component {
  divStyle = { marginTop: '20px', marginLeft: '-14px' };

  searchWrapperPaginationProps = {
    onlyShowIfTotalBigEnough: true,
  };

  handleClick = () => {
    const { dispatch, import_file, formid } = this.props;
    const params = {
      import_file,
    };

    const urlNew = apiUrls.new_path_import;

    dispatch(sagaActions.importDataRequest(urlNew, '', formid, params));
  };

  handleDownloadTemplate = () => {
    const { dispatch } = this.props;

    const url = apiUrls.get_import_path_file_template;
    dispatch(sagaActions.downloadDataRequest(url));
  };

  renderPreviewComponent = (items, props, objects) => {
    const { importMetadata, shouldDisableImportButtonIfNotValid } = this.props;
    return (
      <Preview
        items={items}
        metadata={Object.assign({}, importMetadata, objects)}
        shouldDisableImportButtonIfNotValid={
          shouldDisableImportButtonIfNotValid
        }
      />
    );
  };

  render() {
    const { formid, importMetadata, importDataStatus } = this.props;

    const style = {
      padding: 20,
      width: '100%',
    };

    return (
      <div>
        <div className="row col-md-12">
          <Paper zDepth={1} style={style}>
            <div className="row">
              <div className="col-md-12">
                <Element
                  schema={{
                    name: 'import_file',
                    type: InputFile,
                    accept: ['.xlsx', '.xls', '.xlsm'],
                    multiple: true,
                    hintText: t1('import_file'),
                    fullWidth: true,
                  }}
                />
              </div>
            </div>
            <div className="button-center">
              <RaisedButton
                name="submit"
                type="submit"
                id="submit"
                label={t1('submit')}
                onClick={this.handleClick}
                className="button-spacing"
                primary
              />
              <RaisedButton
                name="formTemplate"
                type="submit"
                id="submit"
                label={t1('download_form_import')}
                onClick={this.handleDownloadTemplate}
                className="button-spacing"
                primary
              />
            </div>
          </Paper>
        </div>

        <div className="col-md-12" style={this.divStyle}>
          <Paper zDepth={1} style={style}>
            <div className="row">
              {importDataStatus &&
                importDataStatus === importDataStatuses.DONE && (
                  <div className="col-md-12">
                    <div>{t1('import_data_successful')}</div>
                  </div>
                )}
              {importDataStatus &&
                importDataStatus === importDataStatuses.FAILED && (
                  <div className="col-md-12">
                    <div>{t1('import_data_failed')}</div>
                  </div>
                )}
              {importDataStatus &&
                importDataStatus === importDataStatuses.IMPORTING && (
                  <div className="col-md-12">
                    <div>{t1('data_importing')}</div>
                  </div>
                )}
              {importDataStatus &&
                importDataStatus === importDataStatuses.START &&
                importMetadata &&
                importMetadata.import_id && (
                  <SearchWrapper
                    formid={`${formid}_preview`}
                    hiddenFields={{
                      import_id: importMetadata.import_id,
                    }}
                    renderResultsComponent={this.renderPreviewComponent}
                    alternativeApi={apiUrls.path_import_search}
                    paginationProps={this.searchWrapperPaginationProps}
                    autoSearchWhenValuesChange
                    noResultText={t1('nothing_to_preview')}
                  />
                )}
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { formid } = props;
  const importMetadata = state.searchResults[`${formid}_metadata`];
  const selector = formValueSelector(formid);

  return {
    import_file: selector(state, 'import_file'),
    importMetadata,
    importDataStatus: state.importData.status,
    form: formid,
  };
}

export default connect(mapStateToProps)(reduxForm({})(ImportForm));
