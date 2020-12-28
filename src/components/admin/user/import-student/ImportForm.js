/* eslint-disable no-undef */
import React, { Component } from 'react';
import { formValueSelector, reduxForm } from 'redux-form';
import { Element } from 'schema-form/elements';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import Paper from 'material-ui/Paper';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/saga-creators';
import userSagaActions from 'components/admin/user/actions/saga-creators';
import ExtraForm from 'components/admin/user/import-student/extra-form/ExtraForm';
import { layouts, schoolTypes } from 'configs/constants';
import { getThemeConfig } from 'utils/selectors';
import './stylesheet.scss';
import { Redirect } from 'react-router-dom';
import { getUrl } from 'routes/links/common';
import InputFile from 'schema-form/elements/input-file';

class ImportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      import_id: null,
    };
  }

  handleClick = () => {
    const { themeConfig } = this.props;
    const { dispatch, import_file, formid } = this.props;
    const params = {
      import_file,
      type: '',
    };

    if (themeConfig && themeConfig.type === schoolTypes.ENTERPRISE) {
      params.type = 'enterprise_users';
    } else if (themeConfig.layout === layouts.UMS) {
      params.type = 'ums_students';
    }

    const urlNew = apiUrls.import_students_request;

    dispatch(
      sagaActions.importDataRequest(urlNew, '', formid, params, {
        onRequestSuccessful: (rep) => {
          if (!rep || !rep.success || !rep.result || !rep.result.import_id) {
            return;
          }
          this.setState({ import_id: rep.result.import_id });
        },
      }),
    );
  };

  handleDownloadTemplate = () => {
    const { dispatch, themeConfig } = this.props;
    let template = '';

    if (themeConfig && themeConfig.type === schoolTypes.ENTERPRISE) {
      template = 'enterprise_users';
    } else if (themeConfig.layout === layouts.UMS) {
      template = 'ums_students';
    }

    dispatch(userSagaActions.downloadImportTemplateRequest({ template }));
  };

  getExtraForm = () => {
    const { themeConfig } = this.props;
    return <ExtraForm />;
  };

  render() {
    const { /*items,*/ metadata, importDataStatus, formid } = this.props;

    if (this.state.import_id) {
      return (
        <Redirect
          to={getUrl(`school/import-students/${this.state.import_id}`)}
        />
      );
    }

    const style = {
      padding: 20,
      width: '100%',
    };

    return (
      <div className="row col-md-12">
        <Paper zDepth={1} style={style}>
          <h3>{t1('import_students')}</h3>
          {this.getExtraForm()}
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

  const import_file = formValueSelector(formid)(state, 'import_file');

  return {
    import_file,
    items: results,
    metadata,
    importDataStatus: state.importData.status,
    form: state.form,
    themeConfig: getThemeConfig(state),
  };
}

export default reduxForm({ form: 'import_students_form' })(
  connect(mapStateToProps)(ImportForm),
);
