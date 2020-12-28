/* eslint-disable no-undef */
import React, { Component } from 'react';
import { getFormValues, reduxForm } from 'redux-form';
import { Element } from 'schema-form/elements';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import Paper from 'material-ui/Paper';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/saga-creators';
import userSagaActions from 'components/admin/user/actions/saga-creators';
import { importDataStatuses } from 'configs/constants';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import previewSchema from './preview/schema-form';

import Preview from './preview';
import './stylesheet.scss';
import InputFile from 'schema-form/elements/input-file';

class ImportForm extends Component {
  divStyle = { marginTop: '20px', marginLeft: '-14px' };

  searchWrapperPaginationProps = {
    onlyShowIfTotalBigEnough: true,
  };

  handleClick = () => {
    const { dispatch, import_file, formid, node } = this.props;
    let params = this.props.params || {};
    params.import_file = import_file;
    if (node && node.ntype === 'contest') {
      params = Object.assign(params, {
        type: 'contestants',
        contest_code: node && node.code,
      });
    } else if (node && node.ntype === 'enrolment_plan') {
      //Enrolment plan
      params = Object.assign(params, {
        type: 'members_in_enrolment_plan',
        enrolment_plan_iid: node && node.iid,
      });
    } else if (node && node.ntype === 'group') {
      //Manual group
      params = Object.assign(params, {
        type: 'members_in_manual_group',
        group_iid: node && node.iid,
      });
    }

    const url = apiUrls.import_students_request;
    dispatch(sagaActions.importDataRequest(url, '', formid, params));
  };

  handleDownloadTemplate = () => {
    const { dispatch } = this.props;
    const template = this.props.template || 'contestants';

    dispatch(userSagaActions.downloadImportTemplateRequest({ template }));
  };

  renderPreviewComponent = (items) => {
    const { metadata, node } = this.props;
    return (
      <Preview
        items={items}
        metadata={metadata}
        node={node}
        importEndpoint={this.props.importEndpoint}
        params={this.props.params}
      />
    );
  };

  render() {
    const { /*items,*/ metadata, importDataStatus, formid } = this.props;

    const importFormTitle =
      this.props.importFormTitle || t1('import_contestants');
    const style = {
      padding: 20,
      width: '100%',
    };

    return (
      <div>
        <div className="row col-md-12">
          <Paper zDepth={1} style={style}>
            <h3>{importFormTitle}</h3>
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
                label={t1('download_sample_import_file')}
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
                metadata &&
                metadata.import_id && (
                  <SearchWrapper
                    schema={previewSchema}
                    formid={`${formid}_preview`}
                    hiddenFields={{
                      import_id: metadata.import_id,
                    }}
                    renderResultsComponent={this.renderPreviewComponent}
                    alternativeApi={apiUrls.import_students_request_search}
                    paginationProps={this.searchWrapperPaginationProps}
                    autoSearchWhenHiddenFieldsChange
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
  const formid = 'import_members_with_simple_data';
  let results = [];
  const returnedItems = state.searchResults[[`${formid}_items`]];
  if (returnedItems && returnedItems.result) {
    results = returnedItems.result;
  }

  const metadata = state.searchResults[[`${formid}_metadata`]];
  const importContestantsFormValueSelector = getFormValues(formid);
  const importFileField = importContestantsFormValueSelector(
    state,
    'import_file',
  );

  return {
    import_file: importFileField && importFileField.import_file,
    items: results,
    metadata,
    formid,
    importDataStatus: state.importData.status,
    form: state.form,
  };
}

export default reduxForm({ form: 'import_members_with_simple_data' })(
  connect(mapStateToProps)(ImportForm),
);
